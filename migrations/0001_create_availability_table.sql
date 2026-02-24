-- Migration number: 0001 	 2026-02-23T10:46:47.023Z
-- 予約枠の可否を管理（日付 + 時間帯）
CREATE TABLE IF NOT EXISTS availability (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  slot TEXT NOT NULL,
  available INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(date, slot)
);

CREATE INDEX IF NOT EXISTS idx_availability_date ON availability(date);
CREATE INDEX IF NOT EXISTS idx_availability_date_slot ON availability(date, slot);