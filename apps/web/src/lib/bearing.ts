/**
 * Great-circle math for the AR Store Finder.
 * Pure functions — no DOM, no React, easy to test.
 *
 * Conventions:
 *   • Angles are in DEGREES at the boundary, RADIANS internally.
 *   • Bearings: 0 = North, 90 = East, clockwise. Range [0, 360).
 *   • Coordinates use {lat, lng} in degrees (WGS84).
 */

export interface LatLng {
  lat: number;
  lng: number;
}

const EARTH_RADIUS_M = 6_371_008.8;

const toRad = (deg: number): number => (deg * Math.PI) / 180;
const toDeg = (rad: number): number => (rad * 180) / Math.PI;

/**
 * Normalize any heading to the [0, 360) range.
 * Handles negative values, values > 360, and `NaN` (returns 0).
 */
export function normalizeHeading(deg: number): number {
  if (!Number.isFinite(deg)) return 0;
  const mod = deg % 360;
  return mod < 0 ? mod + 360 : mod;
}

/**
 * Initial great-circle bearing FROM `from` TO `to`, in degrees [0, 360).
 *
 *   θ = atan2( sin(Δλ)·cos(φ2),
 *              cos(φ1)·sin(φ2) − sin(φ1)·cos(φ2)·cos(Δλ) )
 */
export function bearingDeg(from: LatLng, to: LatLng): number {
  const phi1 = toRad(from.lat);
  const phi2 = toRad(to.lat);
  const dLambda = toRad(to.lng - from.lng);

  const y = Math.sin(dLambda) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLambda);

  return normalizeHeading(toDeg(Math.atan2(y, x)));
}

/**
 * Haversine distance between two points, in meters.
 */
export function distanceMeters(a: LatLng, b: LatLng): number {
  const phi1 = toRad(a.lat);
  const phi2 = toRad(b.lat);
  const dPhi = toRad(b.lat - a.lat);
  const dLambda = toRad(b.lng - a.lng);

  const s =
    Math.sin(dPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
  return EARTH_RADIUS_M * c;
}

/**
 * Compute the rotation to apply to a north-pointing arrow so it
 * points toward the target from the user's current vantage.
 *
 *   rotation = (bearingToTarget − compassHeading + 360) mod 360
 */
export function arrowRotationDeg(
  bearing: number,
  compassHeading: number,
): number {
  return normalizeHeading(bearing - compassHeading);
}

/**
 * Format a distance for display.
 *   < 1000 m → "523 м"
 *   ≥ 1000 m → "1.2 км"
 */
export function formatDistance(meters: number): string {
  if (!Number.isFinite(meters) || meters < 0) return "—";
  if (meters < 1000) return `${Math.round(meters)} м`;
  return `${(meters / 1000).toFixed(meters < 10_000 ? 1 : 0)} км`;
}
