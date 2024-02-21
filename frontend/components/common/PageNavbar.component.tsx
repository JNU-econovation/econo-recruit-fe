const PageNavbarComponent = ({
  page,
  url,
  maxLength,
}: {
  page: number;
  url: string;
  maxLength: number;
}) => {
  return (
    <div className="flex w-full justify-end gap-4 mt-16">
      {Array.from({ length: maxLength }).map((_, i) => (
        <a
          key={i}
          href={url + `&page=${i + 1}`}
          className={i + 1 === page ? "p-3" : "text-secondary-100 p-3"}
        >
          {i + 1}
        </a>
      ))}
    </div>
  );
};

export default PageNavbarComponent;
