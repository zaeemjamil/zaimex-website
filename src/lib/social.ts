import { siteConfig } from "@/config/site";

/** Builds the wa.me deep link (with prefilled message) from the central site config. */
export function getWhatsAppHref(): string {
  const { whatsappNumber, whatsappMessage } = siteConfig.contact;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
}
