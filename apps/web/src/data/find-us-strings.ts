/**
 * Centralized user-facing strings for the AR Store Finder.
 *
 * Flat key/value map (Bulgarian default) so a future i18n library
 * swap is a single search-replace.
 */
export const findUsStrings = {
  // Page chrome
  pageTitle: "Намери магазин",
  back: "Назад",
  backToMap: "Назад към картата",
  close: "Затвори",

  // Picker
  pickerHeading: "Изберете обект",
  pickerSubheading:
    "Изберете магазина, до който искате да стигнете с камерата.",
  useNearest: "Използвай най-близкия",
  startARNavigation: "Стартирай AR навигация",
  nearestLabel: "Най-близо",
  distanceAway: "на разстояние",
  mapUnavailable: "Картата не се зареди. Изберете обект от списъка.",

  // Preflight
  preflightHeading: "Подготовка",
  preflightSubheading: "Разрешете достъп до камерата, локацията и компаса.",
  requestingCamera: "Достъп до камерата",
  requestingGeo: "Откриване на вашата локация",
  requestingCompass: "Включване на компаса",
  retry: "Опитай отново",
  cancel: "Отказ",

  // AR HUD
  calibrating: "Калибриране на компаса",
  arrived: "Пристигнахте",
  accuracyLow: "Слаб GPS сигнал",
  pointPhone: "Насочете телефона напред",

  // Fallbacks
  insecureHeading: "Необходим е HTTPS",
  insecureBody:
    "AR навигацията работи само през защитена връзка. Отворете сайта през HTTPS.",

  noCameraHeading: "Камерата не е достъпна",
  noCameraBody:
    "Няма достъп до камерата. Вместо това показваме карта с упътване.",
  openDirections: "Отвори упътване",

  noGeoHeading: "Локацията е отказана",
  noGeoBody:
    "Без вашата локация не можем да изчислим посоката. Можете да отворите упътване в Google Карти.",
  enableLocation: "Активирай локацията",

  errorHeading: "Нещо се обърка",
  errorBody: "Има проблем с камерата или сензорите. Опитайте отново.",
} as const;

export type FindUsStringKey = keyof typeof findUsStrings;
