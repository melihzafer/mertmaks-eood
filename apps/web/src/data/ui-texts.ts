/**
 * UI Text Labels & Messages
 * Centralized UI text for buttons, forms, status messages, etc.
 */

export const uiTexts = {
  // Search
  search: {
    placeholder: "Търсете продукти или информация...",
    noResults: "Няма намерени резултати",
    loading: "Търсене...",
  },

  // Navigation
  navigation: {
    menu: "Меню",
    close: "Затвори",
    home: "Начало",
  },

  // Store status
  storeStatus: {
    open: "Отворено",
    closed: "Затворено",
    closingSoon: "Затваря скоро",
  },

  // Distance & Location
  location: {
    checkDistance: "Проверете разстоянието ми",
    calculating: "Изчисляване...",
    permissionDenied: "Моля, разрешете достъп до локацията",
    error: "Грешка при определяне на локацията",
    userLocation: "Вашата локация",
  },

  // Contact Form
  contactForm: {
    title: "Изпратете ни съобщение",
    name: {
      label: "Име",
      placeholder: "Вашето име",
    },
    email: {
      label: "Имейл",
      placeholder: "your.email@example.com",
    },
    message: {
      label: "Съобщение",
      placeholder: "Как можем да ви помогнем?",
    },
    submit: "Изпрати",
    submitting: "Изпращане...",
    success: "Съобщението е изпратено успешно!",
    error: "Грешка при изпращане. Моля, опитайте отново.",
  },

  // Common actions
  actions: {
    learnMore: "Научете повече",
    viewAll: "Вижте всички",
    contactUs: "Свържете се с нас",
    getDirections: "Вземете маршрут",
    callNow: "Обадете се сега",
    sendEmail: "Изпратете имейл",
  },

  // Sections
  sections: {
    promotions: "Текущи промоции",
    ourStores: "Нашите магазини",
    divisions: "Нашите отдели",
    contactInfo: "Информация за контакт",
    aboutUs: "За нас",
    history: "Нашата история",
  },

  // Common phrases
  common: {
    and: "и",
    or: "или",
    all: "всички",
    more: "повече",
    less: "по-малко",
    show: "покажи",
    hide: "скрий",
  },

  // Accessibility
  a11y: {
    logoAlt: "MERTMAX лого",
    menuButton: "Отвори меню",
    closeButton: "Затвори",
    searchButton: "Търсене",
  },
};

export type UITexts = typeof uiTexts;
