"use client";

/* eslint-disable @next/next/no-img-element */

import { ReactNode, useEffect, useState } from "react";
import { asset, common, Lang, pick, route, Triple } from "./catalog-data";
import { SiteFooter } from "./site-footer";

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
    [common.home, route("/")],
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
  return <SiteFooter language={language} />;
}

export function CatalogShell({ children }: { children: (ctx: ReturnType<typeof useLanguage>) => ReactNode }) {
  const ctx = useLanguage();
  return <main className="catalog-site" dir={ctx.dir}><CatalogHeader language={ctx.language} onLanguage={ctx.changeLanguage} />{children(ctx)}<CatalogFooter language={ctx.language} /></main>;
}
