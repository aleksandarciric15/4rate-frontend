import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-10 mx-auto mb-10 px-6 py-12 max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">
        {t("About_4Rate")}
      </h1>
      <p className="text-gray-800 dark:text-gray-300 mb-6 leading-relaxed">
        {t("About_section_1")}
      </p>
      <p className="text-gray-800 dark:text-gray-300 mb-6 leading-relaxed">
        {t("About_section_2")}
      </p>
      <p className="text-gray-800 dark:text-gray-300 mb-6 leading-relaxed">
        {t("About_section_3")}
      </p>
      <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
        {t("About_section_4")}
      </p>
    </div>
  );
};
