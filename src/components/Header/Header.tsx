import { Button } from "@/components/ui/button";
import DarkThemeIcon from "../ui/DarkThemeIcon";
import LightThemeIcon from "../ui/LighThemeIcon";
import { useEffect, useState } from "react";

const Header = () => {
  const [theme, setTheme] = useState("light");

  const handleTheme = (currentTheme: string): string => {
    return currentTheme === "light" ? "dark" : "light";
  };

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <header className="h-[52px] flex items-center justify-between pt-1 px-10 border-border border-b">
      {/* Title */}
      <h1 className="font-semibold text-[25px] ">DaddyNette</h1>

      {/* Login */}
      <ul className="flex items-center gap-3">
        <li>
          {theme === "light" ? (
            <div onClick={() => setTheme(handleTheme(theme))}>
              <DarkThemeIcon fill="black" style="cursor-pointer" />
            </div>
          ) : (
            <div
              onClick={() => {
                setTheme(handleTheme(theme));
                console.log(theme);
              }}
            >
              <LightThemeIcon fill="white" style="cursor-pointer" />
            </div>
          )}
        </li>
        <li>
          <Button variant="link" className="px-0">
            Key
          </Button>
        </li>
        <li className="">
          <Button variant="link" className="px-0">
            Login
          </Button>
          {/* <Button>Login</Button> */}
        </li>
      </ul>
    </header>
  );
};

export default Header;
