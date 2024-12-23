import "./css/MainPage.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@apollo/client";
import { BIRTHDAYS_BY_MONTH } from "@/api/queries";
import { getBirthdaysByMonth } from "@/utils/birthdayUtils";

const chartConfig = {
  January: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  February: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  March: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  April: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  May: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
  June: {
    label: "June",
    color: "hsl(var(--chart-6))",
  },
  July: {
    label: "July",
    color: "hsl(var(--chart-7))",
  },
  August: {
    label: "August",
    color: "hsl(var(--chart-8))",
  },
  September: {
    label: "September",
    color: "hsl(var(--chart-9))",
  },
  October: {
    label: "October",
    color: "hsl(var(--chart-10))",
  },
  November: {
    label: "November",
    color: "hsl(var(--chart-11))",
  },
  December: {
    label: "December",
    color: "hsl(var(--chart-12))",
  },
} satisfies ChartConfig;

export function BirthdaysChart() {
  // Fetch actual data from DB
  const {
    data: birthdaysByMonth,
    loading,
    error,
  } = useQuery(BIRTHDAYS_BY_MONTH(7));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const data = getBirthdaysByMonth(birthdaysByMonth);
  const activeIndex = new Date().getMonth();

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            chartConfig[value as keyof typeof chartConfig]?.label
          }
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="amount"
          strokeWidth={2}
          radius={8}
          activeIndex={activeIndex}
          activeBar={({ ...props }) => {
            return (
              <Rectangle
                {...props}
                fillOpacity={0.7}
                stroke={props.payload.fill}
                strokeDasharray={4}
                strokeDashoffset={4}
              />
            );
          }}
        />
      </BarChart>
    </ChartContainer>
  );
}

import React from "react";

const MainPage: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="w-full p-4">
      <Card className="flex flex-row">
        <CardHeader>
          <CardTitle>Welcome {name}</CardTitle>
          <CardDescription>
            Your birthday list is waiting for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BirthdaysChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default MainPage;
