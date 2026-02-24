'use client';

import { useState, useEffect, useMemo } from 'react';
import { getAvailabilityForMonthAction } from '@/app/actions/reservation';

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const SLOTS_MORNING = ['09:00', '10:00', '11:00', '12:00'] as const;
const SLOTS_AFTERNOON = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00'] as const;

function getLastDay(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

type Props = { year: number; month: number };

export default function MonthReservationStatus({ year: initialYear, month: initialMonth }: Props) {
  const now = new Date();
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth() + 1;
  const todayDay = now.getDate();
  const initialDay = initialYear === todayYear && initialMonth === todayMonth ? todayDay : 1;
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [day, setDay] = useState(initialDay);
  const [slots, setSlots] = useState<{ date: string; slot: string; available: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getAvailabilityForMonthAction(year, month)
      .then((list) => {
        if (!cancelled) setSlots(list);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : '取得に失敗しました');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [year, month]);

  const lastDay = getLastDay(year, month);
  const isPastMonth = year < todayYear || (year === todayYear && month < todayMonth);
  const isCurrentMonth = year === todayYear && month === todayMonth;
  const minDay = isPastMonth ? lastDay + 1 : isCurrentMonth ? todayDay : 1;
  const days = useMemo(
    () => (minDay <= lastDay ? Array.from({ length: lastDay - minDay + 1 }, (_, i) => minDay + i) : []),
    [lastDay, minDay]
  );
  const safeDay = minDay <= lastDay ? Math.min(Math.max(day, minDay), lastDay) : todayDay;
  useEffect(() => {
    if (isPastMonth) {
      setYear(todayYear);
      setMonth(todayMonth);
      setDay(todayDay);
      return;
    }
    setDay((prev) => Math.min(Math.max(prev, minDay), lastDay));
  }, [year, month, isPastMonth, minDay, lastDay, todayYear, todayMonth, todayDay]);
  const date = `${year}-${String(month).padStart(2, '0')}-${String(safeDay).padStart(2, '0')}`;

  const map = new Map(slots.map((s) => [`${s.date}-${s.slot}`, s.available]));
  // 未登録は予約可能(○)。1=○, 0=×
  const getAvailable = (d: string, slot: string) => map.get(`${d}-${slot}`);
  const isAvailable = (d: string, slot: string) => {
    const v = getAvailable(d, slot);
    return v === undefined || v === 1;
  };

  if (error) {
    return (
      <section className="reservation-status" aria-labelledby="reservation-status-title">
        <div className="container">
          <span className="section-label">Reservation</span>
          <h2 id="reservation-status-title" className="section-title">予約状況</h2>
          <p className="reservation-status-error">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="reservation-status" aria-labelledby="reservation-status-title">
      <div className="container">
        <span className="section-label">Reservation</span>
        <h2 id="reservation-status-title" className="section-title">予約状況</h2>
        <p className="section-description reservation-status-description">
          月・日を選ぶと、その日の予約可能(○)／予約不可(×)が表示されます。
          <br className="reservation-status-desc-br" />
          未設定の枠はすべて予約可能です。
        </p>

        <div className="reservation-dropdowns">
          <label className="reservation-dropdown-group">
            <span>年</span>
            <select
              value={year}
              onChange={(e) => {
                const y = Number(e.target.value);
                setYear(y);
                const isNewYearPast = y < todayYear || (y === todayYear && month < todayMonth);
                setDay(isNewYearPast ? todayDay : y === todayYear && month === todayMonth ? todayDay : 1);
              }}
              className="reservation-dropdown"
              aria-label="年"
            >
              {[year - 1, year, year + 1].map((y) => (
                <option key={y} value={y}>{y}年</option>
              ))}
            </select>
          </label>
          <label className="reservation-dropdown-group">
            <span>月</span>
            <select
              value={month}
              onChange={(e) => {
                const m = Number(e.target.value);
                setMonth(m);
                const isNewMonthPast = year < todayYear || (year === todayYear && m < todayMonth);
                setDay(isNewMonthPast ? todayDay : year === todayYear && m === todayMonth ? todayDay : 1);
              }}
              className="reservation-dropdown"
              aria-label="月"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>{m}月</option>
              ))}
            </select>
          </label>
          <label className="reservation-dropdown-group">
            <span>日</span>
            <select
              value={safeDay}
              onChange={(e) => setDay(Number(e.target.value))}
              className="reservation-dropdown"
              aria-label="日"
            >
              {days.map((d) => (
                <option key={d} value={d}>{d}日</option>
              ))}
            </select>
          </label>
        </div>

        {loading ? (
          <p className="reservation-status-loading">読み込み中…</p>
        ) : (
          <div className="reservation-day-result">
            <h3 className="reservation-day-title">{year}年{month}月{safeDay}日の予約枠</h3>
            <div className="reservation-slots-rows">
              <ul className="reservation-day-slots reservation-day-slots--morning" aria-label="9時〜12時">
                {SLOTS_MORNING.map((slot) => {
                  const available = isAvailable(date, slot);
                  return (
                    <li key={slot} className="reservation-day-slot" data-available={available}>
                      <span className="reservation-slot-time">{slot}</span>
                      <span className="reservation-slot-status">
                        {available ? '○ 予約可能' : '× 予約不可'}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <ul className="reservation-day-slots reservation-day-slots--afternoon" aria-label="14時以降">
                {SLOTS_AFTERNOON.map((slot) => {
                  const available = isAvailable(date, slot);
                  return (
                    <li key={slot} className="reservation-day-slot" data-available={available}>
                      <span className="reservation-slot-time">{slot}</span>
                      <span className="reservation-slot-status">
                        {available ? '○ 予約可能' : '× 予約不可'}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
