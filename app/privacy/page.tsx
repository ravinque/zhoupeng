"use client";

import { Breadcrumb, CatalogShell } from "../catalog-chrome";
import { common, pick } from "../catalog-data";

export default function PrivacyPage() {
  return <CatalogShell>{({ language }) => <>
    <div className="legal-top"><Breadcrumb language={language} current={pick(common.privacy, language)} /></div>
    <article className="legal-page">
      <p className="eyebrow">{language === "zh" ? "网站说明" : language === "en" ? "WEBSITE NOTICE" : "إشعار الموقع"}</p>
      <h1>{pick(common.privacy, language)}</h1>
      <p>{language === "zh" ? "本说明适用于福建洲鹏实业有限公司网站。最后更新：2026 年 7 月。" : language === "en" ? "This notice applies to the website of Fujian Zhoupeng Industrial Co., Ltd. Last updated: July 2026." : "ينطبق هذا الإشعار على موقع شركة فوجيان تشو بنغ الصناعية المحدودة. آخر تحديث: يوليو 2026."}</p>
      <h2>{language === "zh" ? "我们处理的信息" : language === "en" ? "Information we handle" : "المعلومات التي نتعامل معها"}</h2>
      <p>{language === "zh" ? "网站不会直接保存咨询表单内容。提交时将打开您的邮件应用，由您确认后发送。我们使用邮件中的信息回复咨询、评估项目需求并与您沟通后续事项。" : language === "en" ? "The website does not directly store enquiry-form content. Submitting opens your email application for your review. We use information in the email to respond, assess project requirements and discuss next steps." : "لا يخزن الموقع محتوى نموذج الاستفسار مباشرة. عند الإرسال يفتح تطبيق البريد لمراجعتك. نستخدم معلومات الرسالة للرد وتقييم متطلبات المشروع ومناقشة الخطوات التالية."}</p>
      <h2>{language === "zh" ? "语言偏好" : language === "en" ? "Language preference" : "تفضيل اللغة"}</h2>
      <p>{language === "zh" ? "网站会在您的浏览器本地存储所选语言。此信息不用于广告或跨站跟踪。" : language === "en" ? "Your selected language is stored locally in your browser. It is not used for advertising or cross-site tracking." : "يُحفظ اختيار اللغة محلياً في متصفحك ولا يُستخدم للإعلانات أو التتبع عبر المواقع."}</p>
      <h2>{language === "zh" ? "站内客服消息" : language === "en" ? "In-site support messages" : "رسائل خدمة العملاء داخل الموقع"}</h2>
      <p>{language === "zh" ? "启用站内客服后，您主动发送的消息、随机会话标识、页面地址和语言偏好会存储在洲鹏服务器，并通过 WhatsApp Business Platform 转发给项目顾问，仅用于回复本次咨询。访问令牌不会发送到浏览器。您也可以不使用该功能，改用邮件或项目表单联系。" : language === "en" ? "When in-site support is enabled, messages you choose to send, a random session identifier, the page address and language preference are stored on Zhoupeng's server and relayed to a project advisor through the WhatsApp Business Platform solely to answer the enquiry. Access tokens are never sent to the browser. You may instead contact us by email or the project form." : "عند تفعيل خدمة العملاء داخل الموقع، تُخزن الرسائل التي ترسلها ومعرّف جلسة عشوائي وعنوان الصفحة وتفضيل اللغة على خادم تشو بنغ، وتُنقل إلى مستشار المشروع عبر منصة WhatsApp Business للرد على الاستفسار فقط. لا تُرسل رموز الوصول إلى المتصفح، ويمكنك استخدام البريد الإلكتروني أو نموذج المشروع بدلًا من ذلك."}</p>
      <h2>{pick(common.contact, language)}</h2>
      <p><a href="mailto:sales@zhoupengindustry.com">sales@zhoupengindustry.com</a></p>
    </article>
  </>}</CatalogShell>;
}
