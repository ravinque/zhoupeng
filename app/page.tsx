"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useMemo, useState } from "react";

type Region = "west" | "middleEast";
type QuoteItem = {
  id: string;
  title: string;
  zone: string;
  priceWest: number;
  priceMe: number;
};
type ChatMessage = {
  role: "agent" | "customer";
  text: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const products: Array<
  QuoteItem & {
    cn: string;
    summary: string;
    image: string;
    specs: string[];
    badge: string;
  }
> = [
  {
    id: "door",
    title: "Smart Door System",
    cn: "门系统",
    zone: "Entry & room doors",
    summary:
      "Flat-frame doors with concealed hinges, magnetic locks, acoustic seals, and access-ready hardware.",
    image: "/zp/home-01.jpg",
    specs: ["Hidden hinge", "Smart lock ready", "Fire-rated option"],
    priceWest: 1280,
    priceMe: 4850,
    badge: "Security",
  },
  {
    id: "wall",
    title: "Integrated Wall System",
    cn: "墙系统",
    zone: "Living room, office, villa corridors",
    summary:
      "Wall panels designed for lighting rails, switches, media storage, sensors, and invisible cable routing.",
    image: "/zp/home-02.jpg",
    specs: ["Low-V track", "Sensor pockets", "Humidity-resistant board"],
    priceWest: 168,
    priceMe: 620,
    badge: "Per sqm",
  },
  {
    id: "cabinet",
    title: "Intelligent Cabinet Suite",
    cn: "柜系统",
    zone: "Wardrobe, storage, cloakroom",
    summary:
      "Custom cabinets with LED scenes, charging drawers, ventilation, and flexible storage planning.",
    image: "/zp/cabinet.jpg",
    specs: ["LED scene strips", "Charging drawer", "Modular organizers"],
    priceWest: 2900,
    priceMe: 10900,
    badge: "Custom",
  },
  {
    id: "kitchen",
    title: "Smart Kitchen System",
    cn: "橱系统",
    zone: "Kitchen and island areas",
    summary:
      "Clean-line kitchen cabinetry with appliance towers, water-safe materials, and connected lighting scenes.",
    image: "/zp/kitchen.jpg",
    specs: ["Appliance tower", "Water-safe panels", "Stone-ready counters"],
    priceWest: 6800,
    priceMe: 25500,
    badge: "Best seller",
  },
  {
    id: "hardware",
    title: "Hardware & Control Kit",
    cn: "五金系统",
    zone: "Hinges, rails, locks, control modules",
    summary:
      "Hardware packs for soft-close motion, hidden rails, smart locks, power strips, and scene switches.",
    image: "/zp/kitchen-detail-01.jpg",
    specs: ["Soft-close motion", "Scene switch", "Multi-region plug packs"],
    priceWest: 390,
    priceMe: 1450,
    badge: "Kit",
  },
  {
    id: "supporting",
    title: "Whole-home Supporting System",
    cn: "配套系统",
    zone: "Lighting, display, after-sales package",
    summary:
      "Design, installation documents, remote acceptance, and after-sales packs for overseas projects.",
    image: "/zp/kitchen-detail-02.jpg",
    specs: ["BOM package", "3D drawings", "Remote acceptance"],
    priceWest: 980,
    priceMe: 3650,
    badge: "Service",
  },
];

const regions = {
  west: {
    name: "Europe & America",
    short: "EU / US",
    currency: "USD / EUR / GBP",
    pricePrefix: "$",
    standards: ["CE / UKCA / FCC planning", "110-240V power coordination", "English design documents"],
    support: "English support, export quotation, remote design review",
    intro: "Designed for villas, apartments, dealers, builders, and design studios across Europe and North America.",
    formCountry: "United States",
    customerLine: "Send a floor plan and room photos to receive a quote within 48 hours.",
  },
  middleEast: {
    name: "Middle East & GCC",
    short: "ME / GCC",
    currency: "AED / SAR / USD",
    pricePrefix: "AED ",
    standards: ["GCC / SASO-ready specification", "Heat and dust tolerance planning", "Arabic + English sales flow"],
    support: "RTL interface, GCC import planning, villa project scheduling",
    intro: "Built for Gulf villas, showrooms, contractors, hospitality projects, and high-temperature climates.",
    formCountry: "United Arab Emirates",
    customerLine: "ارسل المخطط والصور، وسيقوم فريقنا بتجهيز عرض السعر خلال 48 ساعة.",
  },
};

const starterMessages: ChatMessage[] = [
  {
    role: "agent",
    text: "Hi, this is Zoupeng Smart Living. Share your project type, country, and floor plan size for a fast quote.",
  },
];

export default function Home() {
  const [region, setRegion] = useState<Region>("west");
  const [quote, setQuote] = useState<QuoteItem[]>([]);
  const [selected, setSelected] = useState(products[3]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [sessionEmail, setSessionEmail] = useState(() =>
    typeof window === "undefined" ? "" : window.localStorage.getItem("zp-session-email") ?? "",
  );
  const [quoteStatus, setQuoteStatus] = useState("");
  const [chatText, setChatText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);

  const regionData = regions[region];
  const dir = region === "middleEast" ? "rtl" : "ltr";
  const quoteTotal = quote.reduce(
    (sum, item) => sum + (region === "middleEast" ? item.priceMe : item.priceWest),
    0,
  );

  const displayPrice = useMemo(
    () => (item: QuoteItem) => {
      const value = region === "middleEast" ? item.priceMe : item.priceWest;
      return `${regionData.pricePrefix}${value.toLocaleString("en-US")}`;
    },
    [region, regionData.pricePrefix],
  );

  const addToQuote = (product: QuoteItem) => {
    setQuote((current) =>
      current.some((item) => item.id === product.id) ? current : [...current, product],
    );
    setSelected(products.find((item) => item.id === product.id) ?? products[3]);
  };

  const removeFromQuote = (id: string) => {
    setQuote((current) => current.filter((item) => item.id !== id));
  };

  const submitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "guest@zhoupeng-home.com");
    window.localStorage.setItem("zp-session-email", email);
    setSessionEmail(email);
    setIsLoginOpen(false);
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    window.localStorage.setItem(
      "zp-last-quote",
      JSON.stringify({
        region,
        quoteItems: quote.map((item) => item.id),
        submittedAt: new Date().toISOString(),
        ...data,
      }),
    );
    setQuoteStatus("Quote request saved. Customer service will respond within 48 hours.");
  };

  const sendChat = (text = chatText) => {
    const cleanText = text.trim();
    if (!cleanText) return;
    setMessages((current) => [
      ...current,
      { role: "customer", text: cleanText },
      {
        role: "agent",
        text: "Received. Please attach room photos, floor plan size, and target country in the quote form for a precise BOM.",
      },
    ]);
    setChatText("");
  };

  return (
    <main className="site-shell" dir={dir}>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Zoupeng Smart Living home">
          <img src={asset("/zp/logo.png")} alt="" />
          <span>
            <strong>Zoupeng</strong>
            <small>Smart Living</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#products">Products</a>
          <a href="#company">Company</a>
          <a href="#solutions">Regions</a>
          <a href="#quote">Order</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="top-actions">
          <div className="region-switch" aria-label="Region switcher">
            {(["west", "middleEast"] as Region[]).map((key) => (
              <button
                className={region === key ? "active" : ""}
                key={key}
                onClick={() => setRegion(key)}
                type="button"
              >
                {regions[key].short}
              </button>
            ))}
          </div>
          <button className="icon-button" onClick={() => setIsLoginOpen(true)} type="button">
            {sessionEmail ? "Account" : "Login"}
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-image">
          <img src={asset("/zp/hero.jpg")} alt="Modern smart home living room with integrated cabinetry" />
          <div className="hero-chip">
            <span>Project region</span>
            <strong>{regionData.name}</strong>
            <small>{regionData.currency}</small>
          </div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Fujian custom smart home manufacturer</p>
          <h1>Whole-home smart systems for villas, showrooms, and premium projects.</h1>
          <p>
            Built from Zoupeng door, wall, cabinet, kitchen, hardware, and supporting
            systems. The buying flow is modeled after global custom-home brands, with
            direct consultation, catalogue-style products, and fast quotation.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#quote">
              Start an order
            </a>
            <button className="button secondary" onClick={() => setIsServiceOpen(true)} type="button">
              Contact service
            </button>
          </div>
          <div className="proof-strip" aria-label="Company highlights">
            <span>
              <strong>2012</strong>
              Founded
            </span>
            <span>
              <strong>70 mu</strong>
              Production base
            </span>
            <span>
              <strong>20,000+ sqm</strong>
              Standard plant
            </span>
          </div>
        </div>
      </section>

      <section className="catalogue" id="products">
        <div className="section-heading">
          <p className="eyebrow">Products Center</p>
          <h2>Six product systems for one coordinated smart home order.</h2>
          <p>{regionData.intro}</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <button className="image-button" onClick={() => setSelected(product)} type="button">
                <img src={asset(product.image)} alt={`${product.title} preview`} />
                <span>{product.badge}</span>
              </button>
              <div className="product-body">
                <small>{product.cn}</small>
                <h3>{product.title}</h3>
                <p>{product.summary}</p>
                <ul>
                  {product.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
                <div className="product-foot">
                  <strong>{displayPrice(product)}</strong>
                  <button onClick={() => addToQuote(product)} type="button">
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-split" id="company">
        <div className="split-copy">
          <p className="eyebrow">Company Homepage</p>
          <h2>Fujian Zoupeng Industrial integrates R&D, design, production, and operation service.</h2>
          <p>
            The manufacturing base is located in Shanghang County, Fujian, with a
            standard factory area of more than 20,000 sqm and a 1,500 sqm office
            building. The team includes technical R&D, design, and after-sales groups
            for custom home projects.
          </p>
          <div className="company-metrics">
            <span>
              <strong>20</strong>
              Technical engineers
            </span>
            <span>
              <strong>10</strong>
              After-sales engineers
            </span>
            <span>
              <strong>6</strong>
              Product systems
            </span>
          </div>
        </div>
        <div className="factory-card">
          <img src={asset("/zp/factory.jpeg")} alt="Zoupeng production and equipment image" />
          <div>
            <span>Equipment brands</span>
            <strong>Jidong, Nanxing, Cangao, Moke, Baitian</strong>
          </div>
        </div>
      </section>

      <section className="solution-band" id="solutions">
        <div className="section-heading compact">
          <p className="eyebrow">Regional System</p>
          <h2>One interface, two market modes.</h2>
          <p>{regionData.support}</p>
        </div>
        <div className="solution-grid">
          {regionData.standards.map((standard) => (
            <article key={standard}>
              <span>{regionData.short}</span>
              <h3>{standard}</h3>
              <p>
                Product selections, quote currency, documents, plugs, and service flow
                adjust to the selected region sales context.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="order-section" id="quote">
        <div className="order-preview">
          <p className="eyebrow">Selected Solution</p>
          <img src={asset(selected.image)} alt={`${selected.title} selected preview`} />
          <div>
            <span>{selected.cn}</span>
            <h2>{selected.title}</h2>
            <p>{selected.summary}</p>
            <strong>{displayPrice(selected)}</strong>
          </div>
        </div>
        <form className="quote-panel" onSubmit={submitQuote}>
          <div className="panel-heading">
            <p className="eyebrow">Contact & Order</p>
            <h2>Request a project quote.</h2>
            <p>{regionData.customerLine}</p>
          </div>
          <div className="quote-list">
            {quote.length === 0 ? (
              <p className="empty-state">Add products from the catalogue, or submit for a whole-home consultation.</p>
            ) : (
              quote.map((item) => (
                <div className="quote-row" key={item.id}>
                  <span>{item.title}</span>
                  <strong>{displayPrice(item)}</strong>
                  <button onClick={() => removeFromQuote(item.id)} type="button" aria-label={`Remove ${item.title}`}>
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="quote-total">
            <span>Estimated starting total</span>
            <strong>
              {quote.length ? `${regionData.pricePrefix}${quoteTotal.toLocaleString("en-US")}` : "Custom"}
            </strong>
          </div>
          <div className="form-grid">
            <label>
              Name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input name="email" required type="email" placeholder="name@company.com" />
            </label>
            <label>
              Country
              <input name="country" defaultValue={regionData.formCountry} required />
            </label>
            <label>
              Phone / WhatsApp
              <input name="phone" required placeholder="+1 / +971 / +966" />
            </label>
            <label>
              Project type
              <select name="projectType" defaultValue="villa">
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="dealer">Dealer showroom</option>
                <option value="hotel">Hotel / commercial</option>
              </select>
            </label>
            <label>
              Budget
              <select name="budget" defaultValue="mid">
                <option value="starter">Below 10,000 USD</option>
                <option value="mid">10,000 - 50,000 USD</option>
                <option value="premium">Above 50,000 USD</option>
              </select>
            </label>
          </div>
          <label>
            Project notes
            <textarea
              name="notes"
              placeholder="Room count, preferred material, floor plan status, target delivery city..."
            />
          </label>
          <button className="button primary full" type="submit">
            Submit order request
          </button>
          {quoteStatus ? <p className="success-message">{quoteStatus}</p> : null}
        </form>
      </section>

      <section className="contact-band" id="contact">
        <div>
          <p className="eyebrow">Customer Service</p>
          <h2>Talk to sales before you order.</h2>
          <p>
            Phone: <a href="tel:05973992099">0597-3992099</a> · Email:{" "}
            <a href="mailto:cathy@shhf2008.com">cathy@shhf2008.com</a>
          </p>
          <p>Address: Lijiaping Industrial Zone, Shanghang County, Fujian Province, China.</p>
        </div>
        <button className="button secondary" onClick={() => setIsServiceOpen(true)} type="button">
          Open service desk
        </button>
      </section>

      <footer className="footer">
        <span>Fujian Zoupeng Industrial Co., Ltd.</span>
        <span>Global smart home mall concept based on public company materials.</span>
      </footer>

      <button className="service-float" onClick={() => setIsServiceOpen(true)} type="button">
        Service
      </button>

      {isLoginOpen ? (
        <div className="modal-backdrop" role="presentation">
          <section className="modal" id="login" role="dialog" aria-modal="true" aria-label="Login">
            <button className="modal-close" onClick={() => setIsLoginOpen(false)} type="button">
              Close
            </button>
            <p className="eyebrow">Login System</p>
            <h2>Access project orders.</h2>
            <p className="muted">
              Demo front-end login for GitHub Pages. Use any email and password to save a local session.
            </p>
            <form onSubmit={submitLogin}>
              <label>
                Email
                <input name="email" required type="email" placeholder="buyer@example.com" />
              </label>
              <label>
                Password
                <input name="password" required type="password" placeholder="Minimum 6 characters" />
              </label>
              <button className="button primary full" type="submit">
                Sign in / register
              </button>
            </form>
            {sessionEmail ? <p className="success-message">Signed in as {sessionEmail}</p> : null}
          </section>
        </div>
      ) : null}

      {isServiceOpen ? (
        <aside className="service-desk" aria-label="Customer service chat">
          <div className="service-head">
            <div>
              <p className="eyebrow">Online Service</p>
              <h2>Zoupeng sales desk</h2>
            </div>
            <button onClick={() => setIsServiceOpen(false)} type="button">
              Close
            </button>
          </div>
          <div className="message-list">
            {messages.map((message, index) => (
              <p className={message.role} key={`${message.role}-${index}`}>
                {message.text}
              </p>
            ))}
          </div>
          <div className="quick-replies">
            <button onClick={() => sendChat("I need a villa whole-home quote.")} type="button">
              Villa quote
            </button>
            <button onClick={() => sendChat("I want dealer pricing and catalogues.")} type="button">
              Dealer price
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
              placeholder="Type your project question..."
            />
            <button type="submit">Send</button>
          </form>
        </aside>
      ) : null}
    </main>
  );
}
