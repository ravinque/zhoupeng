export const WHATSAPP_E164 = "865973992099";
export const CONTACT_EMAIL = "sales@zhoupengindustry.com";
export const CONTACT_PHONE = "0597-3992099";
export const CONTACT_PHONE_TEL = "05973992099";
export const SITE_URL = "www.zhoupengindustry.com";

export const mailtoUrl = (subject: string, body: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export type QuoteMailPayload = {
  name: string;
  email: string;
  country: string;
  phone: string;
  projectType: string;
  budget: string;
  notes: string;
  regionLabel: string;
  items: Array<{ title: string; price: string }>;
  total: string;
  labels?: {
    heading: string;
    name: string;
    email: string;
    country: string;
    phone: string;
    region: string;
    projectType: string;
    budget: string;
    items: string;
    wholeHome: string;
    total: string;
    notes: string;
    website: string;
  };
};

export const buildQuoteMailBody = (payload: QuoteMailPayload) => {
  const l = payload.labels || {
    heading: "Fujian ZhouPeng Industrial / 福建洲鹏实业 Quote Request",
    name: "Name",
    email: "Email",
    country: "Country",
    phone: "Phone",
    region: "Region",
    projectType: "Project type",
    budget: "Budget",
    items: "Selected systems",
    wholeHome: "Whole-home consultation",
    total: "Estimated total",
    notes: "Notes",
    website: "Website",
  };

  const lines = [
    l.heading,
    "",
    `${l.name}: ${payload.name}`,
    `${l.email}: ${payload.email}`,
    `${l.country}: ${payload.country}`,
    `${l.phone}: ${payload.phone}`,
    `${l.region}: ${payload.regionLabel}`,
    `${l.projectType}: ${payload.projectType}`,
    `${l.budget}: ${payload.budget}`,
    "",
    `${l.items}:`,
    ...(payload.items.length
      ? payload.items.map((item) => `- ${item.title} (${item.price})`)
      : [`- ${l.wholeHome}`]),
    "",
    `${l.total}: ${payload.total}`,
    "",
    `${l.notes}: ${payload.notes || "—"}`,
    "",
    `${l.website}: ${SITE_URL}`,
  ];
  return lines.join("\n");
};
