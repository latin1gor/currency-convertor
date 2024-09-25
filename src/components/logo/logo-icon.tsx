import { Bitcoin } from "lucide-react";

const LogoIcon = () => {
  return (
    <div className="flex items-center gap-x-3">
      <Bitcoin
        size={45}
        color={"black"}
        strokeWidth={2.5}
        className={
          "bg-gradient-to-b from-orange-500 to-yellow-300 rounded-xl p-1"
        }
      />
      <h1 className={"font-semibold text-base md:text-2xl"}>
        currency-convertor.
      </h1>
    </div>
  );
};

export default LogoIcon;
