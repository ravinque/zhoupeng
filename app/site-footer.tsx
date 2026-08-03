import { CONTACT_EMAIL, CONTACT_MOBILE, CONTACT_MOBILE_TEL, CONTACT_PHONE, CONTACT_PHONE_TEL } from "./contact";
import { Lang, pick, productSystems, route, Triple } from "./catalog-data";

const t = (zh: string, en: string, ar: string): Triple => [zh, en, ar];

export function SiteFooter({ language }: { language: Lang }) {
  const separator = language === "zh" ? "：" : ": ";
  const quickLinks: Array<{ label: Triple; href: string }> = [
    { label: t("首页", "Home", "الرئيسية"), href: route("/") },
    { label: t("关于我们", "About us", "من نحن"), href: `${route("/")}#about` },
    { label: t("产品中心", "Product centre", "مركز المنتجات"), href: route("/products/") },
    { label: t("企业优势", "Manufacturing", "قدرات التصنيع"), href: `${route("/")}#factory` },
    { label: t("联系我们", "Contact us", "اتصل بنا"), href: `${route("/")}#contact` },
  ];

  return <footer className="footer-enterprise">
    <div className="footer-enterprise-grid">
      <nav className="footer-column" aria-label={pick(t("快速导航", "Quick navigation", "التنقل السريع"), language)}>
        <h3>{pick(t("快速导航", "Quick navigation", "التنقل السريع"), language)}</h3>
        {quickLinks.map((item) => <a href={item.href} key={item.href}>{pick(item.label, language)}</a>)}
      </nav>

      <nav className="footer-column" aria-label={pick(t("产品中心", "Product centre", "مركز المنتجات"), language)}>
        <h3>{pick(t("产品中心", "Product centre", "مركز المنتجات"), language)}</h3>
        {productSystems.map((item) => <a href={route(`/products/${item.slug}/`)} key={item.slug}>{pick(item.name, language)}</a>)}
      </nav>

      <div className="footer-column footer-enterprise-contact">
        <h3>{pick(t("联系我们", "Contact us", "اتصل بنا"), language)}</h3>
        <p><span>{pick(t("电话", "Tel", "الهاتف"), language)}{separator}</span><a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE}</a></p>
        <p><span>{pick(t("手机 / WhatsApp", "Mobile / WhatsApp", "الجوال / واتساب"), language)}{separator}</span><a href={`tel:${CONTACT_MOBILE_TEL}`}>{CONTACT_MOBILE}</a></p>
        <p><span>{pick(t("邮箱", "Email", "البريد"), language)}{separator}</span><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        <p><span>{pick(t("地址", "Address", "العنوان"), language)}{separator}</span>{pick(t("福建省上杭县李家坪工业区", "Lijiaping Industrial Zone, Shanghang, Fujian, China", "منطقة ليجيا بينغ الصناعية، شانغهانغ، فوجيان، الصين"), language)}</p>
        <p><span>{pick(t("网址", "Website", "الموقع"), language)}{separator}</span><a href="https://www.zhoupengindustry.com/">www.zhoupengindustry.com</a></p>
      </div>
    </div>

    <div className="footer-legal">
      <span>{language === "zh" ? "版权所有 © 福建洲鹏实业有限公司" : language === "en" ? "© Fujian Zhoupeng Industrial Co., Ltd. All rights reserved." : "© شركة فوجيان تشو بنغ الصناعية المحدودة. جميع الحقوق محفوظة."}</span>
      <span><a href={route("/privacy/")}>{pick(t("隐私说明", "Privacy Notice", "إشعار الخصوصية"), language)}</a><a href={route("/terms/")}>{pick(t("使用条款", "Terms of Use", "شروط الاستخدام"), language)}</a></span>
    </div>

    <div className="powered-strip"><span aria-hidden="true">L</span><strong>Powered by 乐普软件</strong></div>
  </footer>;
}
