/* eslint-disable @next/next/no-img-element */

import { CONTACT_EMAIL, CONTACT_MOBILE, CONTACT_MOBILE_TEL, CONTACT_PHONE, CONTACT_PHONE_TEL, mailtoUrl } from "./contact";
import { asset, Lang, pick, productSystems, route, Triple } from "./catalog-data";

const t = (zh: string, en: string, ar: string): Triple => [zh, en, ar];

export function SiteFooter({ language }: { language: Lang }) {
  const cooperation: Array<{ label: Triple; href: string }> = [
    { label: t("提交项目需求", "Submit a project brief", "إرسال ملخص المشروع"), href: `${route("/")}#contact` },
    { label: t("索取企业画册", "Request catalogue", "طلب الكتالوج"), href: mailtoUrl(language === "zh" ? "索取洲鹏企业画册" : language === "en" ? "Request Zhoupeng catalogue" : "طلب كتالوج تشو بنغ", "") },
    { label: t("整屋解决方案", "Whole-home solutions", "حلول المنزل الكامل"), href: route("/products/whole-home/") },
    { label: t("项目案例", "Selected projects", "مشاريع مختارة"), href: `${route("/")}#projects` },
    { label: t("制造与交付", "Manufacturing & delivery", "التصنيع والتسليم"), href: `${route("/")}#factory` },
    { label: t("资质证书", "Credentials", "الشهادات"), href: route("/certificates/") },
  ];
  const company: Array<{ label: Triple; href: string }> = [
    { label: t("关于洲鹏", "About Zhoupeng", "عن تشو بنغ"), href: `${route("/")}#about` },
    { label: t("参观工厂", "Factory tour", "جولة في المصنع"), href: `${route("/")}#factory` },
    { label: t("产品中心", "Product centre", "مركز المنتجات"), href: route("/products/") },
    { label: t("联系我们", "Contact us", "اتصل بنا"), href: `${route("/")}#contact` },
    { label: t("隐私说明", "Privacy notice", "إشعار الخصوصية"), href: route("/privacy/") },
    { label: t("使用条款", "Terms of use", "شروط الاستخدام"), href: route("/terms/") },
  ];

  return <footer>
    <div className="footer-cta">
      <p>{pick(t("洲鹏定制家居", "ZHOUPENG CUSTOM HOME", "تشو بنغ للمنزل المخصص"), language)}</p>
      <h2>{pick(t("从一份项目资料，开始协同。", "Start with your project brief.", "ابدأ بملخص مشروعك."), language)}</h2>
      <span>{pick(t("提交空间信息或索取企业画册，与洲鹏团队讨论下一步。", "Share your space requirements or request the catalogue to discuss the next step.", "شارك متطلبات المساحة أو اطلب الكتالوج لمناقشة الخطوة التالية."), language)}</span>
      <aside><a className="button light" href={`${route("/")}#contact`}>{pick(t("提交项目需求", "Start your project", "ابدأ مشروعك"), language)}</a><a className="button outline" href={mailtoUrl(language === "zh" ? "索取洲鹏企业画册" : language === "en" ? "Request Zhoupeng catalogue" : "طلب كتالوج تشو بنغ", "")}>{pick(t("索取企业画册", "Request catalogue", "طلب الكتالوج"), language)}</a></aside>
    </div>
    <div className="footer-main">
      <div className="footer-group">
        <h3>{pick(t("产品", "Products", "المنتجات"), language)}</h3>
        {productSystems.map((item) => <a href={route(`/products/${item.slug}/`)} key={item.slug}><i aria-hidden="true">›</i>{pick(item.name, language)}</a>)}
      </div>
      <div className="footer-group">
        <h3>{pick(t("立即开启合作", "Start a partnership", "ابدأ التعاون"), language)}</h3>
        {cooperation.map((item) => <a href={item.href} key={item.href + pick(item.label, language)}><i aria-hidden="true">›</i>{pick(item.label, language)}</a>)}
      </div>
      <div className="footer-group">
        <h3>{pick(t("关于我们", "About us", "معلومات عنا"), language)}</h3>
        {company.map((item) => <a href={item.href} key={item.href}><i aria-hidden="true">›</i>{pick(item.label, language)}</a>)}
      </div>
      <div className="footer-contact footer-contact-brand">
        <a className="footer-logo" href={route("/")}><img src={asset("/zp/logo.png")} alt="" /><span><strong>ZHOUPENG</strong><small>CUSTOM HOME</small></span></a>
        <p>{pick(t("门、墙、柜、橱、五金与配套系统的一体化定制家居制造与项目服务。", "Integrated custom-home manufacturing and project support across doors, walls, cabinets, kitchens, hardware and furnishings.", "تصنيع ودعم مشاريع المنازل المخصصة المتكاملة للأبواب والجدران والخزائن والمطابخ والملحقات."), language)}</p>
        <span className="footer-contact-row"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-12A7 7 0 1 0 5 9c0 5.9 7 12 7 12Zm0-9.3A2.7 2.7 0 1 1 12 6a2.7 2.7 0 0 1 0 5.4Z"/></svg>{pick(t("中国福建省上杭县李家坪工业区", "Lijiaping Industrial Zone, Shanghang, Fujian, China", "منطقة ليجيا بينغ الصناعية، شانغهانغ، فوجيان، الصين"), language)}</span>
        <a className="footer-contact-row" href={`mailto:${CONTACT_EMAIL}`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3V5Zm2 2v.3l7 5.2 7-5.2V7H5Zm14 10V9.8l-7 5-7-5V17h14Z"/></svg>{CONTACT_EMAIL}</a>
        <a className="footer-contact-row" href={`tel:${CONTACT_PHONE_TEL}`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.7c-1.2 0-2.4-.2-3.5-.6a1 1 0 0 0-1 .2l-2.2 1.7a15.4 15.4 0 0 1-6.9-6.9l1.7-2.2a1 1 0 0 0 .2-1A11.4 11.4 0 0 1 8.2 3 1 1 0 0 0 7.2 2H3.5A1.5 1.5 0 0 0 2 3.5C2 13.7 10.3 22 20.5 22a1.5 1.5 0 0 0 1.5-1.5v-3.8a1 1 0 0 0-1.5-1Z"/></svg>{CONTACT_PHONE}</a>
        <a className="footer-contact-row" href={`tel:${CONTACT_MOBILE_TEL}`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 3v13h10V5H7Zm5 15.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>{CONTACT_MOBILE}</a>
      </div>
    </div>
    <div className="footer-bottom">{language === "zh" ? "©ZHOUPENG 保留所有权利" : language === "en" ? "©ZHOUPENG. All rights reserved." : "©ZHOUPENG. جميع الحقوق محفوظة."}<span><a href={route("/privacy/")}>{pick(t("隐私说明", "Privacy Notice", "إشعار الخصوصية"), language)}</a><a href={route("/terms/")}>{pick(t("使用条款", "Terms of Use", "شروط الاستخدام"), language)}</a></span></div>
    <div className="powered-strip"><span aria-hidden="true">L</span><strong>Powered by Lapus</strong></div>
  </footer>;
}
