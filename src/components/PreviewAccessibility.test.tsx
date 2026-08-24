import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import PropsTable from "./PropsTable";
import { CustomDataTable } from "@/data/components/blocks/data-table/CustomDataTable";
import { CustomDrawer } from "@/data/components/ui/drawer/CustomDrawer";
import { CustomInput } from "@/data/components/ui/input/CustomInput";
import { CustomModal } from "@/data/components/ui/modal/CustomModal";

afterEach(cleanup);

describe("Preview component accessibility", () => {
  it("keeps a visible label for text inputs after typing", () => {
    render(
      <CustomInput
        label="이메일"
        placeholder="name@example.com"
        type="email"
        disabled={false}
      />,
    );

    expect(screen.getByText("이메일")).toBeVisible();
    expect(screen.getByRole("textbox", { name: "이메일" })).toBeInTheDocument();
  });

  it("makes horizontally scrollable tables keyboard-focusable", () => {
    render(
      <>
        <PropsTable controls={{ size: { type: "number", label: "크기" } }} />
        <CustomDataTable
          columns={[{ key: "name", header: "이름" }]}
          data={[{ name: "Uikki" }]}
          searchable={false}
          selectable={false}
        />
      </>,
    );

    expect(screen.getByRole("region", { name: "Props 표" })).toHaveAttribute(
      "tabindex",
      "0",
    );
    expect(screen.getByRole("region", { name: "데이터 표" })).toHaveAttribute(
      "tabindex",
      "0",
    );
  });

  it("cycles focus inside an open drawer", async () => {
    const user = userEvent.setup();
    render(
      <CustomDrawer trigger={<button type="button">열기</button>}>
        <button type="button">첫 작업</button>
        <button type="button">마지막 작업</button>
      </CustomDrawer>,
    );

    await user.click(screen.getByRole("button", { name: "열기" }));
    const closeButtons = screen.getAllByRole("button", { name: "드로어 닫기" });
    const panelCloseButton = closeButtons[1];
    const lastAction = screen.getByRole("button", { name: "마지막 작업" });

    lastAction.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(panelCloseButton).toHaveFocus();

    panelCloseButton.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(lastAction).toHaveFocus();
  });

  it("does not claim modal behavior for an inline preview dialog", () => {
    render(
      <CustomModal
        title="확인"
        description="미리보기"
        confirmText="확인"
        modal={false}
      />,
    );

    expect(screen.getByRole("dialog")).not.toHaveAttribute("aria-modal");
  });
});
