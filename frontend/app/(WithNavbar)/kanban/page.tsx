import { redirect } from "next/navigation";
import { CURRENT_GENERATION } from "@/src/constants";

const ApplicationPage = () => redirect(`/kanban/${CURRENT_GENERATION}`);

export default ApplicationPage;
