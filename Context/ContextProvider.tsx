import { useState, useEffect, FC, ReactNode } from "react";
import { createContext } from "react";

type ContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  currentColor: string;
  setColor: (color: string) => void;
};

export const ThemeContext = createContext<ContextType>({
  theme: "dark",
  toggleTheme: () => {},
  currentColor: "#6c87ff",
  setColor: () => {},
});

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (typeof window !== "undefined" &&
      (localStorage.getItem("theme") as "light" | "dark")) ||
      "dark"
  );
  const [currentColor, setCurrentColor] = useState<string>("#6c87ff");

  const setColor = (color: string) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const toggleTheme = (): void => {
    const val = theme === "light" ? "dark" : "light";
    setTheme(val);
    localStorage.setItem("theme", val);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, currentColor, setColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
