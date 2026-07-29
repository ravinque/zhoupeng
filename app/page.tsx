"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useState } from "react";
import { certificateDocuments, certificatePick } from "./certificate-data";
import { CONTACT_EMAIL, CONTACT_MOBILE, CONTACT_MOBILE_TEL, CONTACT_PHONE, CONTACT_PHONE_TEL, mailtoUrl } from "./contact";
import { SiteFooter } from "./site-footer";

type Lang = "zh" | "en" | "ar";
type Triple = [string, string, string];
const pick = (value: Triple, lang: Lang) => value[lang === "zh" ? 0 : lang === "en" ? 1 : 2];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;
const route = (path: string) => `${basePath}${path}`;

const ui = {
  nav: [
    ["首页", "Home", "الرئيسية"],
    ["产品", "Products", "المنتجات"],
    ["整屋方案", "Whole-home", "حل المنزل"],
    ["项目案例", "Projects", "المشاريع"],
    ["制造实力", "Factory", "المصنع"],
    ["关于洲鹏", "About", "عن الشركة"],
  ] as Triple[],
  navIds: ["home", "products", "solutions", "projects", "factory", "about"],
  contact: ["联系我们", "Contact", "تواصل معنا"] as Triple,
  heroKicker: ["福建洲鹏实业 · 始于 2012", "FUJIAN ZHOUPENG INDUSTRIAL · SINCE 2012", "فوجيان تشو بنغ · منذ 2012"] as Triple,
  heroTitle: ["现代 · 一体 · 定制家居", "Modern · Integrated · Custom Home", "حديث · متكامل · منزل مخصص"] as Triple,
  heroText: [
    "以门、墙、柜、橱、五金与配套六大系统，完成从设计深化到生产交付的整屋协同。",
    "Six coordinated systems—from doors and walls to cabinets, kitchens, hardware and furnishings—connecting design detailing with production.",
    "ستة أنظمة متناسقة للأبواب والجدران والخزائن والمطابخ والملحقات، من التصميم إلى الإنتاج.",
  ] as Triple,
  start: ["提交项目需求", "Start Your Project", "ابدأ مشروعك"] as Triple,
  explore: ["浏览产品系统", "Explore Products", "استكشف المنتجات"] as Triple,
  productsKicker: ["产品体系", "OUR PRODUCTS", "منتجاتنا"] as Triple,
  productsTitle: ["六大产品系统", "Six Product Systems", "ستة أنظمة للمنتجات"] as Triple,
  productsIntro: [
    "从单品到完整空间，以统一的材质、尺度与工艺语言，让每个系统彼此衔接。",
    "From individual pieces to complete spaces, one material, scale and craft language keeps every system connected.",
    "من القطعة الواحدة إلى المساحة الكاملة، لغة موحدة للمواد والمقاييس والحرفة.",
  ] as Triple,
  aboutKicker: ["关于洲鹏", "ABOUT ZHOUPENG", "عن تشو بنغ"] as Triple,
  aboutTitle: ["让制造能力，成为空间美学的可靠基础。", "Manufacturing strength, built into refined spaces.", "قوة التصنيع داخل مساحات راقية."] as Triple,
  aboutText: [
    "福建洲鹏实业有限公司成立于 2012 年，是一家集研发、设计、生产与运营服务于一体的综合性定制家居企业。智能化生产基地位于福建上杭，以真实生产、工艺细节与技术协作支持项目落地。",
    "Founded in 2012, Fujian Zhoupeng Industrial integrates R&D, design, production and operational service for custom home projects. Its production base in Shanghang, Fujian supports delivery through real manufacturing and technical coordination.",
    "تأسست فوجيان تشو بنغ عام 2012 وتجمع البحث والتصميم والإنتاج وخدمة مشاريع المنازل المخصصة في منظومة واحدة.",
  ] as Triple,
  solutionKicker: ["整屋协同", "WHOLE-HOME SOLUTION", "حل المنزل الكامل"] as Triple,
  solutionTitle: ["一个项目，一套协同体系。", "One project. One coordinated system.", "مشروع واحد. منظومة واحدة."] as Triple,
  solutionText: [
    "从空间需求、产品选型到深化设计、生产与交付，洲鹏以六大系统减少跨供应商协调，让项目表达与落地保持一致。",
    "From spatial requirements and product selection to detailing, production and delivery, six systems reduce cross-supplier coordination.",
    "من متطلبات المساحة واختيار المنتجات إلى التفاصيل والإنتاج والتسليم، تقلل الأنظمة الستة تنسيق الموردين.",
  ] as Triple,
  projectsKicker: ["空间精选", "SELECTED SPACES", "مساحات مختارة"] as Triple,
  projectsTitle: ["来自洲鹏画册的空间灵感", "Spaces from the Zhoupeng Catalogue", "مساحات من كتالوج تشو بنغ"] as Triple,
  projectsText: [
    "全部素材取自洲鹏企业画册，呈现厨房、收纳、卧室与整体空间的产品组合。",
    "All imagery is sourced from Zhoupeng's company catalogue, showing kitchens, storage, bedrooms and whole-home combinations.",
    "جميع الصور من كتالوج الشركة وتعرض المطابخ والتخزين وغرف النوم.",
  ] as Triple,
  factoryKicker: ["走进工厂", "INSIDE THE FACTORY", "داخل المصنع"] as Triple,
  factoryTitle: ["真实产线，真实工艺。", "Real production. Visible craft.", "إنتاج حقيقي. حرفة واضحة."] as Triple,
  factoryText: [
    "以生产现场、设备与关键工序作为能力证明。官网公开信息显示，企业使用极东、南兴、灿高、磨克、百田等设备品牌，并设有技术研发与售后团队。",
    "Factory footage, equipment and key processes provide the evidence. Public company information lists KDT, Nanxing, Cangao, Moke and Baitian equipment, supported by technical and service teams.",
    "تعرض مشاهد المصنع والمعدات والعمليات الرئيسية كدليل على القدرة، بدعم فرق التقنية والخدمة.",
  ] as Triple,
  partnerTitle: ["为工程、渠道与设计合作伙伴提供定制支持", "Custom support for projects, dealers and design partners", "دعم مخصص للمشاريع والوكلاء وشركاء التصميم"] as Triple,
  partnerText: [
    "分享项目城市、空间类型、图纸或现场照片，我们将据此整理下一步资料清单。",
    "Share the project city, space type, drawings or site photos. We will organize the information needed for the next step.",
    "شارك مدينة المشروع ونوع المساحة والمخططات أو صور الموقع لنحدد المعلومات المطلوبة.",
  ] as Triple,
  catalog: ["索取企业画册", "Request Catalogue", "اطلب الكتالوج"] as Triple,
  contactKicker: ["项目咨询", "GET IN TOUCH", "تواصل معنا"] as Triple,
  contactTitle: ["告诉我们，你的项目计划。", "Tell us about your project.", "أخبرنا عن مشروعك."] as Triple,
  contactText: [
    "填写基础项目资料，提交后将打开邮件，由你确认并发送给洲鹏团队。",
    "Complete the project brief. Your email app will open so you can review and send the information to Zhoupeng.",
    "أكمل معلومات المشروع وسيفتح بريدك لمراجعة الرسالة وإرسالها.",
  ] as Triple,
  partnerKicker: ["项目合作", "PROJECT PARTNERSHIP", "شراكة المشاريع"] as Triple,
  formKicker: ["项目需求", "PROJECT BRIEF", "ملخص المشروع"] as Triple,
  formTitle: ["获取专属项目方案", "Get a tailored project proposal", "احصل على مقترح مخصص لمشروعك"] as Triple,
  formNote: ["请尽可能提供完整信息，我们通常会在 1–2 个工作日内回复。", "Share as much detail as possible. We normally reply within 1–2 business days.", "شارك أكبر قدر ممكن من التفاصيل. نرد عادة خلال يوم أو يومي عمل."] as Triple,
  nameLabel: ["姓名", "Name", "الاسم"] as Triple,
  companyLabel: ["公司 / 机构", "Company / Organization", "الشركة / المؤسسة"] as Triple,
  emailLabel: ["工作邮箱", "Business email", "البريد الإلكتروني للعمل"] as Triple,
  phoneLabel: ["电话 / WhatsApp", "Phone / WhatsApp", "الهاتف / واتساب"] as Triple,
  countryLabel: ["国家 / 地区", "Country / Region", "الدولة / المنطقة"] as Triple,
  interestLabel: ["意向产品", "Product interest", "المنتج المطلوب"] as Triple,
  interestPlaceholder: ["请选择产品系统", "Select a product system", "اختر نظام المنتج"] as Triple,
  detailsLabel: ["项目详情", "Project details", "تفاصيل المشروع"] as Triple,
  detailsPlaceholder: ["项目城市、空间类型、面积、计划时间及其他需求", "Project city, space type, area, target date and other requirements", "مدينة المشروع ونوع المساحة والمساحة والموعد المستهدف والمتطلبات الأخرى"] as Triple,
  address: ["福建省上杭县李家坪工业区", "Lijiaping Industrial Zone, Shanghang, Fujian, China", "منطقة ليجيا بينغ الصناعية، شانغهانغ، فوجيان، الصين"] as Triple,
  responseLabel: ["海外项目咨询", "INTERNATIONAL PROJECT ENQUIRIES", "استفسارات المشاريع الدولية"] as Triple,
  responseValue: ["服务范围及交付可行性将在项目评估后确认", "Service scope and delivery availability are confirmed after project review", "يتم تأكيد نطاق الخدمة وإمكانية التسليم بعد مراجعة المشروع"] as Triple,
  footerCtaKicker: ["洲鹏定制家居", "ZHOUPENG CUSTOM HOME", "تشو بنغ للمنزل المخصص"] as Triple,
  footerCtaTitle: ["从一份项目资料，开始协同。", "Start with your project brief.", "ابدأ بملخص مشروعك."] as Triple,
  footerCtaText: ["提交空间信息或索取企业画册，与洲鹏团队讨论下一步。", "Share your space requirements or request the catalogue to discuss the next step with our team.", "شارك متطلبات المساحة أو اطلب الكتالوج لمناقشة الخطوة التالية مع فريقنا."] as Triple,
  footerProducts: ["产品系统", "Products", "المنتجات"] as Triple,
  footerLinks: ["快速导航", "Get Started", "ابدأ هنا"] as Triple,
  footerContact: ["联系我们", "Contact", "اتصل بنا"] as Triple,
  copyright: ["福建洲鹏实业有限公司。保留所有权利。", "Fujian Zhoupeng Industrial Co., Ltd. All rights reserved.", "شركة فوجيان تشو بنغ الصناعية المحدودة. جميع الحقوق محفوظة."] as Triple,
  emailSubject: ["洲鹏项目咨询", "Zhoupeng project enquiry", "استفسار مشروع تشو بنغ"] as Triple,
  languageLabel: ["语言", "Language", "اللغة"] as Triple,
};

