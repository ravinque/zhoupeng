"use client";

/* eslint-disable @next/next/no-img-element */

import { Breadcrumb, CatalogShell } from "../catalog-chrome";
import { asset, common, pick, productSystems, route } from "../catalog-data";

export default function ProductsPage() {
  return <CatalogShell>{({ language }) => <>
    <section className="catalog-hero"><img src={asset("/zp/catalog/kitchen-modern.jpg")} alt="" /><div /><span><p>{language === "zh" ? "洲鹏产品目录" : language === "en" ? "ZHOUPENG PRODUCT COLLECTION" : "مجموعة منتجات تشو بنغ"}</p><h1>{pick(common.products, language)}</h1><strong>{language === "zh" ? "从单品到整屋空间，以真实画册素材呈现产品组合。" : language === "en" ? "From individual products to complete interiors, presented with authentic catalogue imagery." : "من المنتجات الفردية إلى المساحات المتكاملة بصور حقيقية من كتالوج الشركة."}</strong></span></section>
    <Breadcrumb language={language} current={pick(common.products, language)} />
    <section className="catalog-list">
      <div className="catalog-heading"><p>{language === "zh" ? "六类空间与产品系统" : language === "en" ? "SIX PRODUCT & SPACE SYSTEMS" : "ستة أنظمة للمنتجات والمساحات"}</p><h2>{language === "zh" ? "为项目建立一致的材质与空间语言" : language === "en" ? "A consistent material and spatial language" : "لغة متناسقة للمواد والمساحات"}</h2></div>
      <div className="catalog-filter">{productSystems.map((item) => <a href={`#${item.slug}`} key={item.slug}>{pick(item.name, language)}</a>)}</div>
      <div className="catalog-grid">{productSystems.map((item) => <article id={item.slug} key={item.slug}><a className="catalog-card-image" href={route(`/products/${item.slug}/`)}><img src={asset(item.hero)} alt={pick(item.name, language)} /></a><p>{pick(item.eyebrow, language)}</p><h3><a href={route(`/products/${item.slug}/`)}>{pick(item.name, language)}</a></h3><span>{pick(item.summary, language)}</span><a className="text-link" href={route(`/products/${item.slug}/`)}>{language === "zh" ? "查看系列" : language === "en" ? "View collection" : "عرض المجموعة"} <b aria-hidden="true">→</b></a></article>)}</div>
    </section>
  </>}</CatalogShell>;
}
