import { ApplicantPaginationParams } from "@/src/hooks/applicant/useApplicantPaginationParams";
import Link from "next/link";

interface PageNavbarComponentProps {
  page: number;
  url: string;
  query: Partial<ApplicantPaginationParams>;
  maxLength: number;
}

const PageNavbarComponent = ({
  page,
  url,
  query,
  maxLength,
}: PageNavbarComponentProps) => {
  return (
    <div className="flex w-full justify-end gap-4 mt-16">
      {Array.from({ length: maxLength }).map((_, i) => (
        <Link
          key={i}
          href={{ pathname: url, query: { ...query, page: i + 1 } }}
          className={i + 1 === page ? "p-3" : "text-secondary-100 p-3"}
        >
          {i + 1}
        </Link>
      ))}
    </div>
  );
};

export default PageNavbarComponent;
