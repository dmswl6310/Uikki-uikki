import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { RegisteredComponentInfo } from "@/types/component.types";
import Example from "./Example";

const Probe = ({
  label,
  enabled,
  count,
}: {
  label: string;
  enabled: boolean;
  count: number;
}) => <output>{`${label}|${enabled ? "on" : "off"}|${count}`}</output>;

const componentInfo: RegisteredComponentInfo = {
  id: "probe",
  name: "Probe",
  category: "ui",
  description: "Playground control test component",
  updatedAt: new Date("2026-08-20"),
  code: "",
  codeJs: "",
  Component: Probe,
  examples: [{ label: "기본", enabled: false, count: 1 }],
  propControls: {
    label: { type: "string", label: "라벨" },
    enabled: { type: "boolean", label: "활성 상태" },
    count: { type: "number", label: "개수", min: 0, max: 10 },
  },
};

describe("Example playground", () => {
  it("updates string, boolean and number props from metadata controls", async () => {
    const user = userEvent.setup();
    render(
      <Example
        componentInfo={componentInfo}
        exampleData={componentInfo.examples[0]}
      />,
    );

    await user.clear(screen.getByLabelText("라벨"));
    await user.type(screen.getByLabelText("라벨"), "변경");
    await user.click(screen.getByLabelText("활성 상태"));
    await user.clear(screen.getByLabelText("개수"));
    await user.type(screen.getByLabelText("개수"), "4");

    expect(screen.getByText("변경|on|4")).toBeInTheDocument();
  });
});
