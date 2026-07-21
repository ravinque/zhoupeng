"use client";

/* eslint-disable @next/next/no-img-element */

import {
  buildQuoteMailBody,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  mailtoUrl,
  whatsappUrl,
} from "./contact";
import {
  type Lang,
  type Region,
  type Product,
  products,
  regions,
  copy,
  languageOptions,
  isLang,
  htmlLang,
  brandName,
  brandMark,
  pageTitle,
  getAgentReply,
} from "./i18n";
import { FormEvent, useEffect, useMemo, useState } from "react";

type AdvantageTab = "equipment" | "software" | "tech";

type ChatMessage = {
  role: "agent" | "customer";
  text: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const factoryVideos = [
  { src: "/zp/videos/factory-01.mp4", poster: "/zp/posters/factory-01.jpg" },
  { src: "/zp/videos/factory-02.mp4", poster: "/zp/posters/factory-02.jpg" },
  { src: "/zp/videos/factory-03.mp4", poster: "/zp/posters/factory-03.jpg" },
] as const;

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function Home() {
  const [language, setLanguage] = useState<Lang>("zh");
  const [region, setRegion] = useState<Region>("west");
  const [quote, setQuote] = useState<Product[]>([]);
  const [selected, setSelected] = useState(products[3]);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [sessionEmail, setSessionEmail] = useState(() =>
    typeof window === "undefined" ? "" : window.localStorage.getItem("zp-session-email") ?? "",
  );
  const [quoteStatus, setQuoteStatus] = useState("");
  const [loginError, setLoginError] = useState("");
  const [quoteError, setQuoteError] = useState("");
  const [chatText, setChatText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "agent", text: copy.zh.starterMessage },
  ]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [advantageTab, setAdvantageTab] = useState<AdvantageTab>("equipment");

  const t = copy[language];
  const regionData = regions[region];
  const dir = language === "ar" ? "rtl" : "ltr";
  const whatsAppLink = whatsappUrl(t.whatsAppInquiry);
  const generalMailLink = mailtoUrl(t.emailSubjectGeneral, t.emailBodyGeneral);
  const quoteTotal = quote.reduce(
    (sum, item) => sum + (region === "middleEast" ? item.priceMe : item.priceWest),
    0,
  );

  const numberLocale = language === "zh" ? "zh-CN" : language === "ar" ? "ar-AE" : "en-US";

  const displayPrice = useMemo(
    () => (item: Product) => {
      const value = region === "middleEast" ? item.priceMe : item.priceWest;
      return `${regionData.pricePrefix}${value.toLocaleString(numberLocale)}`;
    },
    [region, regionData.pricePrefix, numberLocale],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedLanguage = window.localStorage.getItem("zp-language");
      if (isLang(savedLanguage)) {
        setLanguage(savedLanguage);
        if (savedLanguage === "ar") setRegion("middleEast");
        setMessages([{ role: "agent", text: copy[savedLanguage].starterMessage }]);
      }
      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = htmlLang(language);
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.title = pageTitle(language);
    }
  }, [language]);

  const addToQuote = (product: Product) => {
    setQuote((current) =>
      current.some((item) => item.id === product.id) ? current : [...current, product],
    );
    setSelected(product);
    setQuoteStatus(`${product.title[language]}${t.addedNotice}`);
  };

  const openProductDetails = (product: Product) => {
    setSelected(product);
    setDetailProduct(product);
  };

  const removeFromQuote = (id: string) => {
    setQuote((current) => current.filter((item) => item.id !== id));
  };

  const submitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");

    if (!email && !password) {
      setLoginError(t.requiredFieldsError);
      return;
    }
    if (!isValidEmail(email)) {
      setLoginError(t.invalidEmailError);
      return;
    }
    if (!password) {
      setLoginError(t.passwordRequiredError);
      return;
    }

    window.localStorage.setItem("zp-session-email", email);
    setSessionEmail(email);
    setLoginError("");
    setIsLoginOpen(false);
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const country = String(data.country || "").trim();
    const phone = String(data.phone || "").trim();

    if (!name || !email || !country || !phone) {
      setQuoteError(t.quoteRequiredError);
      setQuoteStatus("");
      return;
    }
    if (!isValidEmail(email)) {
      setQuoteError(t.invalidEmailError);
      setQuoteStatus("");
      return;
    }

    window.localStorage.setItem(
      "zp-last-quote",
      JSON.stringify({
        region,
        language,
        quoteItems: quote.map((item) => item.id),
        submittedAt: new Date().toISOString(),
        ...data,
      }),
    );

    const projectType = String(data.projectType || "");
    const budget = String(data.budget || "");
    const notes = String(data.notes || "");
    const mailBody = buildQuoteMailBody({
      name,
      email,
      country,
      phone,
      projectType,
      budget,
      notes,
      regionLabel: regionData.name[language],
      items: quote.map((item) => ({
        title: item.title[language],
        price: displayPrice(item),
      })),
      total: quote.length
        ? `${regionData.pricePrefix}${quoteTotal.toLocaleString(numberLocale)}`
        : t.custom,
      labels: {
        heading: t.quoteMailHeading,
        name: t.quoteMailName,
        email: t.quoteMailEmail,
        country: t.quoteMailCountry,
        phone: t.quoteMailPhone,
        region: t.quoteMailRegion,
        projectType: t.quoteMailProjectType,
        budget: t.quoteMailBudget,
        items: t.quoteMailItems,
        wholeHome: t.quoteMailWholeHome,
        total: t.quoteMailTotal,
        notes: t.quoteMailNotes,
        website: t.quoteMailWebsite,
      },
    });
    window.open(mailtoUrl(t.quoteEmailSubject, mailBody), "_blank");

    setQuoteError("");
    setQuoteStatus(t.saved);
  };

  const sendChat = (text = chatText) => {
    const cleanText = text.trim();
    if (!cleanText) return;
    setMessages((current) => [
      ...current,
      { role: "customer", text: cleanText },
      { role: "agent", text: getAgentReply(cleanText, language) },
    ]);
    setChatText("");
  };

  const switchLanguage = (nextLanguage: Lang) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("zp-language", nextLanguage);
    if (nextLanguage === "ar") setRegion("middleEast");
    setLoginError("");
    setQuoteError("");
    setQuoteStatus("");
    setMessages([{ role: "agent", text: copy[nextLanguage].starterMessage }]);
  };

  return (
    <main className="site-shell" dir={dir} lang={htmlLang(language)}>
      <header className="topbar">
        <a
          className="brand"
          href="#home"
          aria-label={t.brandHome}
        >
          <img src={asset("/zp/logo.png")} alt="" />
          <span>
            <strong>{brandName(language)}</strong>
            <small>{t.brandSubline}</small>
          </span>
        </a>
        <nav className="nav-links" aria-label={t.primaryNavLabel}>
          <a href="#products">{t.nav[0]}</a>
          <a href="#company">{t.nav[1]}</a>
          <a href="#solutions">{t.nav[2]}</a>
          <a href="#quote">{t.nav[3]}</a>
          <a href="#contact">{t.nav[4]}</a>
        </nav>
        <div className="top-actions">
          <select
            aria-label={t.language}
            className="language-select"
            value={language}
            onChange={(event) => switchLanguage(event.target.value as Lang)}
            disabled={!isHydrated}
          >
            {languageOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="icon-button service-top" onClick={() => setIsServiceOpen(true)} type="button">
            {t.serviceTop}
          </button>
          <button className="icon-button" onClick={() => setIsLoginOpen(true)} type="button">
            {sessionEmail ? t.account : t.login}
          </button>
        </div>
      </header>

      <section className="hero-bleed fade-up" id="home">
        <div className="hero-media" aria-hidden="true">
          <video autoPlay loop muted playsInline poster={asset("/zp/hero.jpg")}>
            <source src={asset("/zp/videos/factory-01.mp4")} type="video/mp4" />
          </video>
          <div className="hero-scrim" />
        </div>
        <div className="hero-inner">
          <span className="hero-brand">{brandMark(language)}</span>
          <h1>{t.heroTitle}</h1>
          <p className="hero-lead">{t.heroText}</p>
          <div className="hero-actions">
            <a className="button primary" href="#quote">
              {t.startOrder}
            </a>
            <a className="button whatsapp" href={whatsAppLink} rel="noopener noreferrer" target="_blank">
              {t.whatsApp}
            </a>
            <a className="button email" href={generalMailLink}>
              {t.emailUs}
            </a>
          </div>
        </div>
      </section>

      <section className="section-block stone" id="categories">
        <div className="section-heading center fade-up">
          <p className="eyebrow">{t.categoriesEyebrow}</p>
          <h2>{t.categoriesTitle}</h2>
        </div>
        <div className="category-tiles">
          {products.map((product) => (
            <article className="category-tile fade-up" key={`cat-${product.id}`}>
              <div className="category-tile-media">
                <img src={asset(product.image)} alt={product.title[language]} />
              </div>
              <div className="category-tile-scrim" />
              <div className="category-tile-copy">
                <small>{product.shortName[language]}</small>
                <h3>{product.title[language]}</h3>
                <p>{product.summary[language]}</p>
                <button
                  className="category-tile-link"
                  onClick={() => openProductDetails(product)}
                  type="button"
                >
                  {t.exploreCategory}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" id="videos">
        <div className="section-heading fade-up">
          <p className="eyebrow">{t.videoEyebrow}</p>
          <h2>{t.videoTitle}</h2>
          <p>{t.videoText}</p>
        </div>
        <div className="video-gallery fade-up">
          {factoryVideos.map((video, index) => (
            <article className="video-card" key={video.src}>
              <video controls playsInline preload="metadata" poster={asset(video.poster)}>
                <source src={asset(video.src)} type="video/mp4" />
              </video>
              <div>
                <h3>{t.factoryVideoTitles[index]}</h3>
                <p>{t.factoryVideoTexts[index]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="showcase-band fade-up" aria-label={t.showcaseCaption}>
        <img src={asset("/zp/banners/hero-anim.png")} alt="" />
        <div className="showcase-caption">
          <p>{t.showcaseCaption}</p>
        </div>
      </section>

      <section className="section-block stone" id="company">
        <div className="about-grid fade-up">
          <div className="about-copy">
            <div className="section-heading">
              <p className="eyebrow">{t.companyEyebrow}</p>
              <h2>{t.companyTitle}</h2>
            </div>
            <p>{t.aboutP1}</p>
            <p>{t.aboutP2}</p>
            <p>{t.aboutP3}</p>
            <p>{t.aboutP4}</p>
            <div className="about-stats">
              <div className="about-stat">
                <strong>2012</strong>
                <span>{t.founded}</span>
              </div>
              <div className="about-stat">
                <strong>{t.productionBaseValue}</strong>
                <span>{t.productionBase}</span>
              </div>
              <div className="about-stat">
                <strong>{t.standardPlantValue}</strong>
                <span>{t.standardPlant}</span>
              </div>
              <div className="about-stat">
                <strong>{t.officeValue}</strong>
                <span>{t.officeLabel}</span>
              </div>
              <div className="about-stat">
                <strong>{t.opsCentersValue}</strong>
                <span>{t.opsCentersLabel}</span>
              </div>
              <div className="about-stat">
                <strong>{t.exportValue}</strong>
                <span>{t.exportLabel}</span>
              </div>
            </div>
            <p>
              <strong>{t.greenLabel}:</strong> {t.greenValue}
            </p>
          </div>
          <div className="about-images">
            <img src={asset("/zp/banners/about-01.jpg")} alt={t.companyImageAlt} />
            <img src={asset("/zp/banners/about-02.jpg")} alt={t.companyImageAlt} />
          </div>
        </div>

        <div className="advantage-tabs fade-up">
          <div className="section-heading">
            <p className="eyebrow">{t.advantageEyebrow}</p>
            <h2>{t.advantageTitle}</h2>
          </div>
          <div className="advantage-nav" role="tablist">
            {(
              [
                ["equipment", t.tabEquipment],
                ["software", t.tabSoftware],
                ["tech", t.tabTech],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                className={advantageTab === key ? "active" : ""}
                onClick={() => setAdvantageTab(key)}
                role="tab"
                aria-selected={advantageTab === key}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="advantage-panel" role="tabpanel">
            {advantageTab === "equipment" ? (
              <>
                <div>
                  <h3>{t.tabEquipment}</h3>
                  <p>{t.equipmentIntro}</p>
                  <p>{t.equipmentBrands}</p>
                  <p>{t.equipmentListLabel}</p>
                  <ul>
                    {t.equipmentItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="advantage-aside">
                  <strong>{t.advantageAsideEquipmentLabel}</strong>
                  <span>{t.advantageAsideEquipmentValue}</span>
                </div>
              </>
            ) : null}
            {advantageTab === "software" ? (
              <>
                <div>
                  <h3>{t.tabSoftware}</h3>
                  <p>{t.softwareIntro}</p>
                  <p>{t.softwareSystems}</p>
                  <p>{t.softwareTeam}</p>
                </div>
                <div className="advantage-aside">
                  <strong>{t.advantageAsideSoftwareLabel}</strong>
                  <span>{t.advantageAsideSoftwareValue}</span>
                </div>
              </>
            ) : null}
            {advantageTab === "tech" ? (
              <>
                <div>
                  <h3>{t.tabTech}</h3>
                  <p>{t.techIntro}</p>
                  <ul>
                    {t.techItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="advantage-aside">
                  <strong>{t.advantageAsideTechLabel}</strong>
                  <span>{t.advantageAsideTechValue}</span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <section className="catalogue section-block" id="products">
        <div className="section-heading">
          <p className="eyebrow">{t.productsEyebrow}</p>
          <h2>{t.productsTitle}</h2>
          <p>{regionData.intro[language]}</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article
              className={`product-card ${quote.some((item) => item.id === product.id) ? "in-quote" : ""}`}
              key={product.id}
            >
              <button
                className="image-button"
                onClick={() => openProductDetails(product)}
                type="button"
                aria-label={`${t.viewDetails} ${product.title[language]}`}
              >
                <img src={asset(product.image)} alt={product.title[language]} />
                <span>{product.badge[language]}</span>
              </button>
              <div className="product-body">
                <small>{product.zone[language]}</small>
                <h3>
                  <button className="title-button" onClick={() => openProductDetails(product)} type="button">
                    {product.title[language]}
                  </button>
                </h3>
                <p>{product.summary[language]}</p>
                <ul>
                  {product.specs[language].map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
                <button className="detail-link" onClick={() => openProductDetails(product)} type="button">
                  {t.viewDetails}
                </button>
                <div className="product-foot">
                  <strong>{displayPrice(product)}</strong>
                  <button
                    className={quote.some((item) => item.id === product.id) ? "added" : ""}
                    onClick={() => addToQuote(product)}
                    type="button"
                    aria-pressed={quote.some((item) => item.id === product.id)}
                  >
                    {quote.some((item) => item.id === product.id) ? t.added : t.add}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block stone solution-band" id="solutions">
        <div className="section-heading compact">
          <p className="eyebrow">{t.regionEyebrow}</p>
          <h2>{t.regionTitle}</h2>
          <p>{regionData.support[language]}</p>
        </div>
        <div className="solution-grid">
          {regionData.standards[language].map((standard) => (
            <article key={standard}>
              <span>{regionData.short}</span>
              <h3>{standard}</h3>
              <p>{t.regionCardText}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block order-section" id="quote">
        <div className="order-preview">
          <p className="eyebrow">{t.selectedSolution}</p>
          <img src={asset(selected.image)} alt={selected.title[language]} />
          <div>
            <span>{selected.zone[language]}</span>
            <h2>{selected.title[language]}</h2>
            <p>{selected.summary[language]}</p>
            <strong>{displayPrice(selected)}</strong>
          </div>
        </div>
        <form className="quote-panel" onSubmit={submitQuote} noValidate>
          <div className="panel-heading">
            <p className="eyebrow">{t.orderEyebrow}</p>
            <h2>{t.orderTitle}</h2>
            <p>{regionData.customerLine[language]}</p>
          </div>
          <div className="quote-list">
            {quote.length === 0 ? (
              <p className="empty-state">{t.emptyQuote}</p>
            ) : (
              quote.map((item) => (
                <div className="quote-row" key={item.id}>
                  <span>{item.title[language]}</span>
                  <strong>{displayPrice(item)}</strong>
                  <button
                    onClick={() => removeFromQuote(item.id)}
                    type="button"
                    aria-label={`${t.removeLabel} ${item.title[language]}`}
                  >
                    {t.remove}
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="quote-total">
            <span>{t.total}</span>
            <strong>
              {quote.length ? `${regionData.pricePrefix}${quoteTotal.toLocaleString(numberLocale)}` : t.custom}
            </strong>
          </div>
          <div className="form-grid">
            <label className="wide-field">
              {t.projectRegion}
              <select
                name="region"
                value={region}
                onChange={(event) => setRegion(event.target.value as Region)}
              >
                {(["west", "middleEast"] as Region[]).map((key) => (
                  <option key={key} value={key}>
                    {regions[key].name[language]} · {regions[key].currency}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t.name}
              <input name="name" placeholder={t.name} />
            </label>
            <label>
              {t.email}
              <input name="email" inputMode="email" placeholder={t.email} />
            </label>
            <label>
              {t.country}
              <input
                key={`country-${language}-${region}`}
                name="country"
                defaultValue={regionData.formCountry[language]}
              />
            </label>
            <label>
              {t.phone}
              <input name="phone" placeholder="+86 / +1 / +971 / +966" dir="ltr" />
            </label>
            <label>
              {t.projectType}
              <select key={`projectType-${language}`} name="projectType" defaultValue="villa">
                {t.projectTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t.budget}
              <select key={`budget-${language}`} name="budget" defaultValue="mid">
                {t.budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            {t.notes}
            <textarea name="notes" placeholder={t.notesPlaceholder} />
          </label>
          {quoteError ? <p className="error-message" role="alert">{quoteError}</p> : null}
          <button className="button primary full" type="submit">
            {t.submitOrder}
          </button>
          {quoteStatus ? <p className="success-message">{quoteStatus}</p> : null}
        </form>
      </section>

      <section className="section-block contact-section" id="contact">
        <div>
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h2>{t.contactTitle}</h2>
          <p>
            {t.phoneLabel}:{" "}
            <a href={`tel:${CONTACT_PHONE_TEL}`}>
              <bdi dir="ltr">{CONTACT_PHONE}</bdi>
            </a>{" "}
            · {t.emailLabel}:{" "}
            <a href={generalMailLink}>
              <bdi dir="ltr">cathy@shhf2008.com</bdi>
            </a>
          </p>
          <p>{t.address}</p>
          <div className="contact-actions">
            <a className="button whatsapp" href={whatsAppLink} rel="noopener noreferrer" target="_blank">
              {t.whatsApp}
            </a>
            <a className="button dark" href={generalMailLink}>
              {t.emailUs}
            </a>
            <button className="button secondary" onClick={() => setIsServiceOpen(true)} type="button">
              {t.openDesk}
            </button>
            <a className="button secondary" href={`tel:${CONTACT_PHONE_TEL}`}>
              <bdi dir="ltr">{CONTACT_PHONE}</bdi>
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer" id="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={asset("/zp/logo.png")} alt="" />
            <p>{t.footerIntro}</p>
          </div>
          <div className="footer-col">
            <h4>{t.footerNavTitle}</h4>
            <nav>
              <a href="#home">{t.home}</a>
              <a href="#products">{t.nav[0]}</a>
              <a href="#company">{t.nav[1]}</a>
              <a href="#solutions">{t.nav[2]}</a>
              <a href="#quote">{t.nav[3]}</a>
              <a href="#contact">{t.nav[4]}</a>
            </nav>
          </div>
          <div className="footer-col">
            <h4>{t.footerProductsTitle}</h4>
            <ul>
              {products.map((product) => (
                <li key={`footer-${product.id}`}>
                  <a href="#products" onClick={() => openProductDetails(product)}>
                    {product.title[language]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t.footerContactTitle}</h4>
            <nav>
              <a href={`tel:${CONTACT_PHONE_TEL}`}>
                <bdi dir="ltr">{CONTACT_PHONE}</bdi>
              </a>
              <a href={generalMailLink}>
                <bdi dir="ltr">cathy@shhf2008.com</bdi>
              </a>
              <a href={whatsAppLink} rel="noopener noreferrer" target="_blank">
                {t.whatsApp}
              </a>
              <span>{t.address}</span>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t.footerCopyright}</span>
        </div>
      </footer>

      <div className="float-actions">
        <a
          className="float-btn whatsapp"
          href={whatsAppLink}
          rel="noopener noreferrer"
          target="_blank"
          aria-label={t.whatsApp}
        >
          {t.whatsApp}
        </a>
        <button className="float-btn service" onClick={() => setIsServiceOpen(true)} type="button">
          {t.contactService}
        </button>
      </div>

      {isLoginOpen ? (
        <div className="modal-backdrop" role="presentation">
          <section className="modal" id="login" role="dialog" aria-modal="true" aria-label={t.loginSystem}>
            <button className="modal-close" onClick={() => setIsLoginOpen(false)} type="button">
              {t.close}
            </button>
            <p className="eyebrow">{t.loginSystem}</p>
            <h2>{t.loginTitle}</h2>
            <p className="muted">{t.loginText}</p>
            <form onSubmit={submitLogin} noValidate>
              <label>
                {t.email}
                <input name="email" inputMode="email" placeholder="buyer@example.com" />
              </label>
              <label>
                {t.password}
                <input name="password" type="password" placeholder="******" />
              </label>
              {loginError ? <p className="error-message" role="alert">{loginError}</p> : null}
              <button className="button primary full" type="submit">
                {t.signIn}
              </button>
            </form>
            {sessionEmail ? <p className="success-message">{t.signedIn}{sessionEmail}</p> : null}
          </section>
        </div>
      ) : null}

      {detailProduct ? (
        <div className="modal-backdrop" role="presentation">
          <section
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${t.productDetails} ${detailProduct.title[language]}`}
          >
            <button className="modal-close" onClick={() => setDetailProduct(null)} type="button">
              {t.close}
            </button>
            <div className="product-modal-media">
              <img src={asset(detailProduct.image)} alt={`${detailProduct.title[language]} detail`} />
              <span>{detailProduct.badge[language]}</span>
            </div>
            <div className="product-modal-copy">
              <p className="eyebrow">{t.productDetails}</p>
              <h2>{detailProduct.title[language]}</h2>
              <p className="modal-zone">{detailProduct.zone[language]}</p>
              <p>{detailProduct.summary[language]}</p>
              <div className="detail-price">
                <span>{t.total}</span>
                <strong>{displayPrice(detailProduct)}</strong>
              </div>
              <div className="detail-specs">
                <h3>{t.detailFeatures}</h3>
                <ul>
                  {detailProduct.specs[language].map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </div>
              <div className="detail-actions">
                <button
                  className="button primary"
                  onClick={() => addToQuote(detailProduct)}
                  type="button"
                >
                  {quote.some((item) => item.id === detailProduct.id) ? t.added : t.detailAdd}
                </button>
                <a className="button secondary" href="#quote" onClick={() => setDetailProduct(null)}>
                  {t.detailQuote}
                </a>
                <button className="button secondary" onClick={() => setDetailProduct(null)} type="button">
                  {t.backList}
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {isServiceOpen ? (
        <aside className="service-desk" aria-label={t.onlineService}>
          <div className="service-head">
            <div>
              <p className="eyebrow">{t.onlineService}</p>
              <h2>{t.serviceDesk}</h2>
            </div>
            <button onClick={() => setIsServiceOpen(false)} type="button">
              {t.close}
            </button>
          </div>
          <div className="service-contact">
            <a href={`tel:${CONTACT_PHONE_TEL}`}>
              <bdi dir="ltr">{CONTACT_PHONE}</bdi>
            </a>
            <a href={generalMailLink}>
              <bdi dir="ltr">cathy@shhf2008.com</bdi>
            </a>
            <div className="service-contact-actions">
              <a className="wa" href={whatsAppLink} rel="noopener noreferrer" target="_blank">
                {t.whatsApp}
              </a>
              <a className="mail" href={generalMailLink}>
                {t.emailUs}
              </a>
            </div>
          </div>
          <div className="message-list">
            {messages.map((message, index) => (
              <p className={message.role} key={`${message.role}-${index}`}>
                {message.text}
              </p>
            ))}
          </div>
          <div className="quick-replies">
            <button onClick={() => sendChat(t.quickVillaText)} type="button">
              {t.villaQuote}
            </button>
            <button onClick={() => sendChat(t.quickDealerText)} type="button">
              {t.dealerPrice}
            </button>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendChat();
            }}
          >
            <input
              value={chatText}
              onChange={(event) => setChatText(event.target.value)}
              placeholder={t.chatPlaceholder}
            />
            <button type="submit">{t.send}</button>
          </form>
        </aside>
      ) : null}
    </main>
  );
}
