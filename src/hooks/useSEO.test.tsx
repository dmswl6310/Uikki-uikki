import { render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useSEO } from "./useSEO";

const SEOFixture = () => {
  useSEO({
    title: "Button",
    description: "Button component",
  });

  return null;
};

describe("useSEO", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    window.history.replaceState({}, "", "/components/button?tab=source#react");
  });

  it("현재 경로를 canonical과 Open Graph URL에 반영한다", async () => {
    render(<SEOFixture />);

    await waitFor(() => {
      expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://uikki.vercel.app/components/button",
      );
      expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
        "content",
        "https://uikki.vercel.app/components/button",
      );
    });
  });
});
