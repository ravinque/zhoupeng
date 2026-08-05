"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Lang = "zh" | "en" | "ar";
type Connection = "checking" | "online" | "offline";
type Message = { id: string; role: "visitor" | "advisor"; text: string; createdAt: string };

const copy = {
  zh: {
    title: "洲鹏项目顾问",
    status: "WhatsApp 商务客服",
    welcome: "您好，欢迎咨询洲鹏定制家居。请告诉我们项目所在国家或城市、空间类型和预计面积。",
    checking: "正在连接项目顾问…",
    online: "安全连接已就绪",
    offline: "站内实时会话正在配置",
    offlineText: "当前尚未接通 WhatsApp Business API。您可以先通过 WhatsApp 留言，或提交项目资料，我们不会把未发送的消息标记为成功。",
    placeholder: "输入项目需求…",
    send: "发送",
    continue: "在 WhatsApp 中继续",
    project: "提交项目资料",
    sent: "消息已送达项目顾问。顾问回复后会显示在这里。",
    failed: "消息未发送，请稍后重试或使用 WhatsApp。",
    privacy: "发送即表示您同意我们仅为回复本次咨询处理该消息。",
    close: "关闭站内客服",
    open: "打开 WhatsApp 站内客服",
  },
  en: {
    title: "Zhoupeng Project Advisor",
    status: "WhatsApp business support",
    welcome: "Welcome to Zhoupeng. Please share the project country or city, space type and approximate area.",
    checking: "Connecting to a project advisor…",
    online: "Secure connection ready",
    offline: "In-site live chat is being configured",
    offlineText: "The WhatsApp Business API is not connected yet. You can continue in WhatsApp or submit a project brief. An unsent message will never be shown as delivered.",
    placeholder: "Describe your project…",
    send: "Send",
    continue: "Continue in WhatsApp",
    project: "Submit project brief",
    sent: "Your message has reached our project advisor. Replies will appear here.",
    failed: "The message was not sent. Please retry or use WhatsApp.",
    privacy: "By sending, you agree that we may process this message only to answer this enquiry.",
    close: "Close in-site support",
    open: "Open WhatsApp in-site support",
  },
  ar: {
    title: "مستشار مشاريع تشو بنغ",
    status: "دعم الأعمال عبر واتساب",
    welcome: "مرحبًا بكم في تشو بنغ. يرجى مشاركة دولة أو مدينة المشروع ونوع المساحة والمساحة التقريبية.",
    checking: "جارٍ الاتصال بمستشار المشروع…",
    online: "الاتصال الآمن جاهز",
    offline: "يجري إعداد المحادثة المباشرة داخل الموقع",
    offlineText: "واجهة WhatsApp Business غير متصلة حاليًا. يمكنك المتابعة عبر واتساب أو إرسال ملخص المشروع، ولن نعرض أي رسالة غير مرسلة على أنها وصلت.",
    placeholder: "اكتب متطلبات المشروع…",
    send: "إرسال",
    continue: "المتابعة عبر واتساب",
    project: "إرسال ملخص المشروع",
    sent: "وصلت رسالتك إلى مستشار المشروع، وستظهر الردود هنا.",
    failed: "لم تُرسل الرسالة. يرجى المحاولة لاحقًا أو استخدام واتساب.",
    privacy: "بالإرسال، توافق على معالجة الرسالة فقط للرد على هذا الاستفسار.",
    close: "إغلاق خدمة العملاء",
    open: "فتح خدمة واتساب داخل الموقع",
  },
} as const;

const endpoint = process.env.NEXT_PUBLIC_WHATSAPP_CHAT_ENDPOINT ?? "/api/whatsapp";

function identity() {
  const existing = localStorage.getItem("zhoupeng-chat-identity");
  if (existing) {
    try {
      const value = JSON.parse(existing) as { sessionId?: string; clientToken?: string };
      if (value.sessionId && value.clientToken) return value as { sessionId: string; clientToken: string };
    } catch { localStorage.removeItem("zhoupeng-chat-identity"); }
  }
  const value = { sessionId: crypto.randomUUID(), clientToken: crypto.randomUUID() };
  localStorage.setItem("zhoupeng-chat-identity", JSON.stringify(value));
  return value;
}

