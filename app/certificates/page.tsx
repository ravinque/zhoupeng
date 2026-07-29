"use client";

/* eslint-disable @next/next/no-img-element */

import { Breadcrumb, CatalogShell } from "../catalog-chrome";
import { certificateDocuments, certificatePick } from "../certificate-data";
import { asset, common, pick } from "../catalog-data";

export default function CertificatesPage() {
  return <CatalogShell>{({ language }) => <>
    <section className="catalog-hero certificate-hero"><img src={asset("/zp/posters/factory-01.jpg")} alt="" /><div /><span><p>{language === "zh" ? "企业资料" : language === "en" ? "COMPANY DOCUMENTS" : "وثائق الشركة"}</p><h1>{pick(common.certificates, language)}</h1><strong>{language === "zh" ? "以公开画册中的企业证书与荣誉资料建立透明的资质入口。" : language === "en" ? "A transparent reference to qualifications and awards presented in the company catalogue." : "مرجع واضح للمؤهلات والجوائز المعروضة في كتالوج الشركة."}</strong></span></section>
    <Breadcrumb language={language} current={pick(common.certificates, language)} />
    <section className="certificate-section">
      <div className="catalog-heading"><p>{language === "zh" ? "证书与企业荣誉" : language === "en" ? "CERTIFICATES & COMPANY HONOURS" : "الشهادات وتكريمات الشركة"}</p><h2>{language === "zh" ? "真实资料，清晰呈现" : language === "en" ? "Documented and clearly presented" : "وثائق معروضة بوضوح"}</h2></div>
      <div className="certificate-board">
        {certificateDocuments.map((document, index) => <article className="certificate-card" key={document.code}>
          <figure><img src={asset(document.image)} alt={certificatePick(document.title, language)} /></figure>
          <div><span>{String(index + 1).padStart(2, "0")} / {document.code}</span><h3>{certificatePick(document.title, language)}</h3><p>{certificatePick(document.detail, language)}</p></div>
        </article>)}
      </div>
      <div className="certificate-note"><p>{language === "zh" ? "证书名称、认证范围、状态与有效期以原件及签发机构记录为准。项目审核需要时，请向销售团队索取当前有效文件。" : language === "en" ? "Names, scopes, status and validity are subject to the original documents and issuer records. Request current files from the sales team for project due diligence." : "تخضع الأسماء والنطاقات والحالة والصلاحية للوثائق الأصلية وسجلات الجهات المصدرة. اطلب الملفات الحالية من فريق المبيعات عند تدقيق المشروع."}</p><a className="button dark" href="mailto:sales@zhoupengindustry.com">{language === "zh" ? "索取有效文件" : language === "en" ? "Request current documents" : "اطلب الوثائق السارية"}</a></div>
    </section>
  </>}</CatalogShell>;
}
