/**
 * AR Store Finder requires a secure context (HTTPS, localhost, file:).
 * Geolocation, getUserMedia, and DeviceOrientationEvent.requestPermission
 * all refuse to run outside one.
 */
export function isSecureForAR(): boolean {
  if (typeof window === "undefined") return true;
  if (window.isSecureContext) return true;
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
}
