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
import { analyticEndpoints } from "@/environments/api-endpoints";
import { UsersChartData, UsersPerMonth } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  userCount: {
    label: "User Count",
    theme: {
      light: "hsl(var(--chart-2))",
      dark: "hsl(var(--chart-4))",
    },
  },
} satisfies ChartConfig;

export function UserChartComponent() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [chartData, setChartData] = useState<UsersChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(analyticEndpoints.getUserStats());
        const data = response.data;
        const transformedData = transformData(data);
        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching user creation stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const lineColor =
    chartConfig.userCount.theme?.[
      theme as keyof typeof chartConfig.userCount.theme
    ] || "hsl(var(--chart-5))";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("User Creation Statistics")}</CardTitle>
        <CardDescription>
          {t("Showing number of users created over the past year")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="min-h-[200px] max-h-[350px] w-full "
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="userCount"
              type="natural"
              fill={lineColor}
              fillOpacity={0.5}
              stroke={lineColor}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const transformData = (data: UsersPerMonth[]): UsersChartData[] => {
  return data.map((item) => ({
    month: new Date(item.year, item.month - 1).toLocaleString("default", {
      month: "short",
    }),
    userCount: item.userCount,
  }));
};
