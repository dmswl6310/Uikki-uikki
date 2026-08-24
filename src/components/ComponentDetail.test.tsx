import { act, cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { RegisteredComponentInfo } from "@/types/component.types";
import { ThemeProvider } from "./common/ThemeProvider";
import { ToastProvider } from "./common/ToastProvider";
import ComponentDetail from "./ComponentDetail";

const { loadComponentMock } = vi.hoisted(() => ({
  loadComponentMock: vi.fn(),
}));

vi.mock("@/data/componentLoaders", () => ({
  loadComponent: loadComponentMock,
}));

const detail: RegisteredComponentInfo = {
  id: "probe",
  name: "Probe",
  category: "ui",
  description: "Deferred source test component",
  updatedAt: new Date("2026-08-24"),
  code: "export const Probe = () => <button>미리보기</button>;",
  codeJs: "export const Probe = () => <button>미리보기</button>;",
  Component: () => <button type="button">미리보기</button>,
  examples: [{}],
};

let intersectionCallback: IntersectionObserverCallback | undefined;

class TestIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "400px";
  readonly thresholds = [0];

  constructor(callback: IntersectionObserverCallback) {
    intersectionCallback = callback;
  }

  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
}

beforeEach(() => {
  loadComponentMock.mockResolvedValue(detail);
  intersectionCallback = undefined;
  vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("ComponentDetail source loading", () => {
  it("loads the source renderer only when its section approaches the viewport", async () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="detail-test-theme">
        <ToastProvider>
          <MemoryRouter initialEntries={["/components/probe"]}>
            <Routes>
              <Route path="/components/:id" element={<ComponentDetail />} />
            </Routes>
          </MemoryRouter>
        </ToastProvider>
      </ThemeProvider>,
    );

    await screen.findByRole("heading", { name: "Probe" });
    expect(screen.queryByRole("tablist", { name: "소스 언어" })).not.toBeInTheDocument();

    act(() => {
      intersectionCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(screen.getByRole("status")).toHaveTextContent(
      "소스 뷰어를 준비하는 중입니다",
    );
  });
});
