"use client";

import { Breadcrumb, CatalogShell } from "../catalog-chrome";
import { common, pick } from "../catalog-data";

export default function TermsPage() {
  return <CatalogShell>{({ language }) => <>
    <div className="legal-top"><Breadcrumb language={language} current={pick(common.terms, language)} /></div>
    <article className="legal-page">
      <p className="eyebrow">{language === "zh" ? "网站说明" : language === "en" ? "WEBSITE NOTICE" : "إشعار الموقع"}</p>
      <h1>{pick(common.terms, language)}</h1>
      <p>{language === "zh" ? "本网站资料用于介绍企业、产品方向与项目服务，不构成报价、合同承诺或适用性保证。" : language === "en" ? "Website materials introduce the company, product directions and project services. They do not constitute a quotation, contractual commitment or guarantee of suitability." : "تعرّف مواد الموقع بالشركة واتجاهات المنتجات وخدمات المشروعات، ولا تمثل عرض سعر أو التزاماً تعاقدياً أو ضماناً للملاءمة."}</p>
      <h2>{language === "zh" ? "产品与项目资料" : language === "en" ? "Product and project information" : "معلومات المنتجات والمشروعات"}</h2>
      <p>{language === "zh" ? "图片可能呈现场景组合或定制示例。材料、颜色、尺寸、结构、性能、价格和供货范围以双方确认的项目文件为准。" : language === "en" ? "Images may show spatial combinations or customised examples. Materials, colours, dimensions, construction, performance, price and supply scope are subject to mutually approved project documents." : "قد تعرض الصور تنسيقات مكانية أو أمثلة مخصصة. تخضع المواد والألوان والأبعاد والبنية والأداء والسعر ونطاق التوريد لوثائق المشروع المعتمدة من الطرفين."}</p>
      <h2>{language === "zh" ? "证书与第三方标识" : language === "en" ? "Certificates and third-party marks" : "الشهادات وعلامات الأطراف الأخرى"}</h2>
      <p>{language === "zh" ? "证书名称、范围、状态及有效期以原件和签发机构记录为准。第三方品牌与标识归各自权利人所有，不代表其对洲鹏的背书。" : language === "en" ? "Certificate names, scopes, status and validity are subject to originals and issuer records. Third-party brands and marks belong to their respective owners and do not imply endorsement of Zhoupeng." : "تخضع أسماء الشهادات ونطاقاتها وحالتها وصلاحيتها للوثائق الأصلية وسجلات الجهات المصدرة. تعود علامات الأطراف الأخرى إلى أصحابها ولا تعني تأييدهم لتشو بنغ."}</p>
    </article>
  </>}</CatalogShell>;
}
