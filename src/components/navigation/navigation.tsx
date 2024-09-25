import LogoIcon from "@/components/logo/logo-icon";
import { ModeToggle } from "@/components/providers/theme-provider";

const Navigation = () => {
  return (
    <div
      className={
        "flex justify-between px-10 h-20 items-center border-b border-gray-300  dark:border-gray-900"
      }
    >
      <LogoIcon />
      <ModeToggle />
    </div>
  );
};

export default Navigation;
