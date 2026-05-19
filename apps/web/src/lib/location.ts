import type { Store } from "./stores";

export type StoreStatus = "open" | "closed" | "closing-soon";

interface StoreStatusResult {
  status: StoreStatus;
  statusText: string;
  statusColor: string;
}

/**
 * Calculate store status based on current time and weekly hours
 * @param store - Store object with hours
 * @returns Status object with status, text, and color
 */
export function getStoreStatus(store: Store): StoreStatusResult {
  const now = new Date();
  const dayNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const currentDay = dayNames[now.getDay()] as keyof Store["hours"];
  const currentHours = store.hours[currentDay];

  // Check if store is closed today
  if (currentHours.closed) {
    return {
      status: "closed",
      statusText: "Затворено днес",
      statusColor: "bg-gray-500",
    };
  }

  // Parse current time
  const currentTime = now.getHours() * 60 + now.getMinutes();

  // Parse store hours
  const [openHour, openMinute] = currentHours.open.split(":").map(Number);
  const [closeHour, closeMinute] = currentHours.close.split(":").map(Number);
  const openTime = openHour * 60 + openMinute;
  const closeTime = closeHour * 60 + closeMinute;

  // Determine status
  if (currentTime < openTime) {
    return {
      status: "closed",
      statusText: `Отваря в ${currentHours.open}`,
      statusColor: "bg-gray-500",
    };
  }

  if (currentTime >= closeTime) {
    return {
      status: "closed",
      statusText: "Затворено",
      statusColor: "bg-gray-500",
    };
  }

  // Check if closing soon (within 30 minutes)
  const minutesUntilClose = closeTime - currentTime;
  if (minutesUntilClose <= 30) {
    return {
      status: "closing-soon",
      statusText: `Затваря скоро (${currentHours.close})`,
      statusColor: "bg-amber-500",
    };
  }

  return {
    status: "open",
    statusText: `Отворено до ${currentHours.close}`,
    statusColor: "bg-emerald-500",
  };
}

/**
 * Calculate distance between two GPS coordinates using Haversine formula
 * @param lat1 - Latitude of first point
 * @param lng1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lng2 - Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Format distance in user-friendly way
 * @param distanceKm - Distance in kilometers
 * @returns Formatted string with appropriate unit
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} м`;
  }
  return `${distanceKm.toFixed(1)} км`;
}
