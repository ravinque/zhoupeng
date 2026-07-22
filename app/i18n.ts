export type Lang = "zh" | "en" | "ar";
export type Region = "west" | "middleEast";
export type Localized = Record<Lang, string>;

export type Product = {
  id: string;
  title: Localized;
  shortName: Localized;
  zone: Localized;
  summary: Localized;
  image: string;
  specs: Record<Lang, string[]>;
  badge: Localized;
  priceWest: number;
  priceMe: number;
};

export type Copy = {
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
  viewDetails: string;
  productDetails: string;
  detailFeatures: string;
  detailAdd: string;
  detailQuote: string;
  backList: string;
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
  websiteLabel: string;
  addressLabel: string;
  addressValue: string;
  address: string;
  openDesk: string;
  footer: string;
  footerIntro: string;
  footerContactTitle: string;
  footerNavTitle: string;
  footerProductsTitle: string;
  footerCopyright: string;
  footerCloudCredit: string;
  footerPoweredBy: string;
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
  whatsApp: string;
  whatsAppDesk: string;
  whatsAppStarter: string;
  whatsAppHint: string;
  emailUs: string;
  videoEyebrow: string;
  videoTitle: string;
  videoText: string;
  categoriesEyebrow: string;
  categoriesTitle: string;
  showcaseCaption: string;
  aboutP1: string;
  aboutP2: string;
  aboutP3: string;
  aboutP4: string;
  officeLabel: string;
  officeValue: string;
  opsCentersLabel: string;
  opsCentersValue: string;
  exportLabel: string;
  exportValue: string;
  greenLabel: string;
  greenValue: string;
  advantageEyebrow: string;
  advantageTitle: string;
  tabEquipment: string;
  tabSoftware: string;
  tabTech: string;
  equipmentIntro: string;
  equipmentBrands: string;
  equipmentListLabel: string;
  equipmentItems: string[];
  softwareIntro: string;
  softwareSystems: string;
  softwareTeam: string;
  techIntro: string;
  techItems: string[];
  factoryVideoTitles: string[];
  factoryVideoTexts: string[];
  exploreCategory: string;
  playHeroVideo: string;
  whatsAppInquiry: string;
  emailSubjectGeneral: string;
  emailBodyGeneral: string;
  quoteEmailSubject: string;
  brandName: string;
  brandMark: string;
  pageTitle: string;
  projectTypeOptions: Array<{ value: string; label: string }>;
  budgetOptions: Array<{ value: string; label: string }>;
  advantageAsideEquipmentLabel: string;
  advantageAsideEquipmentValue: string;
  advantageAsideSoftwareLabel: string;
  advantageAsideSoftwareValue: string;
  advantageAsideTechLabel: string;
  advantageAsideTechValue: string;
  quoteMailHeading: string;
  quoteMailName: string;
  quoteMailEmail: string;
  quoteMailCountry: string;
  quoteMailPhone: string;
  quoteMailRegion: string;
  quoteMailProjectType: string;
  quoteMailBudget: string;
  quoteMailItems: string;
  quoteMailWholeHome: string;
  quoteMailTotal: string;
  quoteMailNotes: string;
  quoteMailWebsite: string;
};

