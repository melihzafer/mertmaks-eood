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
function getCurrentDay(): DayOfWeek {
  const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const now = new Date();
  return days[now.getDay()];
}

/**
 * Parse time string (HH:MM) to minutes since midnight
 */
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Get current time in minutes since midnight
 */
function getCurrentTimeInMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

/**
 * Check if a store is currently open
 */
export function isStoreOpen(store: Store, now: Date = new Date()): boolean {
  const day = getCurrentDay();
  const hours = store.hours[day];
  
  if (hours.closed) {
    return false;
  }
  
  const currentMinutes = getCurrentTimeInMinutes();
  const openMinutes = timeToMinutes(hours.open);
  const closeMinutes = timeToMinutes(hours.close);
  
  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

/**
 * Get the opening status message for a store
 */
export function getStoreStatus(store: Store): { 
  isOpen: boolean; 
  message: string; 
  nextChange?: string;
} {
  const day = getCurrentDay();
  const hours = store.hours[day];
  
  if (hours.closed) {
    return {
      isOpen: false,
      message: 'Затворено днес',
    };
  }
  
  const open = isStoreOpen(store);
  
  if (open) {
    return {
      isOpen: true,
      message: `Отворено до ${hours.close}`,
      nextChange: hours.close,
    };
  }
  
  const currentMinutes = getCurrentTimeInMinutes();
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
