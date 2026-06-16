import "../../styles/globals.css";
import AdminNavbar from "../../components/AdminNavbar";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white text-black min-h-screen">
      <AdminNavbar />
      <div>{children}</div>
    </div>
  );
}
