export type Lang = "zh" | "en" | "ar";
export type Triple = [string, string, string];

export const pick = (value: Triple, lang: Lang) =>
  value[lang === "zh" ? 0 : lang === "en" ? 1 : 2];

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;
export const route = (path: string) => `${basePath}${path}`;

export type ProductSystem = {
  slug: string;
  name: Triple;
  eyebrow: Triple;
  summary: Triple;
  description: Triple;
  hero: string;
  gallery: string[];
};

export const productSystems: ProductSystem[] = [
  {
    slug: "whole-home",
    name: ["整屋定制", "Whole-home Interiors", "التصميم الداخلي المتكامل"],
    eyebrow: ["统一空间语言", "ONE COORDINATED LANGUAGE", "لغة تصميم متناسقة"],
    summary: ["门、墙、柜、橱与活动家具的整体协同。", "Coordinated doors, walls, cabinetry, kitchens and furniture.", "تنسيق الأبواب والجدران والخزائن والمطابخ والأثاث."],
    description: ["依据户型、使用需求和项目资料深化各系统之间的尺寸、材质与收口关系，具体配置在项目评估后确认。", "Spatial requirements, dimensions, materials and junction details are developed from the project brief. Final scope is confirmed after review.", "تُطوّر الأبعاد والمواد وتفاصيل الربط وفق متطلبات المشروع، ويُعتمد النطاق النهائي بعد المراجعة."],
    hero: "/zp/catalog/living-system.jpg",
    gallery: ["/zp/catalog/bedroom-system.jpg", "/zp/catalog/wardrobe-system.jpg", "/zp/catalog/entry-system.jpg"],
  },
  {
    slug: "kitchen",
    name: ["厨房系统", "Kitchen Systems", "أنظمة المطابخ"],
    eyebrow: ["烹饪与收纳", "COOKING & STORAGE", "الطهي والتخزين"],
    summary: ["橱柜、中岛、高柜与餐厨空间的组合。", "Cabinetry, islands, tall units and kitchen-dining combinations.", "خزائن وجزر ووحدات طويلة وتنسيقات للمطبخ والطعام."],
    description: ["画册展示多种厨房布局和门板语言，可结合现场尺寸、设备清单与目标市场要求进行项目深化。", "The company catalogue presents multiple kitchen layouts and door styles. Project detailing can respond to site dimensions, appliance schedules and destination requirements.", "يعرض كتالوج الشركة تخطيطات وأنماط أبواب متعددة، ويمكن تطوير المشروع وفق أبعاد الموقع وقائمة الأجهزة ومتطلبات الوجهة."],
    hero: "/zp/catalog/kitchen-modern.jpg",
    gallery: ["/zp/catalog/kitchen-white.jpg", "/zp/kitchen.jpg", "/zp/kitchen-detail-02.jpg"],
  },
  {
    slug: "wardrobe",
    name: ["柜体与衣帽间", "Cabinetry & Wardrobes", "الخزائن وغرف الملابس"],
    eyebrow: ["有序收纳", "ORDERED STORAGE", "تخزين منظم"],
    summary: ["衣柜、步入式衣帽间、展示与卧室收纳。", "Wardrobes, walk-in closets, display and bedroom storage.", "خزائن ملابس وغرف تبديل ووحدات عرض وتخزين لغرف النوم."],
    description: ["通过分区、照明、五金与门板组合回应不同空间，材料、五金及内部配置以确认方案为准。", "Zoning, lighting, fittings and door combinations respond to each space. Materials, hardware and internal layouts follow the approved proposal.", "تستجيب التقسيمات والإضاءة والتجهيزات لكل مساحة، وتخضع المواد والتكوينات للمقترح المعتمد."],
    hero: "/zp/catalog/wardrobe-system.jpg",
    gallery: ["/zp/catalog/bedroom-system.jpg", "/zp/cabinet.jpg", "/zp/banners/about-02.jpg"],
  },
  {
    slug: "doors",
    name: ["门与门板", "Doors & Fronts", "الأبواب والواجهات"],
    eyebrow: ["多种造型语言", "A RANGE OF PROFILES", "مجموعة من التصاميم"],
    summary: ["室内门、柜门与厨房门板系列。", "Interior doors, cabinet fronts and kitchen door styles.", "أبواب داخلية وواجهات خزائن وأنماط لأبواب المطابخ."],
    description: ["画册收录多种造型与饰面效果。实际结构、饰面、尺寸和性能要求须依据项目及适用标准确认。", "The catalogue presents a range of profiles and finishes. Structure, finish, dimensions and performance requirements must be confirmed for the project and applicable standards.", "يعرض الكتالوج مجموعة من التصاميم والتشطيبات، ويجب اعتماد البنية والأبعاد ومتطلبات الأداء وفق المشروع والمعايير المطبقة."],
    hero: "/zp/catalog/door-collection.jpg",
    gallery: ["/zp/home-01.jpg", "/zp/catalog/kitchen-modern.jpg", "/zp/catalog/entry-system.jpg"],
  },
  {
    slug: "living",
    name: ["客厅与玄关", "Living & Entry", "المعيشة والمداخل"],
    eyebrow: ["展示与日常收纳", "DISPLAY & DAILY STORAGE", "العرض والتخزين اليومي"],
    summary: ["电视柜、玄关柜、鞋柜与墙面收纳。", "Media units, entry cabinets, shoe storage and wall systems.", "وحدات تلفاز وخزائن مداخل وأحذية وأنظمة جدارية."],
    description: ["以连续材质、开放格和封闭收纳组织公共空间，具体产品组合可根据户型和使用习惯调整。", "Continuous materials, open display and concealed storage organize shared spaces. Product combinations can be adjusted to the plan and daily use.", "تنظم المواد المتناسقة والعرض المفتوح والتخزين المغلق المساحات المشتركة، ويمكن تعديل التكوين وفق المخطط والاستخدام."],
    hero: "/zp/catalog/living-system.jpg",
    gallery: ["/zp/catalog/entry-system.jpg", "/zp/catalog/cabinet-console.jpg", "/zp/catalog/wall-storage.jpg"],
  },
  {
    slug: "office",
    name: ["办公与配套家具", "Office & Supporting Furniture", "الأثاث المكتبي والمساند"],
    eyebrow: ["灵活配套", "FLEXIBLE SUPPORT", "حلول مساندة مرنة"],
    summary: ["办公桌、会议收纳与活动家具。", "Desks, meeting-room storage and loose furniture.", "مكاتب ووحدات تخزين للاجتماعات وأثاث مستقل."],
    description: ["画册中的活动家具可作为整屋和工程空间的配套选择，产品尺寸、数量和交付范围需单独确认。", "Loose furniture shown in the catalogue can support residential and project spaces. Dimensions, quantities and delivery scope are confirmed separately.", "يمكن استخدام الأثاث المستقل المعروض في الكتالوج للمساحات السكنية والمشروعات، وتُعتمد الأبعاد والكميات ونطاق التسليم بشكل منفصل."],
    hero: "/zp/catalog/office-desk.jpg",
    gallery: ["/zp/catalog/office-storage.jpg", "/zp/catalog/cabinet-console.jpg", "/zp/home-03.jpg"],
  },
];

export const common = {
  brand: ["福建洲鹏实业", "ZHOUPENG", "تشو بنغ"] as Triple,
  tagline: ["定制家居", "CUSTOM HOME", "حلول منزلية حسب الطلب"] as Triple,
  home: ["首页", "Home", "الرئيسية"] as Triple,
  products: ["产品", "Products", "المنتجات"] as Triple,
  certificates: ["资质证书", "Certificates", "الشهادات"] as Triple,
  manufacturing: ["制造实力", "Manufacturing", "قدرات التصنيع"] as Triple,
  about: ["关于我们", "About Us", "عن الشركة"] as Triple,
  contact: ["联系我们", "Contact", "اتصل بنا"] as Triple,
  privacy: ["隐私说明", "Privacy Notice", "إشعار الخصوصية"] as Triple,
  terms: ["使用条款", "Terms of Use", "شروط الاستخدام"] as Triple,
  explore: ["查看产品", "Explore Products", "استكشف المنتجات"] as Triple,
  enquire: ["提交项目需求", "Start Your Project", "ابدأ مشروعك"] as Triple,
  powered: ["Powered by Lapus", "Powered by Lapus", "Powered by Lapus"] as Triple,
};
