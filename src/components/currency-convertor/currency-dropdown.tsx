"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ICurrencyDropdownProps {
  currency: string | null;
  currencies: [{ code: string; name: string }];
  setCurrency: (value: string) => void;
  placeHolder: string;
}

const CurrencyDropdown = ({
  currency,
  currencies,
  setCurrency,
  placeHolder,
}: ICurrencyDropdownProps) => {
  return (
    <Select
      onValueChange={(value) => setCurrency(value)}
      value={currency || ""}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        {currencies &&
          Object.entries(currencies).map(([code, name]) => (
            <SelectItem key={code} value={code}>
              {String(name)}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencyDropdown;
