import storesData from '@/data/stores.json';

export interface StoreHours {
  open: string;
  close: string;
  closed: boolean;
}

export interface Store {
  id: string;
  name: string;
  type: 'grocery' | 'industrial' | 'construction' | 'restaurant';
  address: string;
  city: string;
  region: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    monday: StoreHours;
    tuesday: StoreHours;
    wednesday: StoreHours;
    thursday: StoreHours;
    friday: StoreHours;
    saturday: StoreHours;
    sunday: StoreHours;
  };
  features: string[];
}

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
const STORE_TIME_ZONE = 'Europe/Sofia';
const weekdayByEnglishName: Record<string, DayOfWeek> = {
  Sunday: 'sunday',
  Monday: 'monday',
  Tuesday: 'tuesday',
  Wednesday: 'wednesday',
  Thursday: 'thursday',
  Friday: 'friday',
  Saturday: 'saturday',
};

/**
 * Get all stores
 */
export function getStores(): Store[] {
  return storesData.stores as Store[];
}

/**
 * Get a single store by ID
 */
export function getStore(id: string): Store | undefined {
  return storesData.stores.find(store => store.id === id) as Store | undefined;
}

/**
 * Get current day of week in lowercase
 */
function getCurrentDay(now: Date = new Date()): DayOfWeek {
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: STORE_TIME_ZONE,
    weekday: 'long',
  }).format(now);

  return weekdayByEnglishName[weekday] ?? 'monday';
}

/**
 * Parse time string (HH:MM) to minutes since midnight
 */
function timeToMinutes(time: string): number {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    throw new Error(`Invalid store hour "${time}". Expected HH:MM.`);
  }

  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Get current time in minutes since midnight
 */
function getCurrentTimeInMinutes(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: STORE_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0);

  return hour * 60 + minute;
}

/**
 * Check if a store is currently open
 */
export function isStoreOpen(store: Store, now: Date = new Date()): boolean {
  const day = getCurrentDay(now);
  const hours = store.hours[day];
  
  if (hours.closed) {
    return false;
  }
  
  const currentMinutes = getCurrentTimeInMinutes(now);
  const openMinutes = timeToMinutes(hours.open);
  const closeMinutes = timeToMinutes(hours.close);
  
  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

/**
 * Get the opening status message for a store
 */
export function getStoreStatus(store: Store, now: Date = new Date()): {
  isOpen: boolean;
  message: string;
  nextChange?: string;
} {
  const day = getCurrentDay(now);
  const hours = store.hours[day];
  
  if (hours.closed) {
    return {
      isOpen: false,
      message: 'Затворено днес',
    };
  }
  
  const open = isStoreOpen(store, now);
  
  if (open) {
    return {
      isOpen: true,
      message: `Отворено до ${hours.close}`,
      nextChange: hours.close,
    };
  }
  
  const currentMinutes = getCurrentTimeInMinutes(now);
  const openMinutes = timeToMinutes(hours.open);
  
  if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      message: `Отваря в ${hours.open}`,
      nextChange: hours.open,
    };
  }
  
  return {
    isOpen: false,
    message: 'Затворено',
  };
}

/**
 * Get formatted business hours for a store
 */
export function getFormattedHours(store: Store): Array<{
  day: string;
  hours: string;
  isToday: boolean;
}> {
  const dayNames: Record<DayOfWeek, string> = {
    monday: 'Понеделник',
    tuesday: 'Вторник',
    wednesday: 'Сряда',
    thursday: 'Четвъртък',
    friday: 'Петък',
    saturday: 'Събота',
    sunday: 'Неделя',
  };
  
  const today = getCurrentDay();
  
  return Object.entries(store.hours).map(([day, hours]) => ({
    day: dayNames[day as DayOfWeek],
    hours: hours.closed ? 'Затворено' : `${hours.open} - ${hours.close}`,
    isToday: day === today,
  }));
}

/**
 * Get stores by type
 */
export function getStoresByType(type: Store['type']): Store[] {
  return storesData.stores.filter(store => store.type === type) as Store[];
}

export function getStoreTodayIsoDate(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: STORE_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  if (!year || !month || !day) return now.toISOString().slice(0, 10);
  return `${year}-${month}-${day}`;
}

/**
 * Shape consumed by the AR Store Finder (`/find-us`). Pre-flattened to keep
 * the AR layer decoupled from the richer `Store` shape.
 */
export interface FinderStore {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
}

export function getStoresForFinder(): FinderStore[] {
  return (storesData.stores as Store[]).map((store) => ({
    id: store.id,
    name: store.name,
    lat: store.coordinates.lat,
    lng: store.coordinates.lng,
    address: store.address,
  }));
}
