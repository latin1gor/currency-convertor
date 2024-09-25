"use client";
export const getUahCurrency = async () => {
  try {
    const res = await fetch(
      `https://api.exchangerate.host/live?access_key=${process.env.NEXT_PUBLIC_CURRENCY_API_KEY || "2602c3446b00674f70b363d9e27934e8"}&source=${process.env.NEXT_PUBLIC_BASE_CURRENCY || "UAH"}&currencies=USD,AUD,EUR,PLN,MXN,GBP,JPY,CNY`,
    );
    const data = await res.json();
    if (data.success) {
      return { isSuccess: true, data };
    } else {
      return { isSuccess: false, reachLimit: true };
    }
  } catch (error) {
    console.error(error);
    return { isSuccess: false, reachLimit: false, error: error };
  }
};

export const getCurrencies = async () => {
  try {
    const res = await fetch("https://api.frankfurter.app/currencies");
    const data = await res.json();
    return { isSuccess: true, data };
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};
