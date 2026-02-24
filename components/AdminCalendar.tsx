'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setSlotAvailability, getAvailabilityForMonthAction } from '@/app/actions/reservation';
import { SLOTS } from '@/lib/constants';

function getMonthData(year: number, month: number) {
  const lastDay = new Date(year, month, 0).getDate();
  return { lastDay };
}

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function AdminCalendar() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [day, setDay] = useState(now.getDate());
  const [slots, setSlots] = useState<Map<string, number>>(new Map());
  const [pending, setPending] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();
  const router = useRouter();

  const { lastDay } = getMonthData(year, month);
  const days = Array.from({ length: lastDay }, (_, i) => i + 1);
  const safeDay = Math.min(day, lastDay);
  const date = `${year}-${String(month).padStart(2, '0')}-${String(safeDay).padStart(2, '0')}`;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getAvailabilityForMonthAction(year, month).then((list) => {
      if (cancelled) return;
      const map = new Map<string, number>();
      list.forEach((s) => map.set(`${s.date}-${s.slot}`, s.available));
      setSlots(map);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { cancelled = true; };
  }, [year, month]);

  const key = (d: string, slot: string) => `${d}-${slot}`;
  // 未登録は予約可能(○)。DB の available: 1=○, 0=×
  const getAvailable = (d: string, slot: string) => slots.get(key(d, slot)) ?? 1;
  const isAvailable = (d: string, slot: string) => getAvailable(d, slot) === 1;

  const toggle = (d: string, slot: string) => {
    const current = getAvailable(d, slot);
    const next = current === 1 ? 0 : 1;
    setSlots((m) => new Map(m).set(key(d, slot), next));
    setPending(key(d, slot));
    startTransition(async () => {
      const res = await setSlotAvailability(d, slot, next);
      setPending(null);
      if (res.success) router.refresh();
    });
  };

  return (
    <div className="admin-calendar">
      <div className="admin-calendar-nav admin-calendar-nav-dropdowns">
        <label className="admin-dropdown-group">
          <span>年</span>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="admin-dropdown"
            aria-label="年"
          >
            {[year - 1, year, year + 1].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>
        <label className="admin-dropdown-group">
          <span>月</span>
          <select
            value={month}
            onChange={(e) => {
              setMonth(Number(e.target.value));
              setDay(1);
            }}
            className="admin-dropdown"
            aria-label="月"
          >
            {MONTHS.map((m) => (
              <option key={m} value={m}>{m}月</option>
            ))}
          </select>
        </label>
        <label className="admin-dropdown-group">
          <span>日</span>
          <select
            value={safeDay}
            onChange={(e) => setDay(Number(e.target.value))}
            className="admin-dropdown"
            aria-label="日"
          >
            {days.map((d) => (
              <option key={d} value={d}>{d}日</option>
            ))}
          </select>
        </label>
      </div>
      <p className="admin-calendar-hint">
        デフォルトはすべて予約可能(○)です。予約不可にしたい枠をクリックすると × になります。もう一度クリックで ○ に戻ります。
      </p>
      {loading ? (
        <p className="admin-calendar-loading">読み込み中…</p>
      ) : (
        <div className="admin-day-slots">
          <h3 className="admin-day-title">{year}年{month}月{safeDay}日</h3>
          <div className="admin-slots-grid">
            {SLOTS.map((slot) => {
              const k = key(date, slot);
              const available = isAvailable(date, slot);
              const isPending = pending === k;
              return (
                <button
                  key={slot}
                  type="button"
                  className={`admin-slot-btn ${available ? 'admin-slot-available' : 'admin-slot-unavailable'}`}
                  disabled={isPending}
                  onClick={() => toggle(date, slot)}
                  title={available ? `${slot} を予約不可にする` : `${slot} を予約可能にする`}
                >
                  <span className="admin-slot-time">{slot}</span>
                  <span className="admin-slot-mark">{isPending ? '…' : available ? '○' : '×'}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
