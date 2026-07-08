"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useMemo, useState } from "react";

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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const products: Product[] = [
  {
    id: "door",
    title: { zh: "智能门系统", en: "Smart Door System", ar: "نظام الأبواب الذكية" },
    cn: "门系统",
    zone: { zh: "入户门、室内门", en: "Entry & room doors", ar: "أبواب المداخل والغرف" },
    summary: {
      zh: "平框门、隐藏铰链、磁吸锁、静音密封与智能门锁预留，适合别墅和精装项目。",
      en: "Flat-frame doors with concealed hinges, magnetic locks, acoustic seals, and access-ready hardware.",
      ar: "أبواب بإطار مسطح ومفصلات مخفية وأقفال مغناطيسية وتجهيزات للدخول الذكي.",
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
      zh: "墙板可集成灯带、开关、影音收纳、传感器和隐藏走线，让整屋控制更干净。",
      en: "Wall panels designed for lighting rails, switches, media storage, sensors, and invisible cable routing.",
      ar: "ألواح جدارية للإضاءة والمفاتيح والتخزين والحساسات وتمديد الأسلاك المخفية.",
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
      zh: "定制柜体集成 LED 场景灯、充电抽屉、通风模块和灵活收纳规划。",
      en: "Custom cabinets with LED scenes, charging drawers, ventilation, and flexible storage planning.",
      ar: "خزائن مخصصة مع إضاءة ذكية وأدراج شحن وتهوية وتنظيم مرن.",
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
      zh: "橱柜、家电高柜、水槽区、灯光场景一体化，适合海外别墅和展厅项目。",
      en: "Clean-line kitchen cabinetry with appliance towers, water-safe materials, and connected lighting scenes.",
      ar: "خزائن مطبخ أنيقة مع أبراج أجهزة ومواد مقاومة للماء وإضاءة متصلة.",
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
      zh: "软关闭五金、隐藏滑轨、智能锁、电源排和场景开关，按区域打包出货。",
      en: "Hardware packs for soft-close motion, hidden rails, smart locks, power strips, and scene switches.",
      ar: "حزم ملحقات للغلق الهادئ والسكك المخفية والأقفال الذكية ومفاتيح المشاهد.",
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
      zh: "提供设计、安装图纸、BOM 清单、远程验收和海外售后配套，方便直接下单。",
      en: "Design, installation documents, remote acceptance, and after-sales packs for overseas projects.",
      ar: "تصميم ومستندات تركيب وقائمة مواد وقبول عن بعد وخدمة للمشاريع الخارجية.",
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

const copy = {
  zh: {
    nav: ["产品", "公司主页", "地区系统", "联系下单", "联系方式"],
    language: "语言",
    login: "登录",
    account: "账户",
    serviceTop: "联系客服",
    heroEyebrow: "福建定制智能家居制造商",
    heroTitle: "面向别墅、展厅和高端项目的整屋智能家居系统。",
    heroText:
      "ZhouPeng 覆盖门、墙、柜、橱、五金与整屋配套系统。你可以浏览产品、加入询价单、登录保存项目，并直接联系在线客服下单。",
    startOrder: "开始下单",
    contactService: "联系客服",
    projectRegion: "项目地区",
    founded: "成立",
    productionBase: "生产基地",
    standardPlant: "标准厂房",
    productsEyebrow: "产品中心",
    productsTitle: "六大系统，一次完成整屋智能家居询价。",
    add: "加入",
    companyEyebrow: "公司主页",
    companyTitle: "福建 ZhouPeng 实业集研发、设计、生产、运营和售后服务为一体。",
    companyText:
      "生产基地位于福建省上杭县，拥有 20,000 平方米以上标准厂房和 1,500 平方米办公楼。团队配置技术研发、设计和售后工程师，服务定制家居项目。",
    engineers: "技术工程师",
    afterSales: "售后工程师",
    systems: "产品系统",
    equipment: "设备品牌",
    regionEyebrow: "地区系统",
    regionTitle: "同一套商城，适配欧美和中东两种市场。",
    regionCardText: "产品选择、报价币种、文档、插头和客服流程都会根据地区切换。",
    selectedSolution: "已选方案",
    orderEyebrow: "联系客服下单",
    orderTitle: "提交项目询价。",
    emptyQuote: "从产品中心加入产品，或直接提交整屋咨询。",
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
    submitOrder: "提交下单咨询",
    saved: "询价已保存。客服会在 48 小时内联系你。",
    contactEyebrow: "客户服务",
    contactTitle: "下单前可以直接联系客服。",
    phoneLabel: "电话",
    emailLabel: "邮箱",
    address:
      "地址：中国福建省上杭县蛟洋工业园区华强小区丽家坪工业区 2-1、2-2 号",
    openDesk: "打开在线客服",
    footer: "基于公开企业材料搭建的全球智能家居商城。",
    loginSystem: "登录系统",
    loginTitle: "登录后保存项目询价。",
    loginText: "这是 GitHub Pages 上的前端演示登录。输入任意邮箱和密码即可保存本地会话。",
    password: "密码",
    signIn: "登录 / 注册",
    signedIn: "已登录：",
    close: "关闭",
    onlineService: "在线客服",
    serviceDesk: "ZhouPeng 客服中心",
    villaQuote: "别墅报价",
    dealerPrice: "经销报价",
    chatPlaceholder: "请输入你的项目问题...",
    send: "发送",
    starterMessage: "你好，这里是 ZhouPeng 在线客服。请告诉我项目类型、国家地区和户型面积，我会协助你下单报价。",
    agentReply: "已收到。请在询价表里补充户型图、房间照片、面积和目标国家，客服会整理 BOM 和报价。",
    quickVillaText: "我需要别墅整屋智能家居报价。",
    quickDealerText: "我想了解经销商价格和产品目录。",
  },
  en: {
    nav: ["Products", "Company", "Regions", "Order", "Contact"],
    language: "Language",
    login: "Login",
    account: "Account",
    serviceTop: "Service",
    heroEyebrow: "Fujian custom smart home manufacturer",
    heroTitle: "Whole-home smart systems for villas, showrooms, and premium projects.",
    heroText:
      "ZhouPeng covers door, wall, cabinet, kitchen, hardware, and whole-home supporting systems. Browse products, add them to a quote, sign in, and contact service to order.",
    startOrder: "Start an order",
    contactService: "Contact service",
    projectRegion: "Project region",
    founded: "Founded",
    productionBase: "Production base",
    standardPlant: "Standard plant",
    productsEyebrow: "Products Center",
    productsTitle: "Six product systems for one coordinated smart home order.",
    add: "Add",
    companyEyebrow: "Company Homepage",
    companyTitle: "Fujian ZhouPeng Industrial integrates R&D, design, production, operation, and service.",
    companyText:
      "The manufacturing base is located in Shanghang County, Fujian, with more than 20,000 sqm of standard plant and a 1,500 sqm office building. The team includes technical R&D, design, and after-sales groups for custom home projects.",
    engineers: "Technical engineers",
    afterSales: "After-sales engineers",
    systems: "Product systems",
    equipment: "Equipment brands",
    regionEyebrow: "Regional System",
    regionTitle: "One interface, two market modes.",
    regionCardText:
      "Product selections, quote currency, documents, plugs, and service flow adjust to this region.",
    selectedSolution: "Selected Solution",
    orderEyebrow: "Contact & Order",
    orderTitle: "Request a project quote.",
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
    submitOrder: "Submit order request",
    saved: "Quote request saved. Customer service will respond within 48 hours.",
    contactEyebrow: "Customer Service",
    contactTitle: "Talk to sales before you order.",
    phoneLabel: "Phone",
    emailLabel: "Email",
    address: "Address: Lijiaping Industrial Zone, Shanghang County, Fujian Province, China.",
    openDesk: "Open service desk",
    footer: "Global smart home mall concept based on public company materials.",
    loginSystem: "Login System",
    loginTitle: "Access project orders.",
    loginText: "Demo front-end login for GitHub Pages. Use any email and password to save a local session.",
    password: "Password",
    signIn: "Sign in / register",
    signedIn: "Signed in as ",
    close: "Close",
    onlineService: "Online Service",
    serviceDesk: "ZhouPeng sales desk",
    villaQuote: "Villa quote",
    dealerPrice: "Dealer price",
    chatPlaceholder: "Type your project question...",
    send: "Send",
    starterMessage: "Hi, this is ZhouPeng Smart Living. Share your project type, country, and floor plan size for a fast quote.",
    agentReply:
      "Received. Please attach room photos, floor plan size, and target country in the quote form for a precise BOM.",
    quickVillaText: "I need a villa whole-home quote.",
    quickDealerText: "I want dealer pricing and catalogues.",
  },
  ar: {
    nav: ["المنتجات", "الشركة", "المناطق", "الطلب", "التواصل"],
    language: "اللغة",
    login: "دخول",
    account: "الحساب",
    serviceTop: "خدمة العملاء",
    heroEyebrow: "مصنع منازل ذكية مخصصة في فوجيان",
    heroTitle: "أنظمة منزل ذكي كاملة للفلل والمعارض والمشاريع الراقية.",
    heroText:
      "تغطي ZhouPeng الأبواب والجدران والخزائن والمطابخ والملحقات وخدمات المنزل بالكامل. تصفح المنتجات وأضفها لطلب عرض وتواصل مع الخدمة.",
    startOrder: "ابدأ الطلب",
    contactService: "تواصل مع الخدمة",
    projectRegion: "منطقة المشروع",
    founded: "تأسست",
    productionBase: "قاعدة إنتاج",
    standardPlant: "مصنع قياسي",
    productsEyebrow: "مركز المنتجات",
    productsTitle: "ستة أنظمة منتجات لطلب منزل ذكي متكامل.",
    add: "إضافة",
    companyEyebrow: "صفحة الشركة",
    companyTitle: "تجمع Fujian ZhouPeng Industrial بين البحث والتصميم والإنتاج والتشغيل والخدمة.",
    companyText:
      "تقع قاعدة التصنيع في شانغهانغ، فوجيان، مع أكثر من 20,000 متر مربع من المصانع ومبنى مكاتب 1,500 متر مربع، وفريق للبحث والتصميم وخدمة ما بعد البيع.",
    engineers: "مهندسون تقنيون",
    afterSales: "مهندسو خدمة",
    systems: "أنظمة منتجات",
    equipment: "علامات المعدات",
    regionEyebrow: "نظام المناطق",
    regionTitle: "واجهة واحدة وسوقان.",
    regionCardText: "تتغير المنتجات والعملة والوثائق والمقابس ومسار الخدمة حسب المنطقة.",
    selectedSolution: "الحل المختار",
    orderEyebrow: "تواصل واطلب",
    orderTitle: "اطلب عرض سعر للمشروع.",
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
    contactTitle: "تواصل مع المبيعات قبل الطلب.",
    phoneLabel: "الهاتف",
    emailLabel: "البريد",
    address: "العنوان: منطقة Lijiaping الصناعية، شانغهانغ، فوجيان، الصين.",
    openDesk: "افتح خدمة العملاء",
    footer: "متجر منزل ذكي عالمي مبني على مواد الشركة العامة.",
    loginSystem: "نظام الدخول",
    loginTitle: "الوصول إلى طلبات المشروع.",
    loginText: "تسجيل دخول تجريبي لصفحات GitHub. استخدم أي بريد وكلمة مرور لحفظ الجلسة محليا.",
    password: "كلمة المرور",
    signIn: "دخول / تسجيل",
    signedIn: "تم الدخول باسم ",
    close: "إغلاق",
    onlineService: "خدمة مباشرة",
    serviceDesk: "مركز خدمة ZhouPeng",
    villaQuote: "عرض فيلا",
    dealerPrice: "سعر الوكيل",
    chatPlaceholder: "اكتب سؤالك عن المشروع...",
    send: "إرسال",
    starterMessage: "مرحبا، هذه خدمة ZhouPeng. شارك نوع المشروع والدولة ومساحة المخطط لعرض سريع.",
    agentReply: "تم الاستلام. يرجى إضافة الصور والمخطط والمساحة والدولة في نموذج العرض لتجهيز قائمة المواد.",
    quickVillaText: "أحتاج عرضا لمنزل فيلا كامل.",
    quickDealerText: "أريد أسعار الوكلاء والكتالوجات.",
  },
} satisfies Record<Lang, Record<string, string | string[]>>;

const languageOptions: Array<{ key: Lang; label: string }> = [
  { key: "zh", label: "中文" },
  { key: "en", label: "EN" },
  { key: "ar", label: "عربي" },
];

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
  const [chatText, setChatText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "agent", text: copy.zh.starterMessage },
  ]);

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

  const addToQuote = (product: Product) => {
    setQuote((current) =>
      current.some((item) => item.id === product.id) ? current : [...current, product],
    );
    setSelected(product);
  };

  const removeFromQuote = (id: string) => {
    setQuote((current) => current.filter((item) => item.id !== id));
  };

  const submitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "guest@zhoupeng-home.com");
    window.localStorage.setItem("zp-session-email", email);
    setSessionEmail(email);
    setIsLoginOpen(false);
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
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
    setQuoteStatus(t.saved);
  };

  const sendChat = (text = chatText) => {
    const cleanText = text.trim();
    if (!cleanText) return;
    setMessages((current) => [
      ...current,
      { role: "customer", text: cleanText },
      { role: "agent", text: t.agentReply },
    ]);
    setChatText("");
  };

  const switchLanguage = (nextLanguage: Lang) => {
    setLanguage(nextLanguage);
    setMessages([{ role: "agent", text: copy[nextLanguage].starterMessage }]);
  };

  return (
    <main className="site-shell" dir={dir} lang={language === "zh" ? "zh-CN" : language}>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="ZhouPeng Smart Living home">
          <img src={asset("/zp/logo.png")} alt="" />
          <span>
            <strong>ZhouPeng</strong>
            <small>Smart Living</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#products">{t.nav[0]}</a>
          <a href="#company">{t.nav[1]}</a>
          <a href="#solutions">{t.nav[2]}</a>
          <a href="#quote">{t.nav[3]}</a>
          <a href="#contact">{t.nav[4]}</a>
        </nav>
        <div className="top-actions">
          <div className="region-switch" aria-label="Region switcher">
            {(["west", "middleEast"] as Region[]).map((key) => (
              <button
                className={region === key ? "active" : ""}
                key={key}
                onClick={() => setRegion(key)}
                type="button"
              >
                {regions[key].short}
              </button>
            ))}
          </div>
          <div className="language-switch" aria-label={t.language}>
            {languageOptions.map((option) => (
              <button
                className={language === option.key ? "active" : ""}
                key={option.key}
                onClick={() => switchLanguage(option.key)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
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
          <img src={asset("/zp/hero.jpg")} alt="Modern smart home living room with integrated cabinetry" />
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
          <div className="proof-strip" aria-label="Company highlights">
            <span>
              <strong>2012</strong>
              {t.founded}
            </span>
            <span>
              <strong>70 mu</strong>
              {t.productionBase}
            </span>
            <span>
              <strong>20,000+ sqm</strong>
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
            <article className="product-card" key={product.id}>
              <button className="image-button" onClick={() => setSelected(product)} type="button">
                <img src={asset(product.image)} alt={`${product.title[language]} preview`} />
                <span>{product.badge[language]}</span>
              </button>
              <div className="product-body">
                <small>{product.cn}</small>
                <h3>{product.title[language]}</h3>
                <p>{product.summary[language]}</p>
                <ul>
                  {product.specs[language].map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
                <div className="product-foot">
                  <strong>{displayPrice(product)}</strong>
                  <button onClick={() => addToQuote(product)} type="button">
                    {t.add}
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
          <img src={asset("/zp/factory.jpeg")} alt="ZhouPeng production and equipment image" />
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
            <span>{selected.cn}</span>
            <h2>{selected.title[language]}</h2>
            <p>{selected.summary[language]}</p>
            <strong>{displayPrice(selected)}</strong>
          </div>
        </div>
        <form className="quote-panel" onSubmit={submitQuote}>
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
                    aria-label={`Remove ${item.title[language]}`}
                  >
                    {language === "zh" ? "移除" : language === "ar" ? "حذف" : "Remove"}
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
            <label>
              {t.name}
              <input name="name" required placeholder={t.name} />
            </label>
            <label>
              {t.email}
              <input name="email" required type="email" placeholder="name@company.com" />
            </label>
            <label>
              {t.country}
              <input name="country" defaultValue={regionData.formCountry[language]} required />
            </label>
            <label>
              {t.phone}
              <input name="phone" required placeholder="+86 / +1 / +971 / +966" />
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

      <footer className="footer">
        <span>Fujian ZhouPeng Industrial Co., Ltd.</span>
        <span>{t.footer}</span>
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
            <form onSubmit={submitLogin}>
              <label>
                {t.email}
                <input name="email" required type="email" placeholder="buyer@example.com" />
              </label>
              <label>
                {t.password}
                <input name="password" required type="password" placeholder="******" />
              </label>
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
