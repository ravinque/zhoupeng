"use client";

/* eslint-disable @next/next/no-img-element */

import { ReactNode, useEffect, useState } from "react";
import { CONTACT_EMAIL, CONTACT_PHONE_TEL } from "./contact";
import { asset, common, Lang, pick, productSystems, route, Triple } from "./catalog-data";

export function useLanguage() {
  const [language, setLanguage] = useState<Lang>("zh");
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("zp-language") as Lang | null;
      if (saved && ["zh", "en", "ar"].includes(saved)) setLanguage(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);
  const changeLanguage = (next: Lang) => {
    setLanguage(next);
    window.localStorage.setItem("zp-language", next);
  };
  return { language, changeLanguage, dir: language === "ar" ? "rtl" : "ltr" };
}

export function CatalogHeader({ language, onLanguage }: { language: Lang; onLanguage: (lang: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const links: [Triple, string][] = [
    [common.products, route("/products/")],
    [common.certificates, route("/certificates/")],
    [common.manufacturing, `${route("/") }#factory`],
    [common.about, `${route("/") }#about`],
  ];
  return <header className="catalog-header">
    <a className="brand" href={route("/")}><img src={asset("/zp/logo.png")} alt="" /><span><strong>{pick(common.brand, language)}</strong><small>{pick(common.tagline, language)}</small></span></a>
    <nav className="desktop-nav">{links.map(([label, href]) => <a href={href} key={href}>{pick(label, language)}</a>)}</nav>
    <div className="header-actions">
      <select value={language} onChange={(event) => onLanguage(event.target.value as Lang)} aria-label={language === "zh" ? "语言" : language === "en" ? "Language" : "اللغة"}>
        <option value="zh">中文</option><option value="en">English</option><option value="ar">العربية</option>
      </select>
      <a className="contact-link" href={`${route("/")}#contact`}>{pick(common.contact, language)}</a>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="catalog-mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? "×" : "☰"}</button>
    </div>
    {open && <nav className="mobile-nav" id="catalog-mobile-nav">{links.map(([label, href]) => <a href={href} key={href}>{pick(label, language)}</a>)}</nav>}
  </header>;
}

export function Breadcrumb({ language, current, parent }: { language: Lang; current: string; parent?: Triple }) {
  return <nav className="breadcrumb" aria-label="Breadcrumb">
    <a href={route("/")}>{pick(common.home, language)}</a><span aria-hidden="true">/</span>
    {parent && <><a href={route("/products/")}>{pick(parent, language)}</a><span aria-hidden="true">/</span></>}
    <strong>{current}</strong>
  </nav>;
}

export function CatalogFooter({ language }: { language: Lang }) {
  return <footer className="catalog-footer">
    <div className="footer-cta">
      <p>{pick(common.tagline, language)}</p>
      <h2>{language === "zh" ? "从一份项目资料，开始协同。" : language === "en" ? "Start with your project brief." : "ابدأ بملخص مشروعك."}</h2>
      <span>{language === "zh" ? "与洲鹏团队讨论空间、产品和交付需求。" : language === "en" ? "Discuss space, product and delivery requirements with the Zhoupeng team." : "ناقش متطلبات المساحة والمنتج والتسليم مع فريق تشو بنغ."}</span>
      <aside><a className="button light" href={`${route("/")}#contact`}>{pick(common.enquire, language)}</a><a className="button outline" href={route("/products/")}>{pick(common.explore, language)}</a></aside>
    </div>
    <div className="footer-main">
      <div className="footer-brand"><a className="brand" href={route("/")}><img src={asset("/zp/logo.png")} alt="" /><span><strong>ZHOUPENG</strong><small>{pick(common.tagline, language)}</small></span></a><p>{language === "zh" ? "福建洲鹏实业有限公司，定制家居产品与项目协同服务。" : language === "en" ? "Fujian Zhoupeng Industrial Co., Ltd. Custom-home products and project coordination." : "شركة فوجيان تشو بنغ الصناعية المحدودة، منتجات منزلية حسب الطلب وتنسيق للمشروعات."}</p></div>
      <div><h3>{pick(common.products, language)}</h3>{productSystems.slice(0, 4).map((item) => <a href={route(`/products/${item.slug}/`)} key={item.slug}>{pick(item.name, language)}</a>)}</div>
      <div><h3>{language === "zh" ? "公司" : language === "en" ? "Company" : "الشركة"}</h3><a href={`${route("/")}#about`}>{pick(common.about, language)}</a><a href={`${route("/")}#factory`}>{pick(common.manufacturing, language)}</a><a href={route("/certificates/")}>{pick(common.certificates, language)}</a><a href={route("/privacy/")}>{pick(common.privacy, language)}</a><a href={route("/terms/")}>{pick(common.terms, language)}</a></div>
      <div className="footer-contact"><h3>{pick(common.contact, language)}</h3><a href={`tel:+86${CONTACT_PHONE_TEL.slice(1)}`}>+86 597 399 2099</a><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><span>{language === "zh" ? "中国福建省上杭县李家坪工业区" : language === "en" ? "Lijiaping Industrial Zone, Shanghang, Fujian, China" : "منطقة ليجيا بينغ الصناعية، شانغهانغ، فوجيان، الصين"}</span></div>
    </div>
    <div className="footer-bottom">© {new Date().getFullYear()} Fujian Zhoupeng Industrial Co., Ltd.</div>
    <div className="powered-strip"><span aria-hidden="true">L</span><strong>{pick(common.powered, language)}</strong></div>
  </footer>;
}

export function CatalogShell({ children }: { children: (ctx: ReturnType<typeof useLanguage>) => ReactNode }) {
  const ctx = useLanguage();
  return <main className="catalog-site" dir={ctx.dir}><CatalogHeader language={ctx.language} onLanguage={ctx.changeLanguage} />{children(ctx)}<CatalogFooter language={ctx.language} /></main>;
}