const systems = [
  { name: ["门系统", "Door System", "نظام الأبواب"] as Triple, sub: ["入户门、室内门与门型系列", "Entry, interior doors & door styles", "أبواب المداخل والغرف"] as Triple, image: "/zp/home-01.jpg" },
  { name: ["墙系统", "Wall System", "نظام الجدران"] as Triple, sub: ["墙板、展示与收纳组合", "Wall panels, display & storage", "ألواح وعرض وتخزين"] as Triple, image: "/zp/home-02.jpg" },
  { name: ["柜系统", "Cabinet System", "نظام الخزائن"] as Triple, sub: ["衣柜、储物柜与衣帽间", "Wardrobes, storage & closets", "خزائن ملابس وتخزين"] as Triple, image: "/zp/cabinet.jpg" },
  { name: ["橱系统", "Kitchen System", "نظام المطابخ"] as Triple, sub: ["厨房、中岛与餐厨空间", "Kitchen, island & dining", "مطبخ وجزيرة وطعام"] as Triple, image: "/zp/kitchen.jpg" },
  { name: ["五金系统", "Hardware System", "نظام الملحقات"] as Triple, sub: ["铰链、滑轨与功能配件", "Hinges, slides & fittings", "مفصلات وسكك وملحقات"] as Triple, image: "/zp/kitchen-detail-01.jpg" },
  { name: ["配套系统", "Supporting System", "النظام المساند"] as Triple, sub: ["家具与整屋空间配套", "Furniture & whole-home coordination", "أثاث وتنسيق المنزل"] as Triple, image: "/zp/kitchen-detail-02.jpg" },
];

