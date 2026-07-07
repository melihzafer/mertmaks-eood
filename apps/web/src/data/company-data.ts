/**
 * Company & Brand Data
 * Company information, branding, contact details
 */

export interface CompanyInfo {
  name: {
    cyrillic: string;
    latin: string;
  };
  legalForm: string;
  tagline: string;
  description: string;
  foundedYear: number;
}

export interface ContactInfo {
  phone: {
    main: string;
    display: string;
  };
  address: {
    street: string;
    city: string;
    region: string;
    country: string;
    full: string;
  };
  hours: {
    weekdays: string;
    weekends: string;
    display: string;
  };
}

export const companyInfo: CompanyInfo = {
  name: {
    cyrillic: "МЕРТМАКС",
    latin: "MERTMAKS",
  },
  legalForm: "ЕООД",
  tagline: "Местен партньор за покупки в Самуил и Разград",
  description:
    "Магазини за хранителни стоки, домашни потреби и строителни материали в Самуил и региона.",
  foundedYear: 2005,
};

export const contactInfo: ContactInfo = {
  phone: {
    main: "+359XXXXXXXXX",
    display: "+359 XXX XXX XXX",
  },
  address: {
    street: "",
    city: "с. Самуил",
    region: "обл. Разград",
    country: "България",
    full: "с. Самуил, обл. Разград, България",
  },
  hours: {
    weekdays: "8:00 до 20:00",
    weekends: "8:00 до 20:00",
    display: "Пон. до нед.: 8:00 до 20:00",
  },
};
