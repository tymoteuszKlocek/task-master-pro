import type { Metadata } from "next";
import { TaskProvider } from "@/app/src/context/TaskContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Master Pro",
  description: "Aplikacja do zarządzania zadaniami",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50 transition-colors">
        <ThemeProvider>
          <TaskProvider>
            {children}
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}