import { redirect } from "next/navigation";
import { CURRENT_GENERATION } from "@/src/constants";

const InterviewPage = () => redirect(`/interview/${CURRENT_GENERATION}`);

export default InterviewPage;
