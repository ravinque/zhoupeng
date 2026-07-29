"use client";

/* eslint-disable @next/next/no-img-element */

import { Breadcrumb, CatalogShell } from "../../catalog-chrome";
import { asset, common, pick, productSystems, route } from "../../catalog-data";

export default function ProductDetail({ slug }: { slug: string }) {
  const item = productSystems.find((product) => product.slug === slug)!;
  return <CatalogShell>{({ language }) => <>
    <section className="detail-top">
      <div className="detail-visual"><img src={asset(item.hero)} alt={pick(item.name, language)} /></div>
      <div className="detail-copy"><p>{pick(item.eyebrow, language)}</p><h1>{pick(item.name, language)}</h1><strong>{pick(item.summary, language)}</strong><span>{pick(item.description, language)}</span><a className="button dark" href={`${route("/")}#contact`}>{pick(common.enquire, language)}</a></div>
    </section>
    <Breadcrumb language={language} parent={common.products} current={pick(item.name, language)} />
    <section className="detail-gallery">
      <div className="catalog-heading"><p>{language === "zh" ? "来自洲鹏画册" : language === "en" ? "FROM THE ZHOUPENG CATALOGUE" : "من كتالوج تشو بنغ"}</p><h2>{language === "zh" ? "产品与空间组合" : language === "en" ? "Products in context" : "المنتجات ضمن المساحة"}</h2></div>
      <div>{item.gallery.map((image, index) => <figure key={image}><img src={asset(image)} alt={`${pick(item.name, language)} ${index + 1}`} /></figure>)}</div>
      <p className="scope-note">{language === "zh" ? "图片用于展示产品语言与空间组合。材料、颜色、尺寸、五金、性能和供货范围以项目确认资料为准。" : language === "en" ? "Images illustrate product language and spatial combinations. Materials, colours, dimensions, fittings, performance and supply scope are subject to the approved project documents." : "توضح الصور لغة المنتج وتنسيقه ضمن المساحة. تخضع المواد والألوان والأبعاد والتجهيزات والأداء ونطاق التوريد لوثائق المشروع المعتمدة."}</p>
    </section>
  </>}</CatalogShell>;
}
