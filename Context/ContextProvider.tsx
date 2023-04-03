import { useState, useEffect, FC, ReactNode } from "react";
import { createContext } from "react";

type ContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  currentColor: string;
  setColor: (color: string) => void;
  openColorPallete: () => void;
  openColorPalleteState: boolean;
};

export const ThemeContext = createContext<ContextType>({
  theme: "dark",
  toggleTheme: () => {},
  currentColor: "#6c87ff",
  setColor: () => {},
  openColorPallete: () => {},
  openColorPalleteState: false,
});

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (typeof window !== "undefined" &&
      (localStorage.getItem("theme") as "light" | "dark")) ||
      "dark"
  );
  const [currentColor, setCurrentColor] = useState<string>(
    (typeof window !== "undefined" &&
      (localStorage.getItem("colorMode") as "#6c87ff")) ||
      ""
  );

  const [openColorPalleteState, SetOpenColorPalleteState] =
    useState<boolean>(false);

  const setColor = (color: string) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const toggleTheme = (): void => {
    const val = theme === "light" ? "dark" : "light";
    setTheme(val);
    localStorage.setItem("theme", val);
  };

  const openColorPallete = (): void => {
    SetOpenColorPalleteState(!openColorPalleteState);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        currentColor,
        setColor,
        openColorPallete,
        openColorPalleteState,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
