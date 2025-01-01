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
  amount: {
    label: "Birthdays",
  },
  January: {
    label: "January",
  },
  February: {
    label: "February",
  },
  March: {
    label: "March",
  },
  April: {
    label: "April",
  },
  May: {
    label: "May",
  },
  June: {
    label: "June",
  },
  July: {
    label: "July",
  },
  August: {
    label: "August",
  },
  September: {
    label: "September",
  },
  October: {
    label: "October",
  },
  November: {
    label: "November",
  },
  December: {
    label: "December",
  },
} satisfies ChartConfig;

function BirthdaysChart() {
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
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar
          dataKey="amount"
          strokeWidth={2}
          radius={8}
          activeIndex={activeIndex}
          activeBar={({ ...props }) => {
            return <Rectangle {...props} fillOpacity={0.4} />;
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
