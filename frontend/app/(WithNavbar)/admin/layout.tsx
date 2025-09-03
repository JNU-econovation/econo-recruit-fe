import AdminTabs from "@/components/admin/AdminTabs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1">
      <div className="flex-1 ml-32 min-w-[46rem] mb-12">
        <AdminTabs />
        {children}
      </div>
    </div>
  );
}
