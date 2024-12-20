import Navbar from "@/components/shared/navbar";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import BackButton from "../admin/components/back-button";
import Sidebar from "../admin/components/sidebar";
import { useTranslation } from "react-i18next";

const AdminLayout = () => {
  const { t } = useTranslation();
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <div className="flex">
          <div className="hidden md:block h-screen w-[250px]">
            <Sidebar />
          </div>
          <div className="p-5 w-full md:max-w-[1140px]">
            <div className="flex flex-row">
              <BackButton text={t("go_back")} link="/admin" />
            </div>

            <Outlet />
          </div>
        </div>
        <Toaster />
      </ThemeProvider>
    </div>
  );
};

export default AdminLayout;
