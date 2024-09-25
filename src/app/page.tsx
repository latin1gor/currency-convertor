import Header from "@/components/header/header";
import CurrencyConvertor from "@/components/currency-convertor/currency-convertor";

export default function Home() {
  const isBrowser = typeof window !== "undefined";
  return (
    <>
      {isBrowser && (
        <div className={"p-6 pt-14 md:p-20"}>
          <Header />
          <CurrencyConvertor />
        </div>
      )}
    </>
  );
}
