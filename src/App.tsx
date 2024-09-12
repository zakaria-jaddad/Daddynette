import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { Toaster } from "sonner";
import { RootState } from "./app/store";
import { useEffect } from "react";

function App() {
  const { theme } = useSelector((state: RootState) => state.theme);
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);
  return (
    <>
      <Toaster />
      <Header />
      <Main />
    </>
  );
}

export default App;