export function WhatsAppChat({ language, fallbackHref }: { language: Lang; fallbackHref: string }) {
  const t = copy[language];
  const [open, setOpen] = useState(false);
  const [connection, setConnection] = useState<Connection>("checking");
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    let active = true;
    fetch(`${endpoint}/health`, { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { configured?: boolean }) => active && setConnection(data.configured ? "online" : "offline"))
      .catch(() => active && setConnection("offline"));
    return () => { active = false; };
  }, [open]);

  useEffect(() => {
    if (!open || connection !== "online") return;
    let active = true;
    const poll = async () => {
      try {
        const current = identity();
        const query = new URLSearchParams({ sessionId: current.sessionId });
        const response = await fetch(`${endpoint}/messages?${query}`, { headers: { Accept: "application/json", "X-Chat-Token": current.clientToken } });
        if (!response.ok) return;
        const data = await response.json() as { messages?: Message[] };
        if (active && data.messages) setMessages(data.messages);
      } catch { /* A later poll can recover without interrupting the visitor. */ }
    };
    void poll();
    const timer = window.setInterval(poll, 4000);
    return () => { active = false; window.clearInterval(timer); };
  }, [connection, open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || sending || connection !== "online") return;
    setSending(true);
    setNotice("");
    try {
      const current = identity();
      const response = await fetch(`${endpoint}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...current, message: text, language, pageUrl: window.location.href }),
      });
      if (!response.ok) throw new Error("send failed");
      const data = await response.json() as { message?: Message };
      if (data.message) setMessages((items) => [...items.filter((item) => item.id !== data.message?.id), data.message!]);
      setDraft("");
      setNotice(t.sent);
    } catch {
      setNotice(t.failed);
      setConnection("offline");
    } finally {
      setSending(false);
    }
  }

  return <aside className="contact-dock" aria-label={t.title}>
    {open && <section className="whatsapp-panel" id="whatsapp-chat-panel" data-connection={connection} role="dialog" aria-modal="false" aria-labelledby="whatsapp-chat-title">
      <header>
        <div className="whatsapp-avatar" aria-hidden="true">ZP</div>
        <span><strong id="whatsapp-chat-title">{t.title}</strong><small>{t.status}</small></span>
        <button type="button" onClick={() => setOpen(false)} aria-label={t.close}>×</button>
      </header>
      <div className="whatsapp-chat-status" data-state={connection}>
        <i aria-hidden="true" />{connection === "checking" ? t.checking : connection === "online" ? t.online : t.offline}
      </div>
      <div className="whatsapp-messages" ref={listRef}>
        <p className="whatsapp-day">ZHOUPENG</p>
        <article className="whatsapp-bubble advisor">{t.welcome}</article>
        {messages.map((message) => <article className={`whatsapp-bubble ${message.role}`} key={message.id}>
          {message.text}<time>{new Date(message.createdAt).toLocaleTimeString(language === "zh" ? "zh-CN" : language === "ar" ? "ar" : "en", { hour: "2-digit", minute: "2-digit" })}</time>
        </article>)}
        {connection === "offline" && <div className="whatsapp-offline">
          <strong>{t.offline}</strong><p>{t.offlineText}</p>
          <a href={fallbackHref} target="_blank" rel="noreferrer">{t.continue} ↗</a>
          <a href="#contact" onClick={() => setOpen(false)}>{t.project}</a>
        </div>}
      </div>
      {connection !== "offline" && <form className="whatsapp-composer" onSubmit={submit}>
        <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={t.placeholder} rows={1} maxLength={1000} disabled={connection !== "online" || sending} aria-label={t.placeholder} />
        <button type="submit" disabled={!draft.trim() || connection !== "online" || sending} aria-label={t.send}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 3 18 9-18 9 4-9-4-9Zm4 9h14" /></svg>
        </button>
      </form>}
      {notice && <p className="whatsapp-notice" aria-live="polite">{notice}</p>}
      <p className="whatsapp-privacy">{t.privacy}</p>
    </section>}
    <button className="contact-dock-whatsapp" type="button" aria-controls="whatsapp-chat-panel" aria-expanded={open} onClick={() => setOpen((value) => !value)} aria-label={t.open}>
      <span>WhatsApp</span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="11.5" r="8.2"/><path d="m6.2 20.4 1-3.1"/><path className="whatsapp-phone" d="M9.1 7.4c.3-.4.6-.4.9-.1l1 1.7c.2.3.1.6-.1.9l-.7.8c.8 1.5 1.9 2.6 3.4 3.4l.8-.7c.3-.2.6-.3.9-.1l1.7 1c.3.2.4.6.1.9-.7 1-1.7 1.5-2.9 1.2-3.6-.9-6.5-3.8-7.4-7.4-.2-1.1.3-2.1 1.3-2.8Z"/></svg>
    </button>
    <button className="contact-dock-service" type="button" aria-expanded={open} onClick={() => setOpen(true)} aria-label={t.open}>
      <span>{t.title}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><rect x="2.7" y="12" width="4" height="6" rx="2"/><rect x="17.3" y="12" width="4" height="6" rx="2"/><path d="M18 18c-.8 2-2.5 3-5 3h-1"/></svg>
    </button>
  </aside>;
}
