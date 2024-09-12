import { Button } from "@/components/ui/button";
import DarkThemeIcon from "../ui/darkthemeicon";
import LightThemeIcon from "../ui/lightthemeicon";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { setTheme } from "@/app/features/theme/themeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  const handleTheme = (currentTheme: string): string => {
    return currentTheme === "light" ? "dark" : "light";
  };

  return (
    <header className="h-[52px] flex items-center justify-between pt-1 px-10 border-border border-b">
      {/* Title */}
      <h1 className="font-semibold text-[25px] ">DaddyNette</h1>

      {/* Login */}
      <ul className="flex items-center gap-3">
        <li>
          {theme === "light" ? (
            <div onClick={() => dispatch(setTheme(handleTheme(theme)))}>
              <DarkThemeIcon fill="black" style="cursor-pointer" />
            </div>
          ) : (
            <div onClick={() => dispatch(setTheme(handleTheme(theme)))}>
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