export const products: Product[] = [
  {
    id: "door",
    title: { zh: "智能门系统", en: "Smart Door System", ar: "نظام الأبواب الذكية" },
    shortName: { zh: "门系统", en: "Door System", ar: "نظام الأبواب" },
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
    shortName: { zh: "墙系统", en: "Wall System", ar: "نظام الجدران" },
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
    shortName: { zh: "柜系统", en: "Cabinet System", ar: "نظام الخزائن" },
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
    shortName: { zh: "橱系统", en: "Kitchen System", ar: "نظام المطبخ" },
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
    shortName: { zh: "五金系统", en: "Hardware Kit", ar: "مجموعة الملحقات" },
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
    shortName: { zh: "配套系统", en: "Support System", ar: "نظام الدعم" },
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

export const regions: Record<
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
    formCountry: { zh: "美国", en: "United States", ar: "الولايات المتحدة" },
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

export const copy: Record<Lang, Copy> = {
  zh: {
    nav: ["产品", "公司", "地区方案", "询价下单", "联系"],
    language: "语言",
    login: "登录",
    account: "账户",
    serviceTop: "联系客服",
    heroEyebrow: "福建洲鹏实业定制家居制造商",
    heroTitle: "整屋智能家居，\u200B服务别墅与高端项目。",
    heroText: "门墙柜橱、五金与整屋配套 — 在线浏览、询价、联系客服确认下单。",
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
    viewDetails: "查看详情",
    productDetails: "产品详情",
    detailFeatures: "方案配置",
    detailAdd: "加入询价单",
    detailQuote: "去询价下单",
    backList: "返回列表",
    companyEyebrow: "公司实力",
    companyTitle: "从研发设计到生产交付，一体化承接定制家居项目。",
    companyText:
      "福建洲鹏实业生产基地位于福建省上杭县，配置标准厂房、办公研发空间和售后团队，可围绕门、墙、柜、橱、五金与配套系统提供项目化服务。",
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
    websiteLabel: "网址",
    addressLabel: "地址",
    addressValue: "福建省上杭县李家坪工业区",
    address: "地址：中国福建省上杭县李家坪工业区",
    openDesk: "打开在线客服",
    footer: "基于公开企业材料搭建的全球智能家居商城。",
    footerIntro: "福建洲鹏实业有限公司专注门、墙、柜、橱、五金及配套系统，服务定制家居与整屋项目。",
    footerContactTitle: "联系我们",
    footerNavTitle: "快捷导航",
    footerProductsTitle: "产品中心",
    footerCopyright: "版权所有 © 2026 福建洲鹏实业有限公司",
    footerCloudCredit: "本网站由阿里云提供云计算及安全服务",
    footerPoweredBy: "技术支持：Lapus",
    loginSystem: "登录系统",
    loginTitle: "登录后保存项目与询价单。",
    loginText: "使用邮箱与密码登录或注册账户。登录后可同步保存项目信息与询价单，便于后续跟进与下单。",
    password: "密码",
    signIn: "登录 / 注册",
    signedIn: "已登录：",
    close: "关闭",
    onlineService: "在线客服",
    serviceDesk: "福建洲鹏实业在线客服",
    villaQuote: "别墅报价",
    dealerPrice: "经销报价",
    chatPlaceholder: "请输入项目类型、城市、面积或预算...",
    send: "发送",
    starterMessage: "你好，这里是福建洲鹏实业在线客服。请告诉我项目类型、所在城市和面积，我会协助你整理询价。",
    agentReply: "已收到。请补充户型图、现场照片、面积和目标国家，客服会据此整理 BOM 与报价。可以直接电话 0597-3992099，或发送邮件到 sales@zhoupengindustry.com，也可以 WhatsApp 联系。",
    quickVillaText: "我需要别墅整屋方案报价。",
    quickDealerText: "我想了解经销政策和产品目录。",
    brandHome: "福建洲鹏实业首页",
    brandSubline: "智能家居",
    primaryNavLabel: "主导航",
    heroImageAlt: "现代智能家居客厅与一体化柜体",
    companyImageAlt: "福建洲鹏实业生产设备图片",
    highlightsLabel: "企业数据",
    remove: "移除",
    removeLabel: "移除",
    home: "首页",
    requiredFieldsError: "请填写邮箱和密码。",
    invalidEmailError: "请输入有效的邮箱地址。",
    passwordRequiredError: "请输入密码。",
    quoteRequiredError: "请填写姓名、邮箱、国家 / 地区和电话。",
    whatsApp: "WhatsApp 咨询",
    whatsAppDesk: "WhatsApp 客服",
    whatsAppStarter: "你好，这里是福建洲鹏实业 WhatsApp 客服。请直接留言项目类型、所在城市和面积，我会协助你整理询价。",
    whatsAppHint: "可在此窗口直接沟通，留言后客服会尽快回复。如需电话可拨打 0597-3992099。",
    emailUs: "邮件咨询",
    videoEyebrow: "工厂实拍",
    videoTitle: "生产基地与工艺现场",
    videoText: "走进福建洲鹏实业标准厂房，了解门墙柜橱的生产流程与设备配置。",
    categoriesEyebrow: "产品体系",
    categoriesTitle: "六大系统，组成完整整屋方案",
    showcaseCaption: "福建洲鹏实业定制家居 — 设计 · 生产 · 交付",
    aboutP1:
      "福建洲鹏实业有限公司成立于 2012 年，生产基地位于福建省上杭县李家坪工业区，占地 70 亩，拥有 20,000+ ㎡标准厂房与 1,500 ㎡办公研发空间。",
    aboutP2:
      "运营中心分布在北京、上海、广州、深圳、厦门，海外生产基地在马来西亚和泰国，产品出口美国、德国、澳大利亚、加拿大、西班牙等国家。",
    aboutP3:
      "公司坚持绿色健康理念，从选材、封边、油漆到安装全程管控环保标准，为别墅、公寓、经销商展厅和工程项目提供一体化定制服务。",
    aboutP4:
      "围绕门、墙、柜、橱、五金与配套系统，福建洲鹏实业可承接方案深化、生产交付、安装文件与售后支持，帮助项目顺利落地。",
    officeLabel: "办公研发",
    officeValue: "1,500 ㎡",
    opsCentersLabel: "运营中心",
    opsCentersValue: "北京 · 上海 · 广州 · 深圳 · 厦门",
    exportLabel: "出口市场",
    exportValue: "美国 · 德国 · 澳大利亚 · 加拿大 · 西班牙",
    greenLabel: "企业理念",
    greenValue: "绿色 · 健康 · 环保定制",
    advantageEyebrow: "核心优势",
    advantageTitle: "设备、软件与技术三位一体",
    tabEquipment: "设备优势",
    tabSoftware: "软件优势",
    tabTech: "技术优势",
    equipmentIntro: "引进国际先进生产线，配置全系列定制家居加工设备，保障产能与品质稳定。",
    equipmentBrands: "设备品牌：极东、南兴、灿高、磨克、百田；板式家具生产线。",
    equipmentListLabel: "主要设备",
    equipmentItems: [
      "电子锯",
      "数控开料机",
      "全自动线封边机",
      "PUR 封边机",
      "斜边封边机",
      "EVA 封边机",
      "四面刨",
      "灿高组装机",
      "砂光机",
    ],
    softwareIntro: "设计拆单与生产管理全流程数字化，提升方案效率与交付精度。",
    softwareSystems: "软件系统：晨丰、至爱智家、易木、圆方。",
    softwareTeam: "研发团队 20 名工程师，售后团队 10 名工程师，保障方案落地与持续服务。",
    techIntro: "多项核心工艺满足高端定制家居的功能与美学需求。",
    techItems: [
      "PUR 封边 — 耐磨防水",
      "45° 斜边封边无拉手",
      "实木油漆及 UV 45 道工艺环保",
      "转角 / 圆弧 / 穿插 / 悬浮等特殊工艺",
    ],
    factoryVideoTitles: ["一号生产线", "封边与组装", "质检与包装"],
    factoryVideoTexts: [
      "数控开料与电子锯精准下料。",
      "PUR / EVA 封边与组装工序。",
      "出厂前质检与包装流程。",
    ],
    exploreCategory: "探索该系统",
    playHeroVideo: "播放工厂视频",
    whatsAppInquiry: "您好，我想咨询福建洲鹏实业定制家居方案，请协助报价。",
    emailSubjectGeneral: "福建洲鹏实业定制家居咨询",
    emailBodyGeneral:
      "您好，\n\n我想了解福建洲鹏实业门墙柜橱及整屋配套方案，请协助提供产品资料与报价。\n\n谢谢。",
    quoteEmailSubject: "福建洲鹏实业项目询价",
    brandName: "福建洲鹏实业",
    brandMark: "福建洲鹏实业 · Fujian ZhouPeng Industrial",
    pageTitle: "福建洲鹏实业 — 整屋定制方案",
    projectTypeOptions: [
      { value: "villa", label: "别墅" },
      { value: "apartment", label: "公寓" },
      { value: "dealer", label: "经销展厅" },
      { value: "hotel", label: "酒店 / 商业" },
    ],
    budgetOptions: [
      { value: "starter", label: "10,000 美元以下" },
      { value: "mid", label: "10,000 - 50,000 美元" },
      { value: "premium", label: "50,000 美元以上" },
    ],
    advantageAsideEquipmentLabel: "技术工程师",
    advantageAsideEquipmentValue: "20 + 售后工程师 10",
    advantageAsideSoftwareLabel: "产品系统",
    advantageAsideSoftwareValue: "晨丰 · 至爱 · 易木 · 圆方",
    advantageAsideTechLabel: "核心工艺",
    advantageAsideTechValue: "绿色 · 健康 · 环保定制",
    quoteMailHeading: "福建洲鹏实业项目询价",
    quoteMailName: "姓名",
    quoteMailEmail: "邮箱",
    quoteMailCountry: "国家",
    quoteMailPhone: "电话",
    quoteMailRegion: "地区",
    quoteMailProjectType: "项目类型",
    quoteMailBudget: "预算",
    quoteMailItems: "已选系统",
    quoteMailWholeHome: "整屋咨询",
    quoteMailTotal: "预估总价",
    quoteMailNotes: "备注",
    quoteMailWebsite: "网站",
  },
  en: {
    nav: ["Products", "Company", "Regional Plans", "Get Quote", "Contact"],
    language: "Language",
    login: "Login",
    account: "Account",
    serviceTop: "Talk to us",
    heroEyebrow: "Fujian ZhouPeng Industrial custom home manufacturer",
    heroTitle: "Whole-home smart living for premium projects.",
    heroText: "Doors, walls, cabinets, kitchens, hardware, and project support — browse, quote, and connect with our team.",
    startOrder: "Request a quote",
    contactService: "Talk to us",
    projectRegion: "Project region",
    founded: "Founded",
    productionBase: "Production base",
    productionBaseValue: "70 mu (~11.5 acres)",
    standardPlant: "Standard plant",
    standardPlantValue: "20,000+ sqm",
    productsEyebrow: "Product Systems",
    productsTitle: "Six coordinated systems for one whole-home package.",
    add: "Add to quote",
    added: "Added",
    addedNotice: " added to the quote.",
    viewDetails: "View details",
    productDetails: "Product details",
    detailFeatures: "Package features",
    detailAdd: "Add to quote",
    detailQuote: "Go to quote",
    backList: "Back to list",
    companyEyebrow: "Company",
    companyTitle: "Integrated R&D, design, production, delivery, and after-sales support.",
    companyText:
      "Fujian ZhouPeng Industrial's manufacturing base in Shanghang, Fujian supports project work across doors, wall panels, cabinets, kitchens, hardware, and supporting systems, with dedicated design and service teams.",
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
    websiteLabel: "Website",
    addressLabel: "Address",
    addressValue: "Lijiaping Industrial Zone, Shanghang County, Fujian Province, China",
    address: "Address: Lijiaping Industrial Zone, Shanghang County, Fujian Province, China",
    openDesk: "Open service desk",
    footer: "Global smart home mall concept based on public company materials.",
    footerIntro: "Fujian ZhouPeng Industrial focuses on door, wall, cabinet, kitchen, hardware, and supporting systems for custom home projects.",
    footerContactTitle: "Contact us",
    footerNavTitle: "Quick links",
    footerProductsTitle: "Product center",
    footerCopyright: "Copyright © 2026 Fujian ZhouPeng Industrial Co., Ltd.",
    footerCloudCredit: "Cloud computing and security services powered by Alibaba Cloud",
    footerPoweredBy: "Powered by Lapus",
    loginSystem: "Account login",
    loginTitle: "Sign in to save projects and quotes.",
    loginText: "Sign in or register with your email and password. After logging in, your project details and quote list will be saved for follow-up and ordering.",
    password: "Password",
    signIn: "Sign in / Register",
    signedIn: "Signed in as ",
    close: "Close",
    onlineService: "Online Service",
    serviceDesk: "Fujian ZhouPeng Industrial service desk",
    villaQuote: "Villa quote",
    dealerPrice: "Dealer price",
    chatPlaceholder: "Project type, city, area, or budget...",
    send: "Send",
    starterMessage: "Hi, this is Fujian ZhouPeng Industrial service. Share the project type, city, and floor area so we can prepare the quote path.",
    agentReply:
      "Received. Please attach room photos, floor plan size, and target country in the quote form for a precise BOM. You can also call 0597-3992099, email sales@zhoupengindustry.com, or reach us on WhatsApp.",
    quickVillaText: "I need a villa whole-home quote.",
    quickDealerText: "I want dealer pricing and catalogues.",
    brandHome: "Fujian ZhouPeng Industrial home",
    brandSubline: "Smart Living",
    primaryNavLabel: "Primary navigation",
    heroImageAlt: "Modern smart home living room with integrated cabinetry",
    companyImageAlt: "Fujian ZhouPeng Industrial production and equipment image",
    highlightsLabel: "Company highlights",
    remove: "Remove",
    removeLabel: "Remove",
    home: "Home",
    requiredFieldsError: "Please fill in email and password.",
    invalidEmailError: "Please enter a valid email address.",
    passwordRequiredError: "Please enter your password.",
    quoteRequiredError: "Please fill in name, email, country, and phone.",
    whatsApp: "WhatsApp",
    whatsAppDesk: "WhatsApp desk",
    whatsAppStarter: "Hi, this is Fujian ZhouPeng Industrial WhatsApp support. Share the project type, city, and floor area so we can prepare a quote.",
    whatsAppHint: "Chat here directly and we will reply soon. You can also call 0597-3992099.",
    emailUs: "Email us",
    videoEyebrow: "Inside the factory",
    videoTitle: "Production base and on-site craft",
    videoText: "Tour Fujian ZhouPeng Industrial's standard plant and see how doors, walls, and cabinets are built.",
    categoriesEyebrow: "Product systems",
    categoriesTitle: "Six coordinated systems for a complete home",
    showcaseCaption: "Fujian ZhouPeng Industrial custom homes — design · production · delivery",
    aboutP1:
      "Fujian ZhouPeng Industrial Co., Ltd. was founded in 2012 in Lijiaping Industrial Zone, Shanghang County, covering 70 mu with 20,000+ sqm of standard plant and 1,500 sqm of office and R&D space.",
    aboutP2:
      "Operations centers in Beijing, Shanghai, Guangzhou, Shenzhen, and Xiamen; production bases in Malaysia and Thailand; exports to the US, Germany, Australia, Canada, and Spain.",
    aboutP3:
      "We follow a green and healthy philosophy, controlling materials, edge banding, finishing, and installation to meet environmental standards for villas, apartments, showrooms, and commercial projects.",
    aboutP4:
      "From doors, wall panels, cabinets, kitchens, hardware, and supporting systems, Fujian ZhouPeng Industrial delivers integrated design, production, installation files, and after-sales support.",
    officeLabel: "Office & R&D",
    officeValue: "1,500 sqm",
    opsCentersLabel: "Operations",
    opsCentersValue: "Beijing · Shanghai · Guangzhou · Shenzhen · Xiamen",
    exportLabel: "Export markets",
    exportValue: "US · Germany · Australia · Canada · Spain",
    greenLabel: "Philosophy",
    greenValue: "Green · healthy · responsible custom homes",
    advantageEyebrow: "Core strengths",
    advantageTitle: "Equipment, software, and technology in one stack",
    tabEquipment: "Equipment",
    tabSoftware: "Software",
    tabTech: "Technology",
    equipmentIntro: "Advanced panel lines and full-series woodworking equipment for stable capacity and quality.",
    equipmentBrands: "Brands: Jidong, Nanxing, Cangao, Moke, Baitian; panel furniture line.",
    equipmentListLabel: "Key equipment",
    equipmentItems: [
      "Electronic saw",
      "CNC nesting machine",
      "Automatic edge banding line",
      "PUR edge bander",
      "Bevel edge bander",
      "EVA edge bander",
      "Four-sided planer",
      "Cangao assembly machine",
      "Sanding machine",
    ],
    softwareIntro: "Digital design, splitting, and production management for faster proposals and accurate delivery.",
    softwareSystems: "Systems: Chenfeng, Zhiai Zhijia, Yimu, Yuanfang.",
    softwareTeam: "20 R&D engineers and 10 after-sales engineers supporting every project.",
    techIntro: "Core processes for premium custom homes in function and aesthetics.",
    techItems: [
      "PUR edge banding — wear and water resistant",
      "45° bevel edge, handle-free",
      "Solid wood paint and UV — 45-step eco process",
      "Corner, arc, interlock, and floating special crafts",
    ],
    factoryVideoTitles: ["Line 01", "Edge banding & assembly", "QC & packing"],
    factoryVideoTexts: [
      "CNC nesting and electronic saw cutting.",
      "PUR / EVA edge banding and assembly.",
      "Pre-shipment inspection and packing.",
    ],
    exploreCategory: "Explore system",
    playHeroVideo: "Play factory video",
    whatsAppInquiry: "Hello, I would like to inquire about Fujian ZhouPeng Industrial custom home solutions. Please assist with a quote.",
    emailSubjectGeneral: "Fujian ZhouPeng Industrial custom home inquiry",
    emailBodyGeneral:
      "Hello,\n\nI would like to learn about Fujian ZhouPeng Industrial door, wall, cabinet, kitchen, and whole-home packages. Please share catalogues and pricing.\n\nThank you.",
    quoteEmailSubject: "Fujian ZhouPeng Industrial project quote request",
    brandName: "Fujian ZhouPeng Industrial",
    brandMark: "Fujian ZhouPeng Industrial · 福建洲鹏实业",
    pageTitle: "Fujian ZhouPeng Industrial — Whole-home Custom Solutions",
    projectTypeOptions: [
      { value: "villa", label: "Villa" },
      { value: "apartment", label: "Apartment" },
      { value: "dealer", label: "Dealer showroom" },
      { value: "hotel", label: "Hotel / commercial" },
    ],
    budgetOptions: [
      { value: "starter", label: "Below 10,000 USD" },
      { value: "mid", label: "10,000 - 50,000 USD" },
      { value: "premium", label: "Above 50,000 USD" },
    ],
    advantageAsideEquipmentLabel: "Technical engineers",
    advantageAsideEquipmentValue: "20 + After-sales 10",
    advantageAsideSoftwareLabel: "Product systems",
    advantageAsideSoftwareValue: "Chenfeng · Zhiai · Yimu · Yuanfang",
    advantageAsideTechLabel: "Core crafts",
    advantageAsideTechValue: "Green · healthy · responsible homes",
    quoteMailHeading: "Fujian ZhouPeng Industrial Project Quote Request",
    quoteMailName: "Name",
    quoteMailEmail: "Email",
    quoteMailCountry: "Country",
    quoteMailPhone: "Phone",
    quoteMailRegion: "Region",
    quoteMailProjectType: "Project type",
    quoteMailBudget: "Budget",
    quoteMailItems: "Selected systems",
    quoteMailWholeHome: "Whole-home consultation",
    quoteMailTotal: "Estimated total",
    quoteMailNotes: "Notes",
    quoteMailWebsite: "Website",
  },
  ar: {
    nav: ["المنتجات", "الشركة", "خطط المناطق", "طلب عرض", "التواصل"],
    language: "اللغة",
    login: "دخول",
    account: "الحساب",
    serviceTop: "تحدث معنا",
    heroEyebrow: "فوجيان تشو بنغ الصناعية — مصنع منازل ذكية مخصصة",
    heroTitle: "أنظمة منزل ذكي متكاملة للفلل والمشاريع الراقية.",
    heroText: "أبواب وجدران وخزائن ومطابخ وملحقات — تصفح، اطلب عرضا، وتواصل مع فريقنا.",
    startOrder: "اطلب عرضا",
    contactService: "تحدث معنا",
    projectRegion: "منطقة المشروع",
    founded: "تأسست",
    productionBase: "قاعدة إنتاج",
    productionBaseValue: "70 مو (~11.5 فدان)",
    standardPlant: "مصنع قياسي",
    standardPlantValue: "أكثر من 20,000 م²",
    productsEyebrow: "مركز المنتجات",
    productsTitle: "ستة أنظمة منسقة لحزمة منزل كاملة.",
    add: "إضافة",
    added: "تمت الإضافة",
    addedNotice: " تمت إضافته إلى طلب العرض.",
    viewDetails: "عرض التفاصيل",
    productDetails: "تفاصيل المنتج",
    detailFeatures: "مكونات الحزمة",
    detailAdd: "إضافة إلى العرض",
    detailQuote: "انتقل إلى العرض",
    backList: "العودة إلى القائمة",
    companyEyebrow: "صفحة الشركة",
    companyTitle: "بحث وتصميم وإنتاج وتسليم وخدمة ما بعد البيع ضمن مسار واحد.",
    companyText:
      "تدعم قاعدة فوجيان تشو بنغ الصناعية في شانغهانغ، فوجيان مشاريع الأبواب والجدران والخزائن والمطابخ والملحقات، مع فرق تصميم وخدمة للمشاريع المخصصة.",
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
    websiteLabel: "الموقع",
    addressLabel: "العنوان",
    addressValue: "منطقة لي جيا بينغ الصناعية، شانغهانغ، فوجيان، الصين",
    address: "العنوان: منطقة لي جيا بينغ الصناعية، شانغهانغ، فوجيان، الصين",
    openDesk: "افتح خدمة العملاء",
    footer: "متجر منزل ذكي عالمي مبني على مواد الشركة العامة.",
    footerIntro: "تركز فوجيان تشو بنغ الصناعية على الأبواب والجدران والخزائن والمطابخ والملحقات وخدمات المشاريع المخصصة.",
    footerContactTitle: "تواصل معنا",
    footerNavTitle: "روابط سريعة",
    footerProductsTitle: "مركز المنتجات",
    footerCopyright: "جميع الحقوق محفوظة © 2026 شركة فوجيان تشو بنغ الصناعية المحدودة",
    footerCloudCredit: "توفر علي بابا كلاود خدمات الحوسبة السحابية والأمن لهذا الموقع",
    footerPoweredBy: "مدعوم من Lapus",
    loginSystem: "تسجيل الدخول",
    loginTitle: "سجّل الدخول لحفظ المشاريع وعروض الأسعار.",
    loginText: "سجّل الدخول أو أنشئ حسابا بالبريد الإلكتروني وكلمة المرور. بعد الدخول تُحفظ تفاصيل مشروعك وقائمة العرض للمتابعة والطلب.",
    password: "كلمة المرور",
    signIn: "دخول / تسجيل",
    signedIn: "تم الدخول باسم ",
    close: "إغلاق",
    onlineService: "خدمة مباشرة",
    serviceDesk: "مركز خدمة فوجيان تشو بنغ الصناعية",
    villaQuote: "عرض فيلا",
    dealerPrice: "سعر الوكيل",
    chatPlaceholder: "نوع المشروع، المدينة، المساحة، أو الميزانية...",
    send: "إرسال",
    starterMessage: "مرحبا، هذه خدمة فوجيان تشو بنغ الصناعية. شارك نوع المشروع والمدينة والمساحة لنجهز مسار العرض.",
    agentReply: "تم الاستلام. يرجى إضافة الصور والمخطط والمساحة والدولة في نموذج العرض لتجهيز قائمة المواد. يمكنك أيضا الاتصال على 0597-3992099 أو إرسال بريد إلى sales@zhoupengindustry.com أو التواصل عبر واتساب.",
    quickVillaText: "أحتاج عرضا لمنزل فيلا كامل.",
    quickDealerText: "أريد أسعار الوكلاء والكتالوجات.",
    brandHome: "الصفحة الرئيسية لفوجيان تشو بنغ الصناعية",
    brandSubline: "حياة ذكية",
    primaryNavLabel: "التنقل الرئيسي",
    heroImageAlt: "غرفة معيشة منزل ذكي حديثة مع خزائن مدمجة",
    companyImageAlt: "صورة معدات إنتاج فوجيان تشو بنغ الصناعية",
    highlightsLabel: "بيانات الشركة",
    remove: "حذف",
    removeLabel: "حذف",
    home: "الرئيسية",
    requiredFieldsError: "يرجى إدخال البريد الإلكتروني وكلمة المرور.",
    invalidEmailError: "يرجى إدخال بريد إلكتروني صحيح.",
    passwordRequiredError: "يرجى إدخال كلمة المرور.",
    quoteRequiredError: "يرجى إدخال الاسم والبريد الإلكتروني والدولة ورقم الهاتف.",
    whatsApp: "واتساب",
    whatsAppDesk: "مكتب واتساب",
    whatsAppStarter: "مرحبا، هذه خدمة واتساب لدى فوجيان تشو بنغ الصناعية. شارك نوع المشروع والمدينة والمساحة لنجهز عرض السعر.",
    whatsAppHint: "تحدث هنا مباشرة وسنرد قريبا. يمكنك أيضا الاتصال على 0597-3992099.",
    emailUs: "راسلنا",
    videoEyebrow: "داخل المصنع",
    videoTitle: "قاعدة الإنتاج والحرفة الميدانية",
    videoText: "تعرف على مصنع فوجيان تشو بنغ الصناعية القياسي وخطوط إنتاج الأبواب والجدران والخزائن.",
    categoriesEyebrow: "أنظمة المنتجات",
    categoriesTitle: "ستة أنظمة منسقة لمنزل متكامل",
    showcaseCaption: "فوجيان تشو بنغ الصناعية للمنازل المخصصة — تصميم · إنتاج · تسليم",
    aboutP1:
      "تأسست شركة فوجيان تشو بنغ الصناعية المحدودة عام 2012 في منطقة لي جيا بينغ الصناعية بشانغهانغ، على مساحة 70 مو مع أكثر من 20,000 م² مصنع و1,500 م² مكاتب وبحث.",
    aboutP2:
      "مراكز تشغيل في بكين وشنغهاي وقوانغتشو وشنتشن وشيامن، وقواعد إنتاج في ماليزيا وتايلاند، وتصدير إلى أمريكا وألمانيا وأستراليا وكندا وإسبانيا.",
    aboutP3:
      "نلتزم بفلسفة صحية وخضراء، من المواد والحواف والدهان إلى التركيب، لخدمة الفلل والشقق والمعارض والمشاريع التجارية.",
    aboutP4:
      "من الأبواب والجدران والخزائن والمطابخ والملحقات، تقدم فوجيان تشو بنغ الصناعية تصميما وإنتاجا وملفات تركيب ودعما بعد البيع.",
    officeLabel: "مكاتب وبحث",
    officeValue: "1,500 م²",
    opsCentersLabel: "مراكز التشغيل",
    opsCentersValue: "بكين · شنغهاي · قوانغتشو · شنتشن · شيامن",
    exportLabel: "أسواق التصدير",
    exportValue: "أمريكا · ألمانيا · أستراليا · كندا · إسبانيا",
    greenLabel: "الفلسفة",
    greenValue: "منازل مخصصة خضراء وصحية",
    advantageEyebrow: "المزايا الأساسية",
    advantageTitle: "معدات وبرمجيات وتقنيات في منظومة واحدة",
    tabEquipment: "المعدات",
    tabSoftware: "البرمجيات",
    tabTech: "التقنية",
    equipmentIntro: "خطوط ألواح متقدمة ومعدات نجارة كاملة لضمان جودة وطاقة مستقرة.",
    equipmentBrands: "العلامات: Jidong وNanxing وCangao وMoke وBaitian؛ خط أثاث ألواح.",
    equipmentListLabel: "المعدات الرئيسية",
    equipmentItems: [
      "منشار إلكتروني",
      "ماكينة تقطيع CNC",
      "خط حواف آلي",
      "لاصق حواف PUR",
      "لاصق حواف مائلة",
      "لاصق حواف EVA",
      "مسحاج رباعي الوجوه",
      "ماكينة تجميع Cangao",
      "ماكينة صنفرة",
    ],
    softwareIntro: "تصميم رقمي وتفكيك وإدارة إنتاج لعروض أسرع وتسليم أدق.",
    softwareSystems: "الأنظمة: Chenfeng وZhiai Zhijia وYimu وYuanfang.",
    softwareTeam: "20 مهندس بحث و10 مهندسي خدمة ما بعد البيع.",
    techIntro: "عمليات أساسية للمنازل المخصصة الراقية.",
    techItems: [
      "حواف PUR — مقاومة للبلى والماء",
      "حافة مائلة 45° بدون مقبض",
      "دهان خشب صلب وUV — 45 خطوة صديقة للبيئة",
      "تقنيات خاصة للزوايا والأقواس والتشابك والتعليق",
    ],
    factoryVideoTitles: ["الخط 01", "الحواف والتجميع", "الفحص والتعبئة"],
    factoryVideoTexts: [
      "تقطيع CNC والمنشار الإلكتروني.",
      "حواف PUR / EVA والتجميع.",
      "فحص قبل الشحن والتعبئة.",
    ],
    exploreCategory: "استكشف النظام",
    playHeroVideo: "تشغيل فيديو المصنع",
    whatsAppInquiry: "مرحبا، أود الاستفسار عن حلول فوجيان تشو بنغ الصناعية للمنازل المخصصة. يرجى المساعدة في تقديم عرض.",
    emailSubjectGeneral: "استفسار فوجيان تشو بنغ الصناعية للمنازل المخصصة",
    emailBodyGeneral:
      "مرحبا،\n\nأود معرفة المزيد عن حزم فوجيان تشو بنغ الصناعية للأبواب والجدران والخزائن والمطابخ. يرجى إرسال الكتالوج والأسعار.\n\nشكرا.",
    quoteEmailSubject: "طلب عرض مشروع فوجيان تشو بنغ الصناعية",
    brandName: "فوجيان تشو بنغ الصناعية",
    brandMark: "فوجيان تشو بنغ الصناعية",
    pageTitle: "فوجيان تشو بنغ الصناعية — حلول منزل مخصصة متكاملة",
    projectTypeOptions: [
      { value: "villa", label: "فيلا" },
      { value: "apartment", label: "شقة" },
      { value: "dealer", label: "معرض وكيل" },
      { value: "hotel", label: "فندق / تجاري" },
    ],
    budgetOptions: [
      { value: "starter", label: "أقل من 10,000 دولار" },
      { value: "mid", label: "10,000 - 50,000 دولار" },
      { value: "premium", label: "أكثر من 50,000 دولار" },
    ],
    advantageAsideEquipmentLabel: "مهندسون تقنيون",
    advantageAsideEquipmentValue: "20 + مهندسو خدمة 10",
    advantageAsideSoftwareLabel: "أنظمة منتجات",
    advantageAsideSoftwareValue: "Chenfeng · Zhiai · Yimu · Yuanfang",
    advantageAsideTechLabel: "تقنيات أساسية",
    advantageAsideTechValue: "منازل خضراء وصحية",
    quoteMailHeading: "طلب عرض مشروع فوجيان تشو بنغ الصناعية",
    quoteMailName: "الاسم",
    quoteMailEmail: "البريد الإلكتروني",
    quoteMailCountry: "الدولة",
    quoteMailPhone: "الهاتف",
    quoteMailRegion: "المنطقة",
    quoteMailProjectType: "نوع المشروع",
    quoteMailBudget: "الميزانية",
    quoteMailItems: "الأنظمة المختارة",
    quoteMailWholeHome: "استشارة منزل كامل",
    quoteMailTotal: "الإجمالي المقدر",
    quoteMailNotes: "ملاحظات",
    quoteMailWebsite: "الموقع",
  },
};

export const languageOptions: Array<{ key: Lang; label: string }> = [
  { key: "zh", label: "中文" },
  { key: "en", label: "English" },
  { key: "ar", label: "العربية" },
];

export const isLang = (value: string | null): value is Lang =>
  value === "zh" || value === "en" || value === "ar";

export const htmlLang = (lang: Lang): string => {
  if (lang === "zh") return "zh-CN";
  return lang;
};

export const brandName = (lang: Lang): string => copy[lang].brandName;

export const brandMark = (lang: Lang): string => copy[lang].brandMark;

export const pageTitle = (lang: Lang): string => copy[lang].pageTitle;

export const getAgentReply = (text: string, language: Lang): string => {
  const lower = text.toLowerCase();
  const isShort = text.replace(/\s/g, "").length < 5 || /^\d+$/.test(text.trim());

  if (language === "zh") {
    if (isShort) return "我需要更多项目信息。请补充国家/城市、户型面积、产品系统和预算区间，我再帮你整理报价。";
    if (/经销|代理|dealer|catalog|目录/.test(lower)) return "可以。经销合作请留下公司名称、目标市场和预计展厅面积，客服会发送产品目录和经销报价。";
    if (/价格|报价|预算|quote|price|多少钱/.test(lower)) return "报价会按产品系统、尺寸、材料和目的地计算。你可以先加入产品到询价单，再提交电话或 WhatsApp。";
    if (/图纸|户型|尺寸|plan|drawing|size/.test(lower)) return "请准备户型图、现场照片和关键尺寸。客服会据此整理 BOM、初步方案和交付建议。";
    if (/电话|邮箱|联系|whatsapp|contact/.test(lower)) return "可以直接电话 0597-3992099，或发送邮件到 sales@zhoupengindustry.com，也可以 WhatsApp 联系。";
    return "已收到。客服会根据你的描述整理产品清单、项目范围和下一步资料需求。";
  }

  if (language === "ar") {
    if (isShort) return "نحتاج تفاصيل أكثر: الدولة والمدينة والمساحة والأنظمة المطلوبة والميزانية التقريبية.";
    if (/dealer|catalog|وكيل|كتالوج/.test(lower)) return "للتعاون مع الوكلاء، يرجى إرسال اسم الشركة والسوق المستهدف ومساحة المعرض لنوفر الكتالوج والسعر.";
    if (/quote|price|budget|سعر|عرض|ميزانية/.test(lower)) return "يعتمد العرض على الأنظمة والمقاسات والمواد ومدينة التسليم. أضف المنتجات ثم أرسل بيانات التواصل.";
    if (/plan|drawing|size|مخطط|مقاس/.test(lower)) return "يرجى تجهيز المخطط والصور والمقاسات الأساسية لنرتب قائمة المواد والتوصية الأولية.";
    if (/contact|phone|email|whatsapp|تواصل|هاتف/.test(lower)) return "يمكنك الاتصال على 0597-3992099 أو إرسال بريد إلى sales@zhoupengindustry.com أو التواصل عبر واتساب.";
    return "تم الاستلام. سيقوم فريق الخدمة بتحديد نطاق المشروع والمواد المطلوبة والخطوة التالية.";
  }

  if (isShort) return "Please share more detail: country, city, floor area, product systems, and budget range.";
  if (/dealer|catalog|distributor|partner/.test(lower)) return "For dealer cooperation, share your company name, target market, and showroom size. We can prepare catalogues and dealer pricing.";
  if (/quote|price|budget|cost/.test(lower)) return "Pricing depends on product systems, dimensions, materials, and destination. Add products to the quote and submit your contact details.";
  if (/plan|drawing|size|dimension|floor/.test(lower)) return "Please prepare floor plans, room photos, and key dimensions so the service team can build a BOM and first proposal.";
  if (/contact|phone|email|whatsapp/.test(lower)) return "You can call 0597-3992099, email sales@zhoupengindustry.com, or reach us on WhatsApp.";
  return "Received. The service team will review your project scope and outline the next information needed.";
};
