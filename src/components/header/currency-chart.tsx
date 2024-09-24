"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getUahCurrency } from "@/services/chart-currency-service";
import CountUp from "react-countup";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const CurrencyChart = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    getUahCurrency().then((res) => {
      if (res.isSuccess) {
        setLoading(false);
        const chartData = Object.entries(res.data.quotes).map(
          ([currencyPair, rate]) => {
            return {
              currency: currencyPair.replace("UAH", ""),
              rate: rate,
            };
          },
        );
        setData(chartData);
        console.log(chartData);
      }
    });
  }, []);
  return (
    <div className={"flex justify-center items-center w-full p-20"}>
      <div className={"flex items-center justify-between gap-x-10"}>
        <h1 className={"text-5xl font-black text-primary grid grid-cols-2"}>
          {" "}
          <CountUp
            className={"pr-4"}
            start={10}
            end={1}
            duration={1.75}
            separator=" "
            decimals={2}
            decimal=","
            onEnd={() => console.log("Ended! 👏")}
            onStart={() => console.log("Started! 💨")}
          />{" "}
          <div>UAH =</div>
        </h1>

        <Card className={"min-w-4xl min-h-96"}>
          <CardHeader>
            <CardTitle>Currency UAH Chart</CardTitle>
            <CardDescription className={"mb-4"}>
              Showing the current exchange rate of currencies (USD, EUR)
              <span className={"font-bold"}> against the 1 UAH</span>.
            </CardDescription>
          </CardHeader>
          <CardContent className={"min-h-[310px]"}>
            {!loading && (
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={data}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    interval="preserveStartEnd"
                    dataKey="currency"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Area
                    dataKey="rate"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CurrencyChart;
