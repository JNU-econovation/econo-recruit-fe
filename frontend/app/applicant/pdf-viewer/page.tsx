import { dehydrate, Hydrate } from "@tanstack/react-query";
import getQueryClient from "@/src/functions/getQueryClient";
import { getApplicationById } from "@/src/apis/applicant";
import ApplicationPdfViewer from "@/components/applicant/PdfViewer";

interface ApplicationPdfViewerPageProps {
  searchParams: {
    applicantId: string;
  };
}

const ApplicationPdfViewerPage = async ({
  searchParams,
}: ApplicationPdfViewerPageProps) => {
  const { applicantId } = searchParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["applicant", applicantId],
    queryFn: () => getApplicationById(applicantId),
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydrateState}>
      <ApplicationPdfViewer />
    </Hydrate>
  );
};

export default ApplicationPdfViewerPage;
