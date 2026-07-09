"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useMemo, useState } from "react";

type Lang = "zh" | "en" | "ar";
type Region = "west" | "middleEast";
type Localized = Record<Lang, string>;
type Product = {
  id: string;
  title: Localized;
  cn: string;
  zone: Localized;
  summary: Localized;
  image: string;
  specs: Record<Lang, string[]>;
  badge: Localized;
  priceWest: number;
  priceMe: number;
};
type ChatMessage = {
  role: "agent" | "customer";
  text: string;
};
type Copy = {
  nav: string[];
  language: string;
  login: string;
  account: string;
  serviceTop: string;
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  startOrder: string;
  contactService: string;
  projectRegion: string;
  founded: string;
  productionBase: string;
  productionBaseValue: string;
  standardPlant: string;
  standardPlantValue: string;
  productsEyebrow: string;
  productsTitle: string;
  add: string;
  added: string;
  addedNotice: string;
  companyEyebrow: string;
  companyTitle: string;
  companyText: string;
  engineers: string;
  afterSales: string;
  systems: string;
  equipment: string;
  regionEyebrow: string;
  regionTitle: string;
  regionCardText: string;
  selectedSolution: string;
  orderEyebrow: string;
  orderTitle: string;
  emptyQuote: string;
  total: string;
  custom: string;
  name: string;
  email: string;
  country: string;
  phone: string;
  projectType: string;
  budget: string;
  notes: string;
  notesPlaceholder: string;
  submitOrder: string;
  saved: string;
  contactEyebrow: string;
  contactTitle: string;
  phoneLabel: string;
  emailLabel: string;
  address: string;
  openDesk: string;
  footer: string;
  footerIntro: string;
  footerContactTitle: string;
  footerNavTitle: string;
  footerProductsTitle: string;
  footerCopyright: string;
  footerSite: string;
  loginSystem: string;
  loginTitle: string;
  loginText: string;
  password: string;
  signIn: string;
  signedIn: string;
  close: string;
  onlineService: string;
  serviceDesk: string;
  villaQuote: string;
  dealerPrice: string;
  chatPlaceholder: string;
  send: string;
  starterMessage: string;
  agentReply: string;
  quickVillaText: string;
  quickDealerText: string;
  brandHome: string;
  brandSubline: string;
  primaryNavLabel: string;
  heroImageAlt: string;
  companyImageAlt: string;
  highlightsLabel: string;
  remove: string;
  removeLabel: string;
  home: string;
  requiredFieldsError: string;
  invalidEmailError: string;
  passwordRequiredError: string;
  quoteRequiredError: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const products: Product[] = [
  {
    id: "door",
    title: { zh: "智能门系统", en: "Smart Door System", ar: "نظام الأبواب الذكية" },
    cn: "门系统",
    zone: { zh: "入户门、室内门", en: "Entry & room doors", ar: "أبواب المداخل والغرف" },
    summary: {
      zh: "平框门、隐藏铰链、磁吸锁和静音密封一体配置，可预留智能门锁与门禁模块。",
      en: "Flush doors with concealed hinges, magnetic locks, acoustic seals, and smart access preparation.",
      ar: "أبواب مستوية بمفصلات مخفية وأقفال مغناطيسية وعزل صوتي وتجهيز للدخول الذكي.",
    },
    image: "/zp/home-01.jpg",
    specs: {
      zh: ["隐藏铰链", "智能锁预留", "防火配置可选"],
      en: ["Hidden hinge", "Smart lock ready", "Fire-rated option"],
      ar: ["مفصلات مخفية", "جاهز للقفل الذكي", "خيار مقاومة الحريق"],
    },
    priceWest: 1280,
    priceMe: 4850,
    badge: { zh: "安防", en: "Security", ar: "أمان" },
  },
  {
    id: "wall",
    title: { zh: "集成墙系统", en: "Integrated Wall System", ar: "نظام الجدران المتكامل" },
    cn: "墙系统",
    zone: { zh: "客厅、书房、走廊", en: "Living room, office, villa corridors", ar: "المجلس والمكتب والممرات" },
    summary: {
      zh: "墙板、灯带、开关位、影音收纳和弱电走线统一规划，适合客厅、走廊和展厅。",
      en: "Wall panels coordinated with light strips, switch positions, media storage, and low-voltage routing.",
      ar: "ألواح جدارية منسقة مع الإضاءة ومواقع المفاتيح والتخزين وتمديدات الجهد المنخفض.",
    },
    image: "/zp/home-02.jpg",
    specs: {
      zh: ["低压灯轨", "传感器预留", "防潮板材"],
      en: ["Low-V track", "Sensor pockets", "Humidity-resistant board"],
      ar: ["مسار إضاءة منخفض الجهد", "تجهيز للحساسات", "ألواح مقاومة للرطوبة"],
    },
    priceWest: 168,
    priceMe: 620,
    badge: { zh: "按平方", en: "Per sqm", ar: "للمتر" },
  },
  {
    id: "cabinet",
    title: { zh: "智能柜系统", en: "Intelligent Cabinet Suite", ar: "نظام الخزائن الذكية" },
    cn: "柜系统",
    zone: { zh: "衣柜、储物、衣帽间", en: "Wardrobe, storage, cloakroom", ar: "الخزائن وغرف الملابس" },
    summary: {
      zh: "衣柜、储物柜和衣帽间可集成灯光、充电、通风与分区收纳，按空间尺寸定制。",
      en: "Wardrobes and storage suites with lighting, charging, ventilation, and made-to-measure organization.",
      ar: "خزائن وغرف ملابس مع إضاءة وشحن وتهوية وتنظيم مخصص حسب المقاس.",
    },
    image: "/zp/cabinet.jpg",
    specs: {
      zh: ["场景灯带", "充电抽屉", "模块化收纳"],
      en: ["LED scene strips", "Charging drawer", "Modular organizers"],
      ar: ["إضاءة مشهدية", "درج شحن", "منظمات معيارية"],
    },
    priceWest: 2900,
    priceMe: 10900,
    badge: { zh: "定制", en: "Custom", ar: "مخصص" },
  },
  {
    id: "kitchen",
    title: { zh: "智能橱柜系统", en: "Smart Kitchen System", ar: "نظام المطبخ الذكي" },
    cn: "橱系统",
    zone: { zh: "厨房、中岛、餐厨区", en: "Kitchen and island areas", ar: "المطبخ والجزيرة" },
    summary: {
      zh: "橱柜、中岛、家电高柜与水槽区统一设计，兼顾灯光、台面和海外安装文件。",
      en: "Kitchen cabinets, islands, appliance towers, and sink zones planned with lighting and installation files.",
      ar: "خزائن وجزر مطبخ وأبراج أجهزة ومنطقة حوض مع إضاءة وملفات تركيب.",
    },
    image: "/zp/kitchen.jpg",
    specs: {
      zh: ["家电高柜", "防水板材", "台面适配"],
      en: ["Appliance tower", "Water-safe panels", "Stone-ready counters"],
      ar: ["برج أجهزة", "ألواح مقاومة للماء", "جاهز للأسطح الحجرية"],
    },
    priceWest: 6800,
    priceMe: 25500,
    badge: { zh: "热销", en: "Best seller", ar: "الأكثر طلبا" },
  },
  {
    id: "hardware",
    title: { zh: "五金与控制套件", en: "Hardware & Control Kit", ar: "مجموعة الملحقات والتحكم" },
    cn: "五金系统",
    zone: { zh: "铰链、滑轨、锁具、控制模块", en: "Hinges, rails, locks, control modules", ar: "مفصلات وسكك وأقفال ووحدات تحكم" },
    summary: {
      zh: "铰链、滑轨、锁具、电源排和场景开关按项目区域配套，减少现场二次采购。",
      en: "Hinges, slides, locks, power strips, and scene switches packed by room and project zone.",
      ar: "مفصلات وسكك وأقفال ومقابس ومفاتيح مشاهد مجهزة حسب الغرفة ومنطقة المشروع.",
    },
    image: "/zp/kitchen-detail-01.jpg",
    specs: {
      zh: ["软关闭", "场景开关", "多地区插头包"],
      en: ["Soft-close motion", "Scene switch", "Multi-region plug packs"],
      ar: ["غلق هادئ", "مفتاح مشاهد", "حزم مقابس متعددة"],
    },
    priceWest: 390,
    priceMe: 1450,
    badge: { zh: "套件", en: "Kit", ar: "حزمة" },
  },
  {
    id: "supporting",
    title: { zh: "整屋配套服务", en: "Whole-home Supporting System", ar: "خدمات دعم المنزل بالكامل" },
    cn: "配套系统",
    zone: { zh: "灯光、展示、售后、安装文件", en: "Lighting, display, after-sales package", ar: "إضاءة وعرض وخدمة ما بعد البيع" },
    summary: {
      zh: "提供方案深化、安装图、BOM 清单、远程验收和售后资料，帮助项目顺利落地。",
      en: "Design detailing, installation drawings, BOM packages, remote acceptance, and service documents.",
      ar: "تفصيل التصميم ورسومات التركيب وقائمة المواد والقبول عن بعد ووثائق الخدمة.",
    },
    image: "/zp/kitchen-detail-02.jpg",
    specs: {
      zh: ["BOM 清单", "3D 图纸", "远程验收"],
      en: ["BOM package", "3D drawings", "Remote acceptance"],
      ar: ["قائمة مواد", "رسومات ثلاثية", "قبول عن بعد"],
    },
    priceWest: 980,
    priceMe: 3650,
    badge: { zh: "服务", en: "Service", ar: "خدمة" },
  },
];

const regions: Record<
  Region,
  {
    name: Localized;
    short: string;
    currency: string;
    pricePrefix: string;
    standards: Record<Lang, string[]>;
    support: Localized;
    intro: Localized;
    formCountry: Localized;
    customerLine: Localized;
  }
> = {
  west: {
    name: { zh: "欧美地区", en: "Europe & America", ar: "أوروبا وأمريكا" },
    short: "EU / US",
    currency: "USD / EUR / GBP",
    pricePrefix: "$",
    standards: {
      zh: ["CE / UKCA / FCC 方案", "110-240V 电气适配", "英文设计资料"],
      en: ["CE / UKCA / FCC planning", "110-240V power coordination", "English design documents"],
      ar: ["تخطيط CE / UKCA / FCC", "تنسيق كهرباء 110-240V", "وثائق تصميم إنجليزية"],
    },
    support: {
      zh: "英文支持、出口报价、远程方案评审",
      en: "English support, export quotation, remote design review",
      ar: "دعم إنجليزي وعروض تصدير ومراجعة تصميم عن بعد",
    },
    intro: {
      zh: "面向欧美别墅、公寓、经销商、设计工作室和工程商的定制智能家居商城。",
      en: "Designed for villas, apartments, dealers, builders, and design studios across Europe and North America.",
      ar: "مصمم للفيلات والشقق والوكلاء والمصممين في أوروبا وأمريكا الشمالية.",
    },
    formCountry: { zh: "美国", en: "United States", ar: "United States" },
    customerLine: {
      zh: "发送户型图和现场照片，客服会在 48 小时内给出初步报价。",
      en: "Send a floor plan and room photos to receive a quote within 48 hours.",
      ar: "أرسل المخطط والصور لتحصل على عرض خلال 48 ساعة.",
    },
  },
  middleEast: {
    name: { zh: "中东 / GCC 地区", en: "Middle East & GCC", ar: "الشرق الأوسط والخليج" },
    short: "ME / GCC",
    currency: "AED / SAR / USD",
    pricePrefix: "AED ",
    standards: {
      zh: ["GCC / SASO 规格准备", "耐热防尘场景规划", "阿语 + 英语销售流程"],
      en: ["GCC / SASO-ready specification", "Heat and dust tolerance planning", "Arabic + English sales flow"],
      ar: ["مواصفات GCC / SASO", "تخطيط مقاومة الحرارة والغبار", "مسار بيع عربي وإنجليزي"],
    },
    support: {
      zh: "支持 RTL 界面、GCC 进口规划、别墅项目排期",
      en: "RTL interface, GCC import planning, villa project scheduling",
      ar: "واجهة عربية وتخطيط استيراد خليجي وجدولة مشاريع الفلل",
    },
    intro: {
      zh: "适合海湾别墅、展厅、承包商、酒店工程和高温气候项目。",
      en: "Built for Gulf villas, showrooms, contractors, hospitality projects, and high-temperature climates.",
      ar: "مناسب لفلل الخليج والمعارض والمقاولين ومشاريع الضيافة والمناخ الحار.",
    },
    formCountry: { zh: "阿联酋", en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
    customerLine: {
      zh: "发送户型图、尺寸和目标城市，客服会在 48 小时内整理报价。",
      en: "Share the floor plan, dimensions, and target city for a quote within 48 hours.",
      ar: "ارسل المخطط والمقاسات والمدينة، وسيتم تجهيز عرض السعر خلال 48 ساعة.",
    },
  },
};

const copy: Record<Lang, Copy> = {
  zh: {
    nav: ["产品", "公司", "地区方案", "询价下单", "联系"],
    language: "语言",
    login: "登录",
    account: "账户",
    serviceTop: "联系客服",
    heroEyebrow: "福建洲鹏定制家居制造商",
    heroTitle: "整屋智能家居系统，服务别墅与高端项目。",
    heroText:
      "洲鹏提供门墙柜橱、五金和整屋配套的定制方案。你可以在线浏览产品、加入询价单、保存项目，并直接联系客服确认下单。",
    startOrder: "发起询价",
    contactService: "联系客服",
    projectRegion: "项目地区",
    founded: "成立",
    productionBase: "生产基地",
    productionBaseValue: "70 亩",
    standardPlant: "标准厂房",
    standardPlantValue: "20,000+㎡",
    productsEyebrow: "产品中心",
    productsTitle: "六大产品系统，组成完整整屋方案。",
    add: "加入询价",
    added: "已加入",
    addedNotice: "已加入询价单。",
    companyEyebrow: "公司实力",
    companyTitle: "从研发设计到生产交付，一体化承接定制家居项目。",
    companyText:
      "洲鹏生产基地位于福建省上杭县，配置标准厂房、办公研发空间和售后团队，可围绕门、墙、柜、橱、五金与配套系统提供项目化服务。",
    engineers: "技术工程师",
    afterSales: "售后工程师",
    systems: "产品系统",
    equipment: "设备品牌",
    regionEyebrow: "地区系统",
    regionTitle: "面向欧美与中东项目，自动匹配地区方案。",
    regionCardText: "报价币种、规格文件、电气适配和客服流程会随项目地区调整。",
    selectedSolution: "已选方案",
    orderEyebrow: "项目询价",
    orderTitle: "提交项目需求，客服整理报价。",
    emptyQuote: "先从产品中心加入系统，也可以直接提交整屋需求。",
    total: "预估起始总价",
    custom: "定制报价",
    name: "姓名",
    email: "邮箱",
    country: "国家 / 地区",
    phone: "电话 / WhatsApp",
    projectType: "项目类型",
    budget: "预算",
    notes: "项目备注",
    notesPlaceholder: "房间数量、材料偏好、户型图状态、目标交付城市等...",
    submitOrder: "提交询价",
    saved: "询价已保存。客服会在 48 小时内联系你。",
    contactEyebrow: "客户服务",
    contactTitle: "项目确认前，先和客服对齐需求。",
    phoneLabel: "电话",
    emailLabel: "邮箱",
    address:
      "地址：中国福建省上杭县蛟洋工业园区华强小区丽家坪工业区 2-1、2-2 号",
    openDesk: "打开在线客服",
    footer: "基于公开企业材料搭建的全球智能家居商城。",
    footerIntro: "福建洲鹏实业有限公司专注门、墙、柜、橱、五金及配套系统，服务定制家居与整屋项目。",
    footerContactTitle: "联系我们",
    footerNavTitle: "快捷导航",
    footerProductsTitle: "产品中心",
    footerCopyright: "版权所有 © 福建洲鹏实业有限公司",
    footerSite: "网址：www.fjzpsy.com",
    loginSystem: "登录系统",
    loginTitle: "登录后保存项目与询价单。",
    loginText: "当前为前端演示登录。输入邮箱和密码后，系统会在本机保存你的项目会话。",
    password: "密码",
    signIn: "登录 / 注册",
    signedIn: "已登录：",
    close: "关闭",
    onlineService: "在线客服",
    serviceDesk: "洲鹏在线客服",
    villaQuote: "别墅报价",
    dealerPrice: "经销报价",
    chatPlaceholder: "请输入项目类型、城市、面积或预算...",
    send: "发送",
    starterMessage: "你好，这里是洲鹏在线客服。请告诉我项目类型、所在城市和面积，我会协助你整理询价。",
    agentReply: "已收到。请补充户型图、现场照片、面积和目标国家，客服会据此整理 BOM 与报价。",
    quickVillaText: "我需要别墅整屋方案报价。",
    quickDealerText: "我想了解经销政策和产品目录。",
    brandHome: "洲鹏智能家居首页",
    brandSubline: "智能家居",
    primaryNavLabel: "主导航",
    heroImageAlt: "现代智能家居客厅与一体化柜体",
    companyImageAlt: "洲鹏生产设备图片",
    highlightsLabel: "企业数据",
    remove: "移除",
    removeLabel: "移除",
    home: "首页",
    requiredFieldsError: "请填写邮箱和密码。",
    invalidEmailError: "请输入有效的邮箱地址。",
    passwordRequiredError: "请输入密码。",
    quoteRequiredError: "请填写姓名、邮箱、国家 / 地区和电话。",
  },
  en: {
    nav: ["Products", "Company", "Regional Plans", "Get Quote", "Contact"],
    language: "Language",
    login: "Login",
    account: "Account",
    serviceTop: "Service",
    heroEyebrow: "Fujian ZhouPeng custom home manufacturer",
    heroTitle: "Whole-home smart living systems for premium projects.",
    heroText:
      "ZhouPeng supplies coordinated doors, wall panels, cabinets, kitchens, hardware, and project support. Browse systems, build a quote list, save the project, and contact service to confirm the order.",
    startOrder: "Request a quote",
    contactService: "Contact service",
    projectRegion: "Project region",
    founded: "Founded",
    productionBase: "Production base",
    productionBaseValue: "70 mu",
    standardPlant: "Standard plant",
    standardPlantValue: "20,000+ sqm",
    productsEyebrow: "Product Systems",
    productsTitle: "Six coordinated systems for one whole-home package.",
    add: "Add to quote",
    added: "Added",
    addedNotice: " added to the quote.",
    companyEyebrow: "Company",
    companyTitle: "Integrated R&D, design, production, delivery, and after-sales support.",
    companyText:
      "ZhouPeng's manufacturing base in Shanghang, Fujian supports project work across doors, wall panels, cabinets, kitchens, hardware, and supporting systems, with dedicated design and service teams.",
    engineers: "Technical engineers",
    afterSales: "After-sales engineers",
    systems: "Product systems",
    equipment: "Equipment brands",
    regionEyebrow: "Regional Plans",
    regionTitle: "Prepared for Europe, North America, and GCC projects.",
    regionCardText:
      "Quote currency, specification files, electrical coordination, and service steps adjust by region.",
    selectedSolution: "Selected Solution",
    orderEyebrow: "Project Quote",
    orderTitle: "Send your project brief for a sales quote.",
    emptyQuote: "Add products from the catalogue, or submit for a whole-home consultation.",
    total: "Estimated starting total",
    custom: "Custom",
    name: "Name",
    email: "Email",
    country: "Country",
    phone: "Phone / WhatsApp",
    projectType: "Project type",
    budget: "Budget",
    notes: "Project notes",
    notesPlaceholder: "Room count, preferred material, floor plan status, target delivery city...",
    submitOrder: "Submit quote request",
    saved: "Quote request saved. Customer service will respond within 48 hours.",
    contactEyebrow: "Customer Service",
    contactTitle: "Align the project details with sales before ordering.",
    phoneLabel: "Phone",
    emailLabel: "Email",
    address: "Address: Lijiaping Industrial Zone, Shanghang County, Fujian Province, China.",
    openDesk: "Open service desk",
    footer: "Global smart home mall concept based on public company materials.",
    footerIntro: "Fujian ZhouPeng Industrial focuses on door, wall, cabinet, kitchen, hardware, and supporting systems for custom home projects.",
    footerContactTitle: "Contact us",
    footerNavTitle: "Quick links",
    footerProductsTitle: "Product center",
    footerCopyright: "Copyright © Fujian ZhouPeng Industrial Co., Ltd.",
    footerSite: "Website: www.fjzpsy.com",
    loginSystem: "Login System",
    loginTitle: "Save your project and quote list.",
    loginText: "This is a front-end demo login. Use an email and password to save the session on this device.",
    password: "Password",
    signIn: "Sign in / register",
    signedIn: "Signed in as ",
    close: "Close",
    onlineService: "Online Service",
    serviceDesk: "ZhouPeng service desk",
    villaQuote: "Villa quote",
    dealerPrice: "Dealer price",
    chatPlaceholder: "Project type, city, area, or budget...",
    send: "Send",
    starterMessage: "Hi, this is ZhouPeng service. Share the project type, city, and floor area so we can prepare the quote path.",
    agentReply:
      "Received. Please attach room photos, floor plan size, and target country in the quote form for a precise BOM.",
    quickVillaText: "I need a villa whole-home quote.",
    quickDealerText: "I want dealer pricing and catalogues.",
    brandHome: "ZhouPeng Smart Living home",
    brandSubline: "Smart Living",
    primaryNavLabel: "Primary navigation",
    heroImageAlt: "Modern smart home living room with integrated cabinetry",
    companyImageAlt: "ZhouPeng production and equipment image",
    highlightsLabel: "Company highlights",
    remove: "Remove",
    removeLabel: "Remove",
    home: "Home",
    requiredFieldsError: "Please fill in email and password.",
    invalidEmailError: "Please enter a valid email address.",
    passwordRequiredError: "Please enter your password.",
    quoteRequiredError: "Please fill in name, email, country, and phone.",
  },
  ar: {
    nav: ["المنتجات", "الشركة", "خطط المناطق", "طلب عرض", "التواصل"],
    language: "اللغة",
    login: "دخول",
    account: "الحساب",
    serviceTop: "خدمة العملاء",
    heroEyebrow: "مصنع منازل ذكية مخصصة في فوجيان",
    heroTitle: "أنظمة منزل ذكي متكاملة للفلل والمشاريع الراقية.",
    heroText:
      "تقدم ZhouPeng الأبواب والجدران والخزائن والمطابخ والملحقات وخدمات المشروع ضمن حزمة واحدة. تصفح الأنظمة، أنشئ قائمة عرض، ثم تواصل مع الخدمة لتأكيد الطلب.",
    startOrder: "اطلب عرضا",
    contactService: "تواصل مع الخدمة",
    projectRegion: "منطقة المشروع",
    founded: "تأسست",
    productionBase: "قاعدة إنتاج",
    productionBaseValue: "70 مو",
    standardPlant: "مصنع قياسي",
    standardPlantValue: "أكثر من 20,000 م²",
    productsEyebrow: "مركز المنتجات",
    productsTitle: "ستة أنظمة منسقة لحزمة منزل كاملة.",
    add: "إضافة",
    added: "تمت الإضافة",
    addedNotice: " تمت إضافته إلى طلب العرض.",
    companyEyebrow: "صفحة الشركة",
    companyTitle: "بحث وتصميم وإنتاج وتسليم وخدمة ما بعد البيع ضمن مسار واحد.",
    companyText:
      "تدعم قاعدة ZhouPeng في شانغهانغ، فوجيان مشاريع الأبواب والجدران والخزائن والمطابخ والملحقات، مع فرق تصميم وخدمة للمشاريع المخصصة.",
    engineers: "مهندسون تقنيون",
    afterSales: "مهندسو خدمة",
    systems: "أنظمة منتجات",
    equipment: "علامات المعدات",
    regionEyebrow: "نظام المناطق",
    regionTitle: "تجهيز للمشاريع في أوروبا وأمريكا ودول الخليج.",
    regionCardText: "تتغير العملة وملفات المواصفات والتنسيق الكهربائي وخطوات الخدمة حسب المنطقة.",
    selectedSolution: "الحل المختار",
    orderEyebrow: "عرض المشروع",
    orderTitle: "أرسل بيانات المشروع ليجهز فريق المبيعات العرض.",
    emptyQuote: "أضف منتجات من الكتالوج أو أرسل استشارة للمنزل بالكامل.",
    total: "الإجمالي المبدئي",
    custom: "مخصص",
    name: "الاسم",
    email: "البريد الإلكتروني",
    country: "الدولة",
    phone: "الهاتف / واتساب",
    projectType: "نوع المشروع",
    budget: "الميزانية",
    notes: "ملاحظات المشروع",
    notesPlaceholder: "عدد الغرف، المواد، حالة المخطط، مدينة التسليم...",
    submitOrder: "إرسال طلب العرض",
    saved: "تم حفظ طلب العرض. ستتواصل خدمة العملاء خلال 48 ساعة.",
    contactEyebrow: "خدمة العملاء",
    contactTitle: "نسق تفاصيل المشروع مع المبيعات قبل تأكيد الطلب.",
    phoneLabel: "الهاتف",
    emailLabel: "البريد",
    address: "العنوان: منطقة Lijiaping الصناعية، شانغهانغ، فوجيان، الصين.",
    openDesk: "افتح خدمة العملاء",
    footer: "متجر منزل ذكي عالمي مبني على مواد الشركة العامة.",
    footerIntro: "تركز Fujian ZhouPeng Industrial على الأبواب والجدران والخزائن والمطابخ والملحقات وخدمات المشاريع المخصصة.",
    footerContactTitle: "تواصل معنا",
    footerNavTitle: "روابط سريعة",
    footerProductsTitle: "مركز المنتجات",
    footerCopyright: "حقوق النشر © Fujian ZhouPeng Industrial Co., Ltd.",
    footerSite: "الموقع: www.fjzpsy.com",
    loginSystem: "نظام الدخول",
    loginTitle: "احفظ المشروع وقائمة العرض.",
    loginText: "هذا تسجيل دخول تجريبي أمامي. استخدم بريدا وكلمة مرور لحفظ الجلسة على هذا الجهاز.",
    password: "كلمة المرور",
    signIn: "دخول / تسجيل",
    signedIn: "تم الدخول باسم ",
    close: "إغلاق",
    onlineService: "خدمة مباشرة",
    serviceDesk: "مركز خدمة ZhouPeng",
    villaQuote: "عرض فيلا",
    dealerPrice: "سعر الوكيل",
    chatPlaceholder: "نوع المشروع، المدينة، المساحة، أو الميزانية...",
    send: "إرسال",
    starterMessage: "مرحبا، هذه خدمة ZhouPeng. شارك نوع المشروع والمدينة والمساحة لنجهز مسار العرض.",
    agentReply: "تم الاستلام. يرجى إضافة الصور والمخطط والمساحة والدولة في نموذج العرض لتجهيز قائمة المواد.",
    quickVillaText: "أحتاج عرضا لمنزل فيلا كامل.",
    quickDealerText: "أريد أسعار الوكلاء والكتالوجات.",
    brandHome: "الصفحة الرئيسية لـ ZhouPeng Smart Living",
    brandSubline: "حياة ذكية",
    primaryNavLabel: "التنقل الرئيسي",
    heroImageAlt: "غرفة معيشة منزل ذكي حديثة مع خزائن مدمجة",
    companyImageAlt: "صورة معدات إنتاج ZhouPeng",
    highlightsLabel: "بيانات الشركة",
    remove: "حذف",
    removeLabel: "حذف",
    home: "الرئيسية",
    requiredFieldsError: "يرجى إدخال البريد الإلكتروني وكلمة المرور.",
    invalidEmailError: "يرجى إدخال بريد إلكتروني صحيح.",
    passwordRequiredError: "يرجى إدخال كلمة المرور.",
    quoteRequiredError: "يرجى إدخال الاسم والبريد الإلكتروني والدولة ورقم الهاتف.",
  },
};

const languageOptions: Array<{ key: Lang; label: string }> = [
  { key: "zh", label: "中文" },
  { key: "en", label: "English" },
  { key: "ar", label: "العربية" },
];

const isLang = (value: string | null): value is Lang =>
  value === "zh" || value === "en" || value === "ar";

const getAgentReply = (text: string, language: Lang) => {
  const lower = text.toLowerCase();
  const isShort = text.replace(/\s/g, "").length < 5 || /^\d+$/.test(text.trim());

  if (language === "zh") {
    if (isShort) return "我需要更多项目信息。请补充国家/城市、户型面积、产品系统和预算区间，我再帮你整理报价。";
    if (/经销|代理|dealer|catalog|目录/.test(lower)) return "可以。经销合作请留下公司名称、目标市场和预计展厅面积，客服会发送产品目录和经销报价。";
    if (/价格|报价|预算|quote|price|多少钱/.test(lower)) return "报价会按产品系统、尺寸、材料和目的地计算。你可以先加入产品到询价单，再提交电话或 WhatsApp。";
    if (/图纸|户型|尺寸|plan|drawing|size/.test(lower)) return "请准备户型图、现场照片和关键尺寸。客服会据此整理 BOM、初步方案和交付建议。";
    if (/电话|邮箱|联系|whatsapp|contact/.test(lower)) return "可以直接电话 0597-3992099，或发送邮件到 cathy@shhf2008.com。";
    return "已收到。客服会根据你的描述整理产品清单、项目范围和下一步资料需求。";
  }

  if (language === "ar") {
    if (isShort) return "نحتاج تفاصيل أكثر: الدولة والمدينة والمساحة والأنظمة المطلوبة والميزانية التقريبية.";
    if (/dealer|catalog|وكيل|كتالوج/.test(lower)) return "للتعاون مع الوكلاء، يرجى إرسال اسم الشركة والسوق المستهدف ومساحة المعرض لنوفر الكتالوج والسعر.";
    if (/quote|price|budget|سعر|عرض|ميزانية/.test(lower)) return "يعتمد العرض على الأنظمة والمقاسات والمواد ومدينة التسليم. أضف المنتجات ثم أرسل بيانات التواصل.";
    if (/plan|drawing|size|مخطط|مقاس/.test(lower)) return "يرجى تجهيز المخطط والصور والمقاسات الأساسية لنرتب قائمة المواد والتوصية الأولية.";
    if (/contact|phone|email|whatsapp|تواصل|هاتف/.test(lower)) return "يمكنك الاتصال على 0597-3992099 أو إرسال بريد إلى cathy@shhf2008.com.";
    return "تم الاستلام. سيقوم فريق الخدمة بتحديد نطاق المشروع والمواد المطلوبة والخطوة التالية.";
  }

  if (isShort) return "Please share more detail: country, city, floor area, product systems, and budget range.";
  if (/dealer|catalog|distributor|partner/.test(lower)) return "For dealer cooperation, share your company name, target market, and showroom size. We can prepare catalogues and dealer pricing.";
  if (/quote|price|budget|cost/.test(lower)) return "Pricing depends on product systems, dimensions, materials, and destination. Add products to the quote and submit your contact details.";
  if (/plan|drawing|size|dimension|floor/.test(lower)) return "Please prepare floor plans, room photos, and key dimensions so the service team can build a BOM and first proposal.";
  if (/contact|phone|email|whatsapp/.test(lower)) return "You can call 0597-3992099 or email cathy@shhf2008.com directly.";
  return "Received. The service team will review your project scope and outline the next information needed.";
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function Home() {
  const [language, setLanguage] = useState<Lang>("zh");
  const [region, setRegion] = useState<Region>("west");
  const [quote, setQuote] = useState<Product[]>([]);
  const [selected, setSelected] = useState(products[3]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [sessionEmail, setSessionEmail] = useState(() =>
    typeof window === "undefined" ? "" : window.localStorage.getItem("zp-session-email") ?? "",
  );
  const [quoteStatus, setQuoteStatus] = useState("");
  const [loginError, setLoginError] = useState("");
  const [quoteError, setQuoteError] = useState("");
  const [chatText, setChatText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "agent", text: copy.zh.starterMessage },
  ]);
  const [isHydrated, setIsHydrated] = useState(false);

  const t = copy[language];
  const regionData = regions[region];
  const dir = language === "ar" ? "rtl" : "ltr";
  const quoteTotal = quote.reduce(
    (sum, item) => sum + (region === "middleEast" ? item.priceMe : item.priceWest),
    0,
  );

  const displayPrice = useMemo(
    () => (item: Product) => {
      const value = region === "middleEast" ? item.priceMe : item.priceWest;
      return `${regionData.pricePrefix}${value.toLocaleString("en-US")}`;
    },
    [region, regionData.pricePrefix],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedLanguage = window.localStorage.getItem("zp-language");
      if (isLang(savedLanguage)) {
        setLanguage(savedLanguage);
        if (savedLanguage === "ar") setRegion("middleEast");
        setMessages([{ role: "agent", text: copy[savedLanguage].starterMessage }]);
      }
      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const addToQuote = (product: Product) => {
    setQuote((current) =>
      current.some((item) => item.id === product.id) ? current : [...current, product],
    );
    setSelected(product);
    setQuoteStatus(`${product.title[language]}${t.addedNotice}`);
  };

  const removeFromQuote = (id: string) => {
    setQuote((current) => current.filter((item) => item.id !== id));
  };

  const submitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");

    if (!email && !password) {
      setLoginError(t.requiredFieldsError);
      return;
    }
    if (!isValidEmail(email)) {
      setLoginError(t.invalidEmailError);
      return;
    }
    if (!password) {
      setLoginError(t.passwordRequiredError);
      return;
    }

    window.localStorage.setItem("zp-session-email", email);
    setSessionEmail(email);
    setLoginError("");
    setIsLoginOpen(false);
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const country = String(data.country || "").trim();
    const phone = String(data.phone || "").trim();

    if (!name || !email || !country || !phone) {
      setQuoteError(t.quoteRequiredError);
      setQuoteStatus("");
      return;
    }
    if (!isValidEmail(email)) {
      setQuoteError(t.invalidEmailError);
      setQuoteStatus("");
      return;
    }

    window.localStorage.setItem(
      "zp-last-quote",
      JSON.stringify({
        region,
        language,
        quoteItems: quote.map((item) => item.id),
        submittedAt: new Date().toISOString(),
        ...data,
      }),
    );
    setQuoteError("");
    setQuoteStatus(t.saved);
  };

  const sendChat = (text = chatText) => {
    const cleanText = text.trim();
    if (!cleanText) return;
    setMessages((current) => [
      ...current,
      { role: "customer", text: cleanText },
      { role: "agent", text: getAgentReply(cleanText, language) },
    ]);
    setChatText("");
  };

  const switchLanguage = (nextLanguage: Lang) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("zp-language", nextLanguage);
    if (nextLanguage === "ar") setRegion("middleEast");
    setLoginError("");
    setQuoteError("");
    setQuoteStatus("");
    setMessages([{ role: "agent", text: copy[nextLanguage].starterMessage }]);
  };

  return (
    <main className="site-shell" dir={dir} lang={language === "zh" ? "zh-CN" : language}>
      <header className="topbar">
        <a
          className="brand"
          href="#home"
          aria-label={t.brandHome}
        >
          <img src={asset("/zp/logo.png")} alt="" />
          <span>
            <strong>{language === "zh" ? "洲鹏" : "ZhouPeng"}</strong>
            <small>{t.brandSubline}</small>
          </span>
        </a>
        <nav className="nav-links" aria-label={t.primaryNavLabel}>
          <a href="#products">{t.nav[0]}</a>
          <a href="#company">{t.nav[1]}</a>
          <a href="#solutions">{t.nav[2]}</a>
          <a href="#quote">{t.nav[3]}</a>
          <a href="#contact">{t.nav[4]}</a>
        </nav>
        <div className="top-actions">
          <select
            aria-label={t.language}
            className="language-select"
            value={language}
            onChange={(event) => switchLanguage(event.target.value as Lang)}
            disabled={!isHydrated}
          >
            {languageOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="icon-button service-top" onClick={() => setIsServiceOpen(true)} type="button">
            {t.serviceTop}
          </button>
          <button className="icon-button" onClick={() => setIsLoginOpen(true)} type="button">
            {sessionEmail ? t.account : t.login}
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-image">
          <img src={asset("/zp/hero.jpg")} alt={t.heroImageAlt} />
          <div className="hero-chip">
            <span>{t.projectRegion}</span>
            <strong>{regionData.name[language]}</strong>
            <small>{regionData.currency}</small>
          </div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <a className="button primary" href="#quote">
              {t.startOrder}
            </a>
            <button className="button secondary" onClick={() => setIsServiceOpen(true)} type="button">
              {t.contactService}
            </button>
            <a className="button secondary" href="tel:05973992099">
              0597-3992099
            </a>
          </div>
          <div className="proof-strip" aria-label={t.highlightsLabel}>
            <span>
              <strong>2012</strong>
              {t.founded}
            </span>
            <span>
              <strong>{t.productionBaseValue}</strong>
              {t.productionBase}
            </span>
            <span>
              <strong>{t.standardPlantValue}</strong>
              {t.standardPlant}
            </span>
          </div>
        </div>
      </section>

      <section className="catalogue" id="products">
        <div className="section-heading">
          <p className="eyebrow">{t.productsEyebrow}</p>
          <h2>{t.productsTitle}</h2>
          <p>{regionData.intro[language]}</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article
              className={`product-card ${quote.some((item) => item.id === product.id) ? "in-quote" : ""}`}
              key={product.id}
            >
              <button className="image-button" onClick={() => setSelected(product)} type="button">
                <img src={asset(product.image)} alt={`${product.title[language]} preview`} />
                <span>{product.badge[language]}</span>
              </button>
              <div className="product-body">
                <small>{product.zone[language]}</small>
                <h3>{product.title[language]}</h3>
                <p>{product.summary[language]}</p>
                <ul>
                  {product.specs[language].map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
                <div className="product-foot">
                  <strong>{displayPrice(product)}</strong>
                  <button
                    className={quote.some((item) => item.id === product.id) ? "added" : ""}
                    onClick={() => addToQuote(product)}
                    type="button"
                    aria-pressed={quote.some((item) => item.id === product.id)}
                  >
                    {quote.some((item) => item.id === product.id) ? t.added : t.add}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-split" id="company">
        <div className="split-copy">
          <p className="eyebrow">{t.companyEyebrow}</p>
          <h2>{t.companyTitle}</h2>
          <p>{t.companyText}</p>
          <div className="company-metrics">
            <span>
              <strong>20</strong>
              {t.engineers}
            </span>
            <span>
              <strong>10</strong>
              {t.afterSales}
            </span>
            <span>
              <strong>6</strong>
              {t.systems}
            </span>
          </div>
        </div>
        <div className="factory-card">
          <img
            src={asset("/zp/factory.jpeg")}
            alt={t.companyImageAlt}
          />
          <div>
            <span>{t.equipment}</span>
            <strong>Jidong, Nanxing, Cangao, Moke, Baitian</strong>
          </div>
        </div>
      </section>

      <section className="solution-band" id="solutions">
        <div className="section-heading compact">
          <p className="eyebrow">{t.regionEyebrow}</p>
          <h2>{t.regionTitle}</h2>
          <p>{regionData.support[language]}</p>
        </div>
        <div className="solution-grid">
          {regionData.standards[language].map((standard) => (
            <article key={standard}>
              <span>{regionData.short}</span>
              <h3>{standard}</h3>
              <p>{t.regionCardText}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="order-section" id="quote">
        <div className="order-preview">
          <p className="eyebrow">{t.selectedSolution}</p>
          <img src={asset(selected.image)} alt={`${selected.title[language]} selected preview`} />
          <div>
            <span>{selected.zone[language]}</span>
            <h2>{selected.title[language]}</h2>
            <p>{selected.summary[language]}</p>
            <strong>{displayPrice(selected)}</strong>
          </div>
        </div>
        <form className="quote-panel" onSubmit={submitQuote} noValidate>
          <div className="panel-heading">
            <p className="eyebrow">{t.orderEyebrow}</p>
            <h2>{t.orderTitle}</h2>
            <p>{regionData.customerLine[language]}</p>
          </div>
          <div className="quote-list">
            {quote.length === 0 ? (
              <p className="empty-state">{t.emptyQuote}</p>
            ) : (
              quote.map((item) => (
                <div className="quote-row" key={item.id}>
                  <span>{item.title[language]}</span>
                  <strong>{displayPrice(item)}</strong>
                  <button
                    onClick={() => removeFromQuote(item.id)}
                    type="button"
                    aria-label={`${t.removeLabel} ${item.title[language]}`}
                  >
                    {t.remove}
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="quote-total">
            <span>{t.total}</span>
            <strong>
              {quote.length ? `${regionData.pricePrefix}${quoteTotal.toLocaleString("en-US")}` : t.custom}
            </strong>
          </div>
          <div className="form-grid">
            <label className="wide-field">
              {t.projectRegion}
              <select
                name="region"
                value={region}
                onChange={(event) => setRegion(event.target.value as Region)}
              >
                {(["west", "middleEast"] as Region[]).map((key) => (
                  <option key={key} value={key}>
                    {regions[key].name[language]} · {regions[key].currency}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t.name}
              <input name="name" placeholder={t.name} />
            </label>
            <label>
              {t.email}
              <input name="email" inputMode="email" placeholder="name@company.com" />
            </label>
            <label>
              {t.country}
              <input name="country" defaultValue={regionData.formCountry[language]} />
            </label>
            <label>
              {t.phone}
              <input name="phone" placeholder="+86 / +1 / +971 / +966" />
            </label>
            <label>
              {t.projectType}
              <select name="projectType" defaultValue="villa">
                <option value="villa">{language === "zh" ? "别墅" : language === "ar" ? "فيلا" : "Villa"}</option>
                <option value="apartment">{language === "zh" ? "公寓" : language === "ar" ? "شقة" : "Apartment"}</option>
                <option value="dealer">{language === "zh" ? "经销展厅" : language === "ar" ? "معرض وكيل" : "Dealer showroom"}</option>
                <option value="hotel">{language === "zh" ? "酒店 / 商业" : language === "ar" ? "فندق / تجاري" : "Hotel / commercial"}</option>
              </select>
            </label>
            <label>
              {t.budget}
              <select name="budget" defaultValue="mid">
                <option value="starter">{language === "zh" ? "10,000 美元以下" : language === "ar" ? "أقل من 10,000 دولار" : "Below 10,000 USD"}</option>
                <option value="mid">{language === "zh" ? "10,000 - 50,000 美元" : language === "ar" ? "10,000 - 50,000 دولار" : "10,000 - 50,000 USD"}</option>
                <option value="premium">{language === "zh" ? "50,000 美元以上" : language === "ar" ? "أكثر من 50,000 دولار" : "Above 50,000 USD"}</option>
              </select>
            </label>
          </div>
          <label>
            {t.notes}
            <textarea name="notes" placeholder={t.notesPlaceholder} />
          </label>
          {quoteError ? <p className="error-message" role="alert">{quoteError}</p> : null}
          <button className="button primary full" type="submit">
            {t.submitOrder}
          </button>
          {quoteStatus ? <p className="success-message">{quoteStatus}</p> : null}
        </form>
      </section>

      <section className="contact-band" id="contact">
        <div>
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h2>{t.contactTitle}</h2>
          <p>
            {t.phoneLabel}: <a href="tel:05973992099">0597-3992099</a> · {t.emailLabel}:{" "}
            <a href="mailto:cathy@shhf2008.com">cathy@shhf2008.com</a>
          </p>
          <p>{t.address}</p>
        </div>
        <button className="button secondary" onClick={() => setIsServiceOpen(true)} type="button">
          {t.openDesk}
        </button>
      </section>

      <footer className="site-footer" id="site-footer">
        <span>版权所有 © 2026 福建洲鹏实业有限公司</span>
      </footer>

      <button className="service-float" onClick={() => setIsServiceOpen(true)} type="button">
        {t.contactService}
      </button>

      {isLoginOpen ? (
        <div className="modal-backdrop" role="presentation">
          <section className="modal" id="login" role="dialog" aria-modal="true" aria-label={t.loginSystem}>
            <button className="modal-close" onClick={() => setIsLoginOpen(false)} type="button">
              {t.close}
            </button>
            <p className="eyebrow">{t.loginSystem}</p>
            <h2>{t.loginTitle}</h2>
            <p className="muted">{t.loginText}</p>
            <form onSubmit={submitLogin} noValidate>
              <label>
                {t.email}
                <input name="email" inputMode="email" placeholder="buyer@example.com" />
              </label>
              <label>
                {t.password}
                <input name="password" type="password" placeholder="******" />
              </label>
              {loginError ? <p className="error-message" role="alert">{loginError}</p> : null}
              <button className="button primary full" type="submit">
                {t.signIn}
              </button>
            </form>
            {sessionEmail ? <p className="success-message">{t.signedIn}{sessionEmail}</p> : null}
          </section>
        </div>
      ) : null}

      {isServiceOpen ? (
        <aside className="service-desk" aria-label={t.onlineService}>
          <div className="service-head">
            <div>
              <p className="eyebrow">{t.onlineService}</p>
              <h2>{t.serviceDesk}</h2>
            </div>
            <button onClick={() => setIsServiceOpen(false)} type="button">
              {t.close}
            </button>
          </div>
          <div className="service-contact">
            <a href="tel:05973992099">0597-3992099</a>
            <a href="mailto:cathy@shhf2008.com">cathy@shhf2008.com</a>
          </div>
          <div className="message-list">
            {messages.map((message, index) => (
              <p className={message.role} key={`${message.role}-${index}`}>
                {message.text}
              </p>
            ))}
          </div>
          <div className="quick-replies">
            <button onClick={() => sendChat(t.quickVillaText)} type="button">
              {t.villaQuote}
            </button>
            <button onClick={() => sendChat(t.quickDealerText)} type="button">
              {t.dealerPrice}
            </button>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendChat();
            }}
          >
            <input
              value={chatText}
              onChange={(event) => setChatText(event.target.value)}
              placeholder={t.chatPlaceholder}
            />
            <button type="submit">{t.send}</button>
          </form>
        </aside>
      ) : null}
    </main>
  );
}
