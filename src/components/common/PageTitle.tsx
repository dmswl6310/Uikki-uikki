const PageTitle = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
        {title}
      </h1>
      {description && (
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
};

export default PageTitle;
