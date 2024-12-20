import { useTheme } from "@/components/shared/theme-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface ReservationData {
  month: string;
  reservationCount: number;
}

type ReservationProps = {
  restaurantId: number;
  isVisible?: boolean;
};

const chartConfig = {
  reservationCount: {
    label: "Reservation Count",
    theme: {
      light: "hsl(var(--chart-2))",
      dark: "hsl(var(--chart-4))",
    },
  },
} satisfies ChartConfig;

export function ReservationChartComponent({ restaurantId }: ReservationProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [chartData, setChartData] = useState<ReservationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/v1/analytics/last-quartal-stats/${restaurantId}`
      )
      .then((response) => {
        const transformedData = transformData(response.data);
        setChartData(transformedData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const barColor =
    chartConfig.reservationCount.theme?.[
      theme as keyof typeof chartConfig.reservationCount.theme
    ] || "hsl(var(--chart-5))";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("Reservation Statistics")}</CardTitle>
        <CardDescription>
          {t("Number of reservations for the past 4 months")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="min-h-[200px] max-h-[350px] w-full"
          config={chartConfig}
        >
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 24,
            }}
            barCategoryGap="20%"
          >
            <CartesianGrid horizontal={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="reservationCount"
              fill={barColor}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const transformData = (data: { [key: string]: number }): ReservationData[] => {
  return Object.entries(data).map(([month, reservationCount]) => ({
    month,
    reservationCount,
  }));
};
