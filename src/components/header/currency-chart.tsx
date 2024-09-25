"use client";

import { ShieldAlert, TrendingUp } from "lucide-react";
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
import { getUahCurrency } from "@/services/currency-service";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Loader from "@/components/loader/loader";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const CurrencyChart = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ currency: string; rate: unknown }[]>([]);
  const [reachLimit, setReachLimit] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUahCurrency().then((res) => {
      if (res.isSuccess) {
        setLoading(false);
        const chartData = Object.entries(res?.data?.quotes || []).map(
          ([currencyPair, rate]) => {
            return {
              currency: currencyPair.replace("UAH", ""),
              rate: rate,
            };
          },
        );
        setData(chartData);
        console.log(chartData);
      } else if (res.reachLimit) setReachLimit(true);
    });
  }, []);
  return (
    <div
      className={"flex flex-col md:flex-row justify-center items-center w-full"}
    >
      <TextGenerateEffect
        words={"The hryvnia (UAH) exchange rate against other currencies."}
      />
      <div className={"flex items-center justify-between md:gap-x-10"}>
        <div className={"flex text-6xl font-black text-primary"}></div>

        <Card className={"min-w-4xl min-h-96"}>
          <CardHeader>
            <CardTitle className={"font-black text-xl text-primary"}>
              How much is 1 UAH
            </CardTitle>
            <CardDescription className={"mb-4"}>
              Showing the current exchange rate of currencies (USD, EUR)
              <span className={"font-bold"}> against the 1 UAH</span>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!loading ? (
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
            ) : (
              <div
                className={
                  "flex items-center justify-center h-[283px] w-full mb-2"
                }
              >
                {reachLimit ? (
                  <ShieldAlert size={60} color={"red"} />
                ) : (
                  <Loader />
                )}
              </div>
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
