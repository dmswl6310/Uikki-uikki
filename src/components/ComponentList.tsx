import ComponentCard from "./ComponentCard";
import type { RegisteredComponentInfo } from "@/types/component.types";

const ComponentList = ({ items }: { items: RegisteredComponentInfo[] }) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => (
        <li key={item.id}>
          <ComponentCard info={item} priority={index < 4} />
        </li>
      ))}
    </ul>
  );
};

export default ComponentList;