const heroImages = ["/zp/banners/hero-02.jpg", "/zp/banners/hero-03.jpg", "/zp/hero.jpg"];
const projectImages = ["/zp/banners/hero-02.jpg", "/zp/banners/hero-03.jpg", "/zp/hero.jpg", "/zp/banners/about-02.jpg", "/zp/kitchen-detail-02.jpg", "/zp/cabinet.jpg"];
const projectNames = [
  ["现代餐厨空间", "Modern kitchen & dining", "مطبخ وطعام حديث"],
  ["一体化厨房", "Integrated kitchen", "مطبخ متكامل"],
  ["开放式客厅", "Open living space", "مساحة معيشة مفتوحة"],
  ["步入式衣帽间", "Walk-in wardrobe", "غرفة ملابس"],
  ["卧室收纳", "Bedroom storage", "تخزين غرفة النوم"],
  ["整屋定制细节", "Custom interior detail", "تفاصيل داخلية مخصصة"],
] as Triple[];
const steps = [
  [["需求沟通", "Project Brief", "متطلبات المشروع"], ["了解空间、类型与目标时间。", "Space, project type and target timing.", "المساحة والنوع والموعد."]],
  [["方案深化", "Design Detailing", "تفاصيل التصميم"], ["梳理图纸、尺寸、材质与系统关系。", "Plans, dimensions, materials and system relationships.", "المخططات والأبعاد والمواد."]],
  [["生产协同", "Production", "الإنتاج"], ["按确认资料组织生产与关键检查。", "Manufacturing around approved information.", "التصنيع وفق المعلومات المعتمدة."]],
  [["交付准备", "Delivery Prep", "تجهيز التسليم"], ["整理包装、清单与安装资料。", "Packing, lists and installation documents.", "التعبئة والقوائم ووثائق التركيب."]],
] as [Triple, Triple][];
const factoryNames = [
  ["生产线实景", "Production Line", "خط الإنتاج"],
  ["封边与组装", "Edging & Assembly", "الحواف والتجميع"],
  ["检查与包装", "Inspection & Packing", "الفحص والتعبئة"],
] as Triple[];

