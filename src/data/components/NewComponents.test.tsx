import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CustomDataTable } from "@/data/components/blocks/data-table/CustomDataTable";
import { CustomAdminDashboard } from "@/data/components/templates/admin-dashboard/CustomAdminDashboard";
import { CustomCheckbox } from "@/data/components/ui/checkbox/CustomCheckbox";
import { CustomDropdownMenu } from "@/data/components/ui/dropdown-menu/CustomDropdownMenu";
import { CustomRadioGroup } from "@/data/components/ui/radio-group/CustomRadioGroup";
import { CustomSelect } from "@/data/components/ui/select/CustomSelect";
import { CustomSkeleton } from "@/data/components/ui/skeleton/CustomSkeleton";

describe("new form components", () => {
  it("supports native checkbox, radio and select interactions", async () => {
    const user = userEvent.setup();
    render(
      <>
        <CustomCheckbox label="업데이트 수신" />
        <CustomRadioGroup
          label="요금제"
          options={[
            { value: "starter", label: "Starter" },
            { value: "pro", label: "Pro" },
          ]}
        />
        <CustomSelect
          label="지역"
          options={[
            { value: "seoul", label: "서울" },
            { value: "busan", label: "부산" },
          ]}
        />
      </>,
    );

    await user.click(screen.getByRole("checkbox", { name: "업데이트 수신" }));
    await user.click(screen.getByRole("radio", { name: "Pro" }));
    await user.selectOptions(
      screen.getByRole("combobox", { name: "지역" }),
      "busan",
    );

    expect(
      screen.getByRole("checkbox", { name: "업데이트 수신" }),
    ).toBeChecked();
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    expect(screen.getByRole("combobox", { name: "지역" })).toHaveValue("busan");
  });

  it("announces skeleton loading and limits repeated placeholders", () => {
    const { container } = render(
      <CustomSkeleton variant="list" count={99} animated={false} />,
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "콘텐츠를 불러오는 중입니다.",
    );
    expect(
      container.querySelector('[aria-hidden="true"]')?.children,
    ).toHaveLength(5);
  });
});

describe("dropdown menu", () => {
  it("supports keyboard opening, navigation, selection and focus restoration", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <CustomDropdownMenu
        label="프로젝트 작업"
        items={[
          { id: "open", label: "열기" },
          { id: "disabled", label: "사용 불가", disabled: true },
          { id: "archive", label: "보관" },
        ]}
        onSelect={onSelect}
      />,
    );

    const trigger = screen.getByRole("button", { name: "프로젝트 작업" });
    trigger.focus();
    await user.keyboard("{ArrowDown}");

    const firstItem = await screen.findByRole("menuitem", { name: "열기" });
    await waitFor(() => expect(firstItem).toHaveFocus());
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "보관" })).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(onSelect).toHaveBeenCalledWith("archive");
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});

describe("data table block", () => {
  const rows = [
    { id: "1", name: "알파", amount: 3000 },
    { id: "2", name: "베타", amount: 1000 },
    { id: "3", name: "감마", amount: 2000 },
  ];

  it("filters, sorts, selects and paginates rows", async () => {
    const user = userEvent.setup();
    render(
      <CustomDataTable
        title="주문"
        columns={[
          { key: "name", header: "이름", sortable: true },
          { key: "amount", header: "금액", sortable: true },
        ]}
        data={rows}
        pageSize={2}
      />,
    );

    await user.click(screen.getByRole("button", { name: /금액/ }));
    const bodyRows = screen.getAllByRole("row").slice(1);
    expect(bodyRows[0]).toHaveTextContent("베타");

    await user.click(
      screen.getByRole("checkbox", { name: "현재 페이지의 모든 행 선택" }),
    );
    expect(screen.getByText(/2개 선택/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "다음" }));
    expect(screen.getByText("2 / 2 페이지")).toBeInTheDocument();

    const search = screen.getByRole("searchbox", { name: "테이블 검색" });
    await user.type(search, "감마");
    expect(screen.getByText("감마")).toBeInTheDocument();
    expect(screen.queryByText("알파")).not.toBeInTheDocument();
    expect(screen.getByText("1 / 1 페이지")).toBeInTheDocument();
  });
});

describe("admin dashboard template", () => {
  it("updates the reporting period inside the composed template", async () => {
    const user = userEvent.setup();
    render(<CustomAdminDashboard period="30일" />);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "조회 기간" }),
      "7일",
    );

    expect(screen.getByText("최근 7일 일별 결제 금액")).toBeInTheDocument();
  });
});
