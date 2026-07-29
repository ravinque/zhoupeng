"use client";

/* eslint-disable @next/next/no-img-element */

import { Breadcrumb, CatalogShell } from "../catalog-chrome";
import { asset, common, pick } from "../catalog-data";

export default function CertificatesPage() {
  return <CatalogShell>{({ language }) => <>
    <section className="catalog-hero certificate-hero"><img src={asset("/zp/posters/factory-01.jpg")} alt="" /><div /><span><p>{language === "zh" ? "企业资料" : language === "en" ? "COMPANY DOCUMENTS" : "وثائق الشركة"}</p><h1>{pick(common.certificates, language)}</h1><strong>{language === "zh" ? "以公开画册中的企业证书与荣誉资料建立透明的资质入口。" : language === "en" ? "A transparent reference to qualifications and awards presented in the company catalogue." : "مرجع واضح للمؤهلات والجوائز المعروضة في كتالوج الشركة."}</strong></span></section>
    <Breadcrumb language={language} current={pick(common.certificates, language)} />
    <section className="certificate-section">
      <div className="catalog-heading"><p>{language === "zh" ? "证书与企业荣誉" : language === "en" ? "CERTIFICATES & COMPANY HONOURS" : "الشهادات وتكريمات الشركة"}</p><h2>{language === "zh" ? "真实资料，清晰呈现" : language === "en" ? "Documented and clearly presented" : "وثائق معروضة بوضوح"}</h2></div>
      <div className="certificate-layout"><figure><img src={asset("/zp/catalog/certificates.jpg")} alt={pick(common.certificates, language)} /></figure><div><span>01</span><h3>{language === "zh" ? "画册证书总览" : language === "en" ? "Catalogue certificate overview" : "نظرة عامة على شهادات الكتالوج"}</h3><p>{language === "zh" ? "本页内容截取自《洲鹏画册》的企业证书与荣誉页面，便于海外客户在项目沟通初期了解企业资料。" : language === "en" ? "This image is taken from the certificates and honours spread in the Zhoupeng company catalogue, providing an initial reference during project discussions." : "هذه الصورة مأخوذة من صفحة الشهادات والتكريمات في كتالوج الشركة، وتوفر مرجعاً أولياً أثناء مناقشة المشروع."}</p><small>{language === "zh" ? "重要说明：证书名称、认证范围、状态和有效期以证书原件及签发机构记录为准。如项目需要，请向销售团队索取当前有效文件。" : language === "en" ? "Important: Certificate names, scopes, status and validity are subject to the original documents and issuer records. Request current documents from the sales team when required for a project." : "مهم: تخضع أسماء الشهادات ونطاقاتها وحالتها وصلاحيتها للوثائق الأصلية وسجلات جهات الإصدار. اطلب الوثائق السارية من فريق المبيعات عند الحاجة."}</small><a className="button dark" href="mailto:sales@zhoupengindustry.com">{language === "zh" ? "索取有效文件" : language === "en" ? "Request current documents" : "اطلب الوثائق السارية"}</a></div></div>
    </section>
  </>}</CatalogShell>;
}
