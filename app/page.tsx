"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useState } from "react";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL, mailtoUrl } from "./contact";

type Lang = "zh" | "en" | "ar";
type Triple = [string, string, string];
const pick = (value: Triple, lang: Lang) => value[lang === "zh" ? 0 : lang === "en" ? 1 : 2];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const ui = {
  nav: [
    ["产品", "Products", "المنتجات"],
    ["整屋方案", "Whole-home", "حل المنزل"],
    ["项目案例", "Projects", "المشاريع"],
    ["制造实力", "Factory", "المصنع"],
    ["关于洲鹏", "About", "عن الشركة"],
  ] as Triple[],
  navIds: ["products", "solutions", "projects", "factory", "about"],
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
  contactTitle: ["告诉我们，你正在计划什么。", "Tell us what you are planning.", "أخبرنا بما تخطط له."] as Triple,
  contactText: [
    "填写基础项目资料，提交后将打开邮件，由你确认并发送给洲鹏团队。",
    "Complete the project brief. Your email app will open so you can review and send the information to Zhoupeng.",
    "أكمل معلومات المشروع وسيفتح بريدك لمراجعة الرسالة وإرسالها.",
  ] as Triple,
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
    const body = Object.entries(data).map(([key, value]) => `${key}: ${value}`).join("\n");
    window.location.href = mailtoUrl(`Zhoupeng project enquiry | ${data.company || data.name}`, body);
  };

  return (
    <main className="site" dir={dir}>
      <header className="header">
        <a className="brand" href="#home">
          <img src={asset("/zp/logo.png")} alt="" />
          <span><strong>{language === "zh" ? "福建洲鹏实业" : "ZHOUPENG"}</strong><small>CUSTOM HOME</small></span>
        </a>
        <nav className="desktop-nav">
          {ui.nav.map((item, i) => <a href={`#${ui.navIds[i]}`} key={i}>{pick(item, language)}</a>)}
        </nav>
        <div className="header-actions">
          <select value={language} onChange={(e) => changeLanguage(e.target.value as Lang)} aria-label="Language">
            <option value="zh">中文</option><option value="en">English</option><option value="ar">العربية</option>
          </select>
          <a className="contact-link" href="#contact">{pick(ui.contact, language)}</a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} type="button">{menuOpen ? "×" : "☰"}</button>
        </div>
        {menuOpen && <nav className="mobile-nav">{ui.nav.map((item, i) => <a onClick={() => setMenuOpen(false)} href={`#${ui.navIds[i]}`} key={i}>{pick(item, language)}</a>)}</nav>}
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
            <div /><span><small>{pick(system.sub, language)}</small><h3>{pick(system.name, language)}</h3><a href="#contact">{pick(ui.explore, language)} ↗</a></span>
          </article>)}
        </div>
      </section>

      <section className="about" id="about">
        <img src={asset("/zp/banners/about-01.jpg")} alt="Zhoupeng custom interior" />
        <div className="about-copy"><p className="eyebrow">{pick(ui.aboutKicker, language)}</p><h2>{pick(ui.aboutTitle, language)}</h2><p>{pick(ui.aboutText, language)}</p><a href="#factory">{pick(ui.factoryKicker, language)} →</a></div>
        <div className="stats"><div><strong>2012</strong><span>FOUNDED</span></div><div><strong>70 亩</strong><span>PRODUCTION BASE</span></div><div><strong>20,000+ ㎡</strong><span>STANDARD FACTORY</span></div><div><strong>30</strong><span>TECH & SERVICE</span></div></div>
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
        <span><p className="eyebrow light-text">PROJECT PARTNERSHIP</p><h2>{pick(ui.partnerTitle, language)}</h2><p>{pick(ui.partnerText, language)}</p><aside><a className="button light" href="#contact">{pick(ui.start, language)}</a><a className="button outline" href={mailtoUrl("Request Zhoupeng Catalogue", "")}>{pick(ui.catalog, language)}</a></aside></span>
      </section>

      <section className="contact" id="contact">
        <div className="contact-intro"><p className="eyebrow">{pick(ui.contactKicker, language)}</p><h2>{pick(ui.contactTitle, language)}</h2><p>{pick(ui.contactText, language)}</p><aside><a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE}</a><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><span>{language === "zh" ? "福建省上杭县李家坪工业区" : "Lijiaping Industrial Zone, Shanghang, Fujian, China"}</span></aside></div>
        <form onSubmit={submit}>
          <label><span>Name *</span><input name="name" required /></label><label><span>Company</span><input name="company" /></label>
          <label><span>Email *</span><input name="email" type="email" required /></label><label><span>Phone / WhatsApp</span><input name="phone" /></label>
          <label><span>Country / Region *</span><input name="country" required /></label><label><span>Product interest</span><select name="interest"><option value="">—</option>{systems.map((s) => <option key={pick(s.name, language)}>{pick(s.name, language)}</option>)}</select></label>
          <label className="wide"><span>Project details *</span><textarea name="details" rows={5} required /></label>
          <button className="button dark" type="submit">{pick(ui.start, language)} →</button>
        </form>
      </section>

      <footer><div className="footer-main"><div className="footer-brand"><a className="brand" href="#home"><img src={asset("/zp/logo.png")} alt="" /><span><strong>ZHOUPENG</strong><small>CUSTOM HOME</small></span></a><p>{pick(ui.aboutText, language)}</p></div><div><h3>QUICK LINKS</h3>{ui.nav.map((item, i) => <a href={`#${ui.navIds[i]}`} key={i}>{pick(item, language)}</a>)}</div><div><h3>CONTACT</h3><a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE}</a><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div></div><div className="footer-bottom">© {new Date().getFullYear()} Fujian Zhoupeng Industrial Co., Ltd.</div></footer>
      <a className="floating" href="#contact">+ <span>{pick(ui.contact, language)}</span></a>
    </main>
  );
}

function Heading({ kicker, title, text, split = false }: { kicker: string; title: string; text: string; split?: boolean }) {
  return <div className={`heading${split ? " split" : ""}`}><div><p className="eyebrow">{kicker}</p><h2>{title}</h2></div><p>{text}</p></div>;
}
