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
  it("opens drawers outside clipped previews and restores focus on close", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <div className="dark" style={{ overflow: "hidden", transform: "translateY(0)" }}>
        <CustomDrawer trigger={<button>열기</button>} title="설정" />
      </div>,
    );
    const trigger = screen.getByRole("button", { name: "열기" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "설정" });
    expect(container).not.toContainElement(dialog);
    expect(document.body).toContainElement(dialog);
    expect(dialog.closest(".dark")).not.toBeNull();
    expect(dialog).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).not.toBe("hidden");
  });

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
