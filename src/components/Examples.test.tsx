import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import type { RegisteredComponentInfo } from "@/types/component.types";
import Examples from "./Examples";

const Probe = ({ label }: { label: string }) => <span>{label}</span>;

const componentInfo: RegisteredComponentInfo = {
  id: "probe",
  name: "Probe",
  category: "ui",
  description: "Preview Lab test component",
  updatedAt: new Date("2026-08-24"),
  code: "",
  codeJs: "",
  Component: Probe,
  examples: [{ label: "첫 번째" }, { label: "두 번째" }],
  propControls: {
    label: { type: "string", label: "라벨" },
  },
};

afterEach(cleanup);

describe("Examples Preview Lab", () => {
  it("renders one shared lab description for multiple examples", () => {
    render(
      <Examples componentInfo={componentInfo} examples={componentInfo.examples} />,
    );

    expect(screen.getAllByText("Preview Lab")).toHaveLength(1);
    expect(
      screen.getAllByText(
        "테마와 미리보기 폭을 바꿔 모든 예제를 한 번에 확인해보세요.",
      ),
    ).toHaveLength(1);
  });

  it("applies the selected preview width to every example", async () => {
    const user = userEvent.setup();
    render(
      <Examples componentInfo={componentInfo} examples={componentInfo.examples} />,
    );

    await user.click(screen.getByRole("button", { name: "모바일 390px" }));

    expect(
      screen.getAllByRole("region", { name: "컴포넌트 미리보기 · 모바일 390px" }),
    ).toHaveLength(2);
  });
});
