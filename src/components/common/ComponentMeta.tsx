import type { RegisteredComponentInfo } from "@/types/component.types";

const ComponentMeta = ({ info }: { info: RegisteredComponentInfo }) => {
  return (
    <div>
      <p className="text-sm text-gray-700">{info.description}</p>
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50">
        <img
          src={info.image}
          alt={`${info.name}`}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex justify-between">
        {info.tags?.length ? (
          <p className="-mt-2 text-xs text-gray-500 italic">
            {info.tags.join(", ")}
          </p>
        ) : (
          <span />
        )}
        <p className="-mt-2 text-xs text-gray-500 italic">
          {info.updatedAt.toDateString()}
        </p>
      </div>
    </div>
  );
};

export default ComponentMeta;
