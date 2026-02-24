'use client';

import { useState } from 'react';
import { getAvailabilityForDateAction } from '@/app/actions/reservation';
import { SLOTS } from '@/lib/constants';

export default function CheckAvailability() {
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState<{ slot: string; available: number }[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    if (!date) return;
    setLoading(true);
    setSlots(null);
    try {
      const list = await getAvailabilityForDateAction(date);
      const bySlot = list.map((s) => ({ slot: s.slot, available: s.available }));
      setSlots(bySlot);
    } catch {
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }

  // 未登録は予約可能(○)。DB の 1=○, 0=×
  const getAvailable = (slot: string) => slots?.find((s) => s.slot === slot)?.available;
  const isAvailable = (slot: string) => {
    const v = getAvailable(slot);
    return v === undefined || v === 1;
  };

  return (
    <div className="check-availability">
      <h3>予約可能か確認する</h3>
      <div className="check-availability-form">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().slice(0, 10)}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCheck}
          disabled={!date || loading}
        >
          {loading ? '確認中…' : '確認する'}
        </button>
      </div>
      {slots !== null && (
        <div className="check-availability-result">
          <p className="check-availability-date">{date} の予約枠</p>
          <ul className="check-availability-slots">
            {SLOTS.map((slot) => {
              const available = isAvailable(slot);
              return (
                <li key={slot} data-available={available ? 1 : 0}>
                  <span className="slot-time">{slot}</span>
                  <span className="slot-status">
                    {available ? '○ 予約可能' : '× 予約不可'}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
