import { getCloudflareContext } from '@opennextjs/cloudflare';

export type SlotAvailability = {
  date: string;
  slot: string;
  available: number;
};

function getDB(): D1Database {
  const ctx = getCloudflareContext();
  if (!ctx.env.DB) {
    throw new Error('D1 database (DB) is not bound. Check wrangler.jsonc and run: npx wrangler d1 create takeuchi-reservations');
  }
  return ctx.env.DB;
}

/** 指定月の予約枠一覧を取得（RSC/Server Action 用） */
export async function getAvailabilityForMonth(
  year: number,
  month: number
): Promise<SlotAvailability[]> {
  const db = getDB();
  const start = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const end = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

  const stmt = db.prepare(
    `SELECT date, slot, available FROM availability WHERE date >= ? AND date <= ? ORDER BY date, slot`
  ).bind(start, end);
  const result = await stmt.all<{ date: string; slot: string; available: number }>();
  return (result.results ?? []) as SlotAvailability[];
}

/** 1日分の枠を取得 */
export async function getAvailabilityForDate(date: string): Promise<SlotAvailability[]> {
  const db = getDB();
  const stmt = db.prepare(
    `SELECT date, slot, available FROM availability WHERE date = ? ORDER BY slot`
  ).bind(date);
  const result = await stmt.all<{ date: string; slot: string; available: number }>();
  return (result.results ?? []) as SlotAvailability[];
}

/** 1枠の予約可能/不可を設定（Server Action 用） */
export async function setSlotAvailability(
  date: string,
  slot: string,
  available: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = getDB();
    await db.prepare(
      `INSERT INTO availability (date, slot, available) VALUES (?, ?, ?)
       ON CONFLICT(date, slot) DO UPDATE SET available = ?, updated_at = datetime('now')`
    ).bind(date, slot, available, available).run();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/** 複数枠を一括設定（Server Action 用） */
export async function setBulkAvailability(
  slots: { date: string; slot: string; available: number }[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = getDB();
    for (const { date, slot, available } of slots) {
      await db.prepare(
        `INSERT INTO availability (date, slot, available) VALUES (?, ?, ?)
         ON CONFLICT(date, slot) DO UPDATE SET available = ?, updated_at = datetime('now')`
      ).bind(date, slot, available, available).run();
    }
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
}
