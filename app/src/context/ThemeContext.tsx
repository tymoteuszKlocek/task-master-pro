'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<{ theme: Theme, toggleTheme: () => void } | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const saved = localStorage.getItem('theme') as Theme;
        if (saved) setTheme(saved);
        else if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");

    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme((prev) => prev === 'dark' ? 'light' : 'dark');

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}