import { Button } from "@/components/ui/button";
import { Report } from "@/types/report";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type MonthlyReportFormProps = {
  onSubmit: (report: Report) => void;
};

const MonthlyReportForm = ({ onSubmit }: MonthlyReportFormProps) => {
  const { t } = useTranslation("form");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [error, setError] = useState<string>("");

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedMonth) {
      setError("Please select a month.");
      return;
    }
    if (!/^\d{4}$/.test(year)) {
      setError("Please enter a valid year (format: yyyy).");
      return;
    }

    setError("");

    console.log({ month: selectedMonth, year });
    let obj: Report = { month: Number(selectedMonth), year: Number(year) };
    onSubmit(obj);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded-md">
      <h4 className="text-xl font-semibold mb-4">
        {t("Generate Monthly Report")}
      </h4>

      <div className="mb-4">
        <label htmlFor="month" className="block text-lg mb-2">
          {t("Select Month")}:
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded-md p-2 w-full dark:text-black"
        >
          <option value="">--{t("Select Month")}--</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="year" className="block text-lg mb-2">
          {t("Enter Year")}:
        </label>
        <input
          type="text"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="e.g., 2023"
          className="border rounded-md p-2 w-full dark:text-black"
          maxLength={4}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        {t("Generate Report")}
      </Button>
    </form>
  );
};

export default MonthlyReportForm;
