import { useEffect } from "react";

type SEOProps = {
  title: string;
  description?: string;
};

const SITE_URL = "https://uikki.vercel.app";

const updateMeta = (
  selector: string,
  attribute: "name" | "property",
  key: string,
  content: string,
) => {
  let meta = document.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const updateCanonical = (href: string) => {
  let canonical = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = href;
};

export const useSEO = ({ title, description }: SEOProps) => {
  useEffect(() => {
    const baseTitle = "Uikki Gallery";
    document.title = title === baseTitle ? title : `${title} | ${baseTitle}`;

    if (description) {
      updateMeta(
        'meta[name="description"]',
        "name",
        "description",
        description,
      );
      updateMeta(
        'meta[property="og:description"]',
        "property",
        "og:description",
        description,
      );
    }

    updateMeta(
      'meta[property="og:title"]',
      "property",
      "og:title",
      document.title,
    );

    const canonicalUrl = new URL(window.location.pathname, SITE_URL).href;
    updateCanonical(canonicalUrl);
    updateMeta(
      'meta[property="og:url"]',
      "property",
      "og:url",
      canonicalUrl,
    );
  }, [title, description]);
};