export default function Home() {
  const [language, setLanguage] = useState<Lang>("zh");
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("zp-language") as Lang | null;
      if (saved && ["zh", "en", "ar"].includes(saved)) setLanguage(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
    document.documentElement.dir = dir;
    const timer = window.setInterval(() => setSlide((value) => (value + 1) % 3), 6500);
    return () => window.clearInterval(timer);
  }, [language, dir]);

  const changeLanguage = (lang: Lang) => {
    setLanguage(lang);
    window.localStorage.setItem("zp-language", lang);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const fieldLabels: Record<string, Triple> = {
      name: ui.nameLabel,
      company: ui.companyLabel,
      email: ui.emailLabel,
      phone: ui.phoneLabel,
      country: ui.countryLabel,
      interest: ui.interestLabel,
      details: ui.detailsLabel,
    };
    const body = Object.entries(data).map(([key, value]) => `${pick(fieldLabels[key], language)}: ${value}`).join("\n");
    window.location.href = mailtoUrl(`${pick(ui.emailSubject, language)} | ${data.company || data.name}`, body);
  };

  return (
    <main className="site" dir={dir}>
      <header className="header">
        <a className="brand" href="#home">
          <img src={asset("/zp/logo.png")} alt="" />
          <span><strong>{language === "zh" ? "福建洲鹏实业" : language === "en" ? "ZHOUPENG" : "تشو بنغ"}</strong><small>{language === "zh" ? "定制家居" : language === "en" ? "CUSTOM HOME" : "حلول منزلية حسب الطلب"}</small></span>
        </a>
        <nav className="desktop-nav">
          {ui.nav.map((item, i) => <a className={i === 0 ? "active" : ""} href={i === 1 ? route("/products/") : `#${ui.navIds[i]}`} key={i}>{pick(item, language)}</a>)}
        </nav>
        <div className="header-actions">
          <select value={language} onChange={(e) => changeLanguage(e.target.value as Lang)} aria-label={pick(ui.languageLabel, language)}>
            <option value="zh">中文</option><option value="en">English</option><option value="ar">العربية</option>
          </select>
          <a className="contact-link" href="#contact">{pick(ui.contact, language)}</a>
          <button className="menu-button" aria-controls="home-mobile-nav" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)} type="button">{menuOpen ? "×" : "☰"}</button>
        </div>
        {menuOpen && <nav className="mobile-nav" id="home-mobile-nav">{ui.nav.map((item, i) => <a onClick={() => setMenuOpen(false)} href={i === 1 ? route("/products/") : `#${ui.navIds[i]}`} key={i}>{pick(item, language)}</a>)}</nav>}
      </header>

      <section className="hero" id="home">
        <div className="slides">{heroImages.map((image, i) => <img className={slide === i ? "active" : ""} src={asset(image)} alt="" loading={i === 0 ? "eager" : "lazy"} key={image} />)}</div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="hero-kicker">{pick(ui.heroKicker, language)}</p>
          <h1>{pick(ui.heroTitle, language)}</h1>
          <p>{pick(ui.heroText, language)}</p>
          <div><a className="button light" href="#contact">{pick(ui.start, language)}</a><a className="button outline" href="#products">{pick(ui.explore, language)}</a></div>
        </div>
        <div className="slide-dots">{heroImages.map((_, i) => <button className={slide === i ? "active" : ""} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} key={i} />)}</div>
      </section>

      <section className="section" id="products">
        <Heading kicker={pick(ui.productsKicker, language)} title={pick(ui.productsTitle, language)} text={pick(ui.productsIntro, language)} />
        <div className="product-grid">
          {systems.map((system, i) => <article className={`product product-${i}`} key={i}>
            <img src={asset(system.image)} alt={pick(system.name, language)} />
            <div /><span><small>{pick(system.sub, language)}</small><h3>{pick(system.name, language)}</h3><a href={route("/products/")}>{pick(ui.explore, language)} <b aria-hidden="true">→</b></a></span>
          </article>)}
        </div>
      </section>

      <section className="about" id="about">
        <img src={asset("/zp/banners/about-01.jpg")} alt="Zhoupeng custom interior" />
        <div className="about-copy"><p className="eyebrow">{pick(ui.aboutKicker, language)}</p><h2>{pick(ui.aboutTitle, language)}</h2><p>{pick(ui.aboutText, language)}</p><a href="#factory">{pick(ui.factoryKicker, language)} →</a></div>
        <div className="stats"><div><strong>2012</strong><span>{language === "zh" ? "成立年份" : language === "en" ? "FOUNDED" : "سنة التأسيس"}</span></div><div><strong>{language === "zh" ? "福建上杭" : language === "en" ? "Shanghang" : "شانغهانغ"}</strong><span>{language === "zh" ? "生产基地" : language === "en" ? "PRODUCTION BASE" : "قاعدة الإنتاج"}</span></div><div><strong>{language === "zh" ? "研发 · 设计" : language === "en" ? "R&D · DESIGN" : "البحث والتصميم"}</strong><span>{language === "zh" ? "项目深化" : language === "en" ? "PROJECT DETAILING" : "تطوير المشروع"}</span></div><div><strong>{language === "zh" ? "生产 · 服务" : language === "en" ? "PRODUCTION · SERVICE" : "الإنتاج والخدمة"}</strong><span>{language === "zh" ? "协同支持" : language === "en" ? "COORDINATED SUPPORT" : "دعم منسق"}</span></div></div>
      </section>

      <section className="solution" id="solutions">
        <div className="solution-shade" />
        <div className="solution-inner">
          <div><p className="eyebrow light-text">{pick(ui.solutionKicker, language)}</p><h2>{pick(ui.solutionTitle, language)}</h2><p>{pick(ui.solutionText, language)}</p><a className="button outline" href="#contact">{pick(ui.start, language)}</a></div>
          <div className="steps">{steps.map((step, i) => <article key={i}><span>0{i + 1}</span><div><h3>{pick(step[0], language)}</h3><p>{pick(step[1], language)}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section" id="projects">
        <Heading kicker={pick(ui.projectsKicker, language)} title={pick(ui.projectsTitle, language)} text={pick(ui.projectsText, language)} split />
        <div className="project-grid">{projectImages.map((image, i) => <figure key={i}><img src={asset(image)} alt={pick(projectNames[i], language)} /><figcaption><small>0{i + 1}</small><strong>{pick(projectNames[i], language)}</strong></figcaption></figure>)}</div>
      </section>

      <section className="factory" id="factory">
        <Heading kicker={pick(ui.factoryKicker, language)} title={pick(ui.factoryTitle, language)} text={pick(ui.factoryText, language)} />
        <div className="factory-grid">{[1, 2, 3].map((number, i) => <article key={number}><video controls playsInline preload="metadata" poster={asset(`/zp/posters/factory-0${number}.jpg`)}><source src={asset(`/zp/videos/factory-0${number}.mp4`)} type="video/mp4" /></video><small>0{number}</small><h3>{pick(factoryNames[i], language)}</h3></article>)}</div>
      </section>

      <section className="partner">
        <img src={asset("/zp/banners/about-02.jpg")} alt="" /><div />
        <span><p className="eyebrow light-text">{pick(ui.partnerKicker, language)}</p><h2>{pick(ui.partnerTitle, language)}</h2><p>{pick(ui.partnerText, language)}</p><aside><a className="button light" href="#contact">{pick(ui.start, language)}</a><a className="button outline" href={mailtoUrl(pick(ui.catalog, language), "")}>{pick(ui.catalog, language)}</a></aside></span>
      </section>

      <section className="home-certificates">
        <div className="home-certificates-copy"><p className="eyebrow">{language === "zh" ? "企业资质" : language === "en" ? "VERIFIED DOCUMENTS" : "وثائق موثقة"}</p><h2>{language === "zh" ? "独立证书，清晰可核验" : language === "en" ? "Credentials, individually presented" : "شهادات مستقلة وواضحة"}</h2><p>{language === "zh" ? "从企业资料中筛选与项目评估直接相关的认证与专利，逐项呈现名称及有效期，避免以整页拼图代替真实文件。" : language === "en" ? "Project-relevant certifications and a representative patent are presented individually with their status and validity." : "تُعرض الشهادات المرتبطة بتقييم المشاريع وبراءة ممثلة بشكل مستقل مع بيان الصلاحية."}</p><a className="button dark" href={route("/certificates/")}>{language === "zh" ? "查看全部资质" : language === "en" ? "View all credentials" : "عرض جميع الشهادات"}</a></div>
        <div className="certificate-preview-grid">
          {certificateDocuments.slice(0, 4).map((document) => <a className="certificate-preview-card" href={route("/certificates/")} key={document.code}>
            <span><img src={asset(document.image)} alt={certificatePick(document.title, language)} /></span>
            <small>{document.code}</small>
            <strong>{certificatePick(document.title, language)}</strong>
          </a>)}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-intro">
          <img src={asset("/zp/banners/hero-03.jpg")} alt="" />
          <div className="contact-intro-shade" />
          <div className="contact-intro-copy"><p className="eyebrow light-text">{pick(ui.contactKicker, language)}</p><h2>{pick(ui.contactTitle, language)}</h2><p>{pick(ui.contactText, language)}</p></div>
          <aside><small>{pick(ui.responseLabel, language)}</small><strong>{pick(ui.responseValue, language)}</strong><a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE}</a><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><span>{pick(ui.address, language)}</span></aside>
        </div>
        <form onSubmit={submit}>
          <div className="form-head"><p className="eyebrow">{pick(ui.formKicker, language)}</p><h3>{pick(ui.formTitle, language)}</h3><p>{pick(ui.formNote, language)}</p></div>
          <label><span>{pick(ui.nameLabel, language)} *</span><input name="name" autoComplete="name" required /></label><label><span>{pick(ui.companyLabel, language)}</span><input name="company" autoComplete="organization" /></label>
          <label><span>{pick(ui.emailLabel, language)} *</span><input name="email" type="email" autoComplete="email" required /></label><label><span>{pick(ui.phoneLabel, language)}</span><input name="phone" autoComplete="tel" /></label>
          <label><span>{pick(ui.countryLabel, language)} *</span><input name="country" autoComplete="country-name" required /></label><label><span>{pick(ui.interestLabel, language)}</span><select name="interest"><option value="">{pick(ui.interestPlaceholder, language)}</option>{systems.map((s) => <option key={pick(s.name, language)}>{pick(s.name, language)}</option>)}</select></label>
          <label className="wide"><span>{pick(ui.detailsLabel, language)} *</span><textarea name="details" placeholder={pick(ui.detailsPlaceholder, language)} rows={3} required /></label>
          <button className="button dark" type="submit">{pick(ui.start, language)} →</button>
          <p className="privacy-note">{language === "zh" ? "发送邮件前，请阅读隐私说明。我们仅使用所提交的信息回复本次咨询。" : language === "en" ? "Please review our Privacy Notice before sending. We use the submitted information only to respond to this enquiry." : "يرجى مراجعة إشعار الخصوصية قبل الإرسال. نستخدم المعلومات المقدمة فقط للرد على هذا الاستفسار."}</p>
        </form>
      </section>

      <SiteFooter language={language} />
      <aside className="contact-dock" aria-label={pick(ui.contact, language)}>
        <a className="contact-dock-phone" href={`tel:${CONTACT_MOBILE_TEL}`} aria-label={language === "zh" ? `电话或微信 ${CONTACT_MOBILE}` : language === "en" ? `Call or WeChat ${CONTACT_MOBILE}` : `اتصال أو ويتشات ${CONTACT_MOBILE}`}>
          <span>{language === "zh" ? "电话 / 微信" : language === "en" ? "Call / WeChat" : "اتصال / ويتشات"}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.7c-1.2 0-2.4-.2-3.5-.6a1 1 0 0 0-1 .2l-2.2 1.7a15.4 15.4 0 0 1-6.9-6.9l1.7-2.2a1 1 0 0 0 .2-1A11.4 11.4 0 0 1 8.2 3 1 1 0 0 0 7.2 2H3.5A1.5 1.5 0 0 0 2 3.5C2 13.7 10.3 22 20.5 22a1.5 1.5 0 0 0 1.5-1.5v-3.8a1 1 0 0 0-1.5-1Z"/></svg>
        </a>
        <a className="contact-dock-mail" href={mailtoUrl(pick(ui.emailSubject, language), "")} aria-label={language === "zh" ? "邮件咨询" : language === "en" ? "Email enquiry" : "استفسار بالبريد"}>
          <span>{language === "zh" ? "邮件咨询" : language === "en" ? "Email enquiry" : "استفسار بالبريد"}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.5 3 2 6.9 2 11.8c0 2.8 1.5 5.3 3.9 6.9L5 22l4-2a11.6 11.6 0 0 0 3 .4c5.5 0 10-3.9 10-8.8S17.5 3 12 3Zm-4.2 9.7a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm4.2 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm4.2 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z"/></svg>
        </a>
      </aside>
    </main>
  );
}

function Heading({ kicker, title, text, split = false }: { kicker: string; title: string; text: string; split?: boolean }) {
  return <div className={`heading${split ? " split" : ""}`}><div><p className="eyebrow">{kicker}</p><h2>{title}</h2></div><p>{text}</p></div>;
}
