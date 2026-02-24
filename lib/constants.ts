// 予約枠の時間帯（診療時間に合わせて）
export const SLOTS = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
] as const;
export type Slot = (typeof SLOTS)[number];
