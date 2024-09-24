export const getUahCurrency = async () => {
  try {
    const res = await fetch(
      `https://api.exchangerate.host/live?access_key=${process.env.NEXT_PUBLIC_CURRENCY_API_KEY}&source=${process.env.NEXT_PUBLIC_BASE_CURRENCY}&currencies=USD,AUD,EUR,PLN,MXN,GBP,JPY,CNY`,
    );
    const data = await res.json();
    console.log(data);
    return { isSuccess: true, data };
  } catch (error) {
    console.error(error);
    return { isSuccess: false, error: error };
  }
};
