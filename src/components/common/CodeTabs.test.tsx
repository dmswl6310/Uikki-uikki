import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";
import CodeTabs from "./CodeTabs";

const renderCodeTabs = () =>
  render(
    <ThemeProvider defaultTheme="light" storageKey="code-tabs-test-theme">
      <ToastProvider>
        <CodeTabs
          code={'export const Example = () => <div className="p-4">TS</div>;'}
          codeJs={'export const Example = () => <div className="p-4">JS</div>;'}
          htmlCode={'<div class="p-4">HTML</div>'}
        />
      </ToastProvider>
    </ThemeProvider>,
  );

afterEach(cleanup);

describe("CodeTabs", () => {
  it("exposes the selected source language with tab semantics", async () => {
    const user = userEvent.setup();
    renderCodeTabs();

    const htmlTab = screen.getByRole("tab", { name: "HTML" });
    expect(screen.getByRole("tablist", { name: "소스 언어" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "React (TS)" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await user.click(htmlTab);

    expect(htmlTab).toHaveAttribute("aria-selected", "true");
  });

  it("announces whether styles are hidden", async () => {
    const user = userEvent.setup();
    renderCodeTabs();
    const styleToggle = screen.getByRole("button", { name: "스타일 숨기기" });

    expect(styleToggle).toHaveAttribute("aria-pressed", "false");
    await user.click(styleToggle);
    expect(styleToggle).toHaveAttribute("aria-pressed", "true");
  });

  it("provides a keyboard-focusable source code scroll region", () => {
    renderCodeTabs();

    expect(screen.getByRole("region", { name: "소스 코드" })).toHaveAttribute(
      "tabindex",
      "0",
    );
  });
});
