import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center ">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6">
          {t("Oops! The page you are looking for does not exist.")}
        </p>
        <Button variant="default" className="font-normal " size="sm" asChild>
          <Link to="/">{t("Go Back Home")}</Link>
        </Button>
      </div>
    </div>
  );
};
