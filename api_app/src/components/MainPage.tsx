import "./css/MainPage.css";
import {
  Card,
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
  console.log("BIRTHDAYS BY MONTH:", birthdaysByMonth);
  const data = getBirthdaysByMonth(birthdaysByMonth);
  const activeIndex = new Date().getMonth();
  console.log("DATA:", data);

  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[400px] sm:float-right sm:min-h-[50px]l min-h-[50px] flex justify-center grow p-10"
    >
      <BarChart accessibilityLayer data={data} width={500} height={300}>
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
      <Card className="flex flex-row  w-full flex-1 px-10">
        <CardHeader>
          <CardTitle>Welcome {name}</CardTitle>
          <CardDescription>
            Your birthday list is waiting for you
          </CardDescription>
        </CardHeader>
        <BirthdaysChart />
      </Card>
    </div>
  );
};

export default MainPage;
