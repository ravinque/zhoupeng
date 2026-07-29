export type CertificateLanguage = "zh" | "en" | "ar";
export type CertificateText = [string, string, string];

export const certificatePick = (value: CertificateText, language: CertificateLanguage) =>
  value[language === "zh" ? 0 : language === "en" ? 1 : 2];

export const certificateDocuments = [
  {
    code: "FSC® COC",
    image: "/zp/certificates/fsc-coc.jpg",
    title: ["FSC 产销监管链认证", "FSC Chain of Custody", "شهادة سلسلة الحيازة FSC"] as CertificateText,
    detail: ["有效期至 2031-01-05", "Valid through 5 Jan 2031", "صالحة حتى 5 يناير 2031"] as CertificateText,
  },
  {
    code: "ISO 9001",
    image: "/zp/certificates/iso-9001.jpg",
    title: ["质量管理体系认证", "Quality Management System", "نظام إدارة الجودة"] as CertificateText,
    detail: ["有效期至 2028-01-12", "Valid through 12 Jan 2028", "صالحة حتى 12 يناير 2028"] as CertificateText,
  },
  {
    code: "ISO 14001",
    image: "/zp/certificates/iso-14001.jpg",
    title: ["环境管理体系认证", "Environmental Management System", "نظام الإدارة البيئية"] as CertificateText,
    detail: ["有效期至 2028-01-12", "Valid through 12 Jan 2028", "صالحة حتى 12 يناير 2028"] as CertificateText,
  },
  {
    code: "ISO 45001",
    image: "/zp/certificates/iso-45001.jpg",
    title: ["职业健康安全管理体系", "Occupational Health & Safety", "نظام الصحة والسلامة المهنية"] as CertificateText,
    detail: ["有效期至 2028-01-12", "Valid through 12 Jan 2028", "صالحة حتى 12 يناير 2028"] as CertificateText,
  },
  {
    code: "CN PATENT",
    image: "/zp/certificates/cabinet-monitoring-patent.jpg",
    title: ["橱柜环境检测系统专利", "Cabinet Monitoring System Patent", "براءة نظام مراقبة بيئة الخزائن"] as CertificateText,
    detail: ["实用新型专利 · 授权 2022-07-19", "Utility patent · Granted 19 Jul 2022", "براءة منفعة · مُنحت في 19 يوليو 2022"] as CertificateText,
  },
];
