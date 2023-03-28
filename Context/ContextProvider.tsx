import { useState, useEffect, FC, ReactNode } from "react";
import { createContext } from "react";

type ContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (typeof window !== "undefined" &&
      (localStorage.getItem("theme") as "light" | "dark")) ||
      "dark"
  );

  const toggleTheme = (): void => {
    const val = theme === "light" ? "dark" : "light";
    setTheme(val);
    localStorage.setItem("theme", val);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
