'use server';

import {
  setSlotAvailability as dbSetSlot,
  setBulkAvailability as dbSetBulk,
  getAvailabilityForDate,
  getAvailabilityForMonth,
} from '@/lib/db';

export async function getAvailabilityForDateAction(date: string) {
  return getAvailabilityForDate(date);
}

export async function getAvailabilityForMonthAction(year: number, month: number) {
  return getAvailabilityForMonth(year, month);
}

export async function setSlotAvailability(
  date: string,
  slot: string,
  available: number
) {
  return dbSetSlot(date, slot, available);
}

export async function setBulkAvailability(
  slots: { date: string; slot: string; available: number }[]
) {
  return dbSetBulk(slots);
}
