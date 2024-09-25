"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { getCurrencies } from "@/services/currency-service";
import CurrencyDropdown from "@/components/currency-convertor/currency-dropdown";
import { ArrowLeftRight } from "lucide-react";
import { debounce } from "@/lib/utils";

const CurrencyConvertor = () => {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencies, setCurrencies] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  useEffect(() => {
    getCurrencies().then((res) => {
      if (res.isSuccess) setCurrencies(res.data);
    });
  }, []);

  const onCurrencyConvert = async (isAmount: boolean, value: number) => {
    console.log("fromCurrency", fromCurrency, amount, toCurrency);

    if (!value || !fromCurrency || !toCurrency) return;
    console.log(2);

    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${value}&from=${isAmount ? fromCurrency : toCurrency}&to=${isAmount ? toCurrency : fromCurrency}`,
      );
      const data = await res.json();
      if (data && isAmount) {
        setConvertedAmount(data?.rates[toCurrency]);
      } else {
        setAmount(data?.rates[fromCurrency]);
      }
    } catch (error) {
      console.error(error);
      return { isSuccess: false };
    }
  };

  useEffect(() => {
    onCurrencyConvert(true, amount);
  }, [fromCurrency]);

  useEffect(() => {
    onCurrencyConvert(false, convertedAmount);
  }, [toCurrency]);

  // const onDebounceAmountChange = useCallback(
  //   debounce((value: boolean) => onCurrencyConvert(value), 500),
  //   [],
  // );

  const onSwapCurrency = () => {
    setToCurrency(fromCurrency);
    setAmount(convertedAmount);
    setFromCurrency(toCurrency);
    setConvertedAmount(amount);
  };

  return (
    <Card className={"w-full mx-auto my-10 rounded-lg shadow-2xl p-20 mt-20"}>
      <CardTitle
        className={
          "mb-5 pl-6 text-2xl font-bold text-primary text-center md:text-start "
        }
      >
        Currency Convertor
      </CardTitle>
      <CardContent className={"flex flex-col gap-3"}>
        {currencies && (
          <div
            className={"flex flex-col md:flex-row items-center justify-between"}
          >
            <div className={"flex  justify-center gap-x-4"}>
              <Input
                placeholder={"Base currency amount"}
                value={amount}
                type={"number"}
                onChange={(e) => {
                  const value = e.target.value;
                  setAmount(Number(value));
                  onCurrencyConvert(true, Number(value));
                }}
              />
              <CurrencyDropdown
                currency={fromCurrency}
                currencies={currencies}
                setCurrency={setFromCurrency}
                placeHolder={"From"}
              />
            </div>

            <Button variant={"ghost"} onClick={onSwapCurrency}>
              <ArrowLeftRight />
            </Button>

            <div className={"flex justify-center gap-x-4"}>
              <Input
                value={convertedAmount}
                placeholder={"Converted amount"}
                onChange={(e) => {
                  const value = e.target.value;
                  setConvertedAmount(Number(value));
                  onCurrencyConvert(false, Number(value));
                }}
              />

              <CurrencyDropdown
                currency={toCurrency}
                currencies={currencies}
                setCurrency={setToCurrency}
                placeHolder={"To"}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrencyConvertor;
