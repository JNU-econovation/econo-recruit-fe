import { CURRENT_GENERATION } from "@/src/constants";
import { redirect } from "next/navigation";

const AdminPage = () => redirect(`/admin/${CURRENT_GENERATION}`);

export default AdminPage;
