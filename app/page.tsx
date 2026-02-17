'use client';

import { AddTask } from "./src/components/AddTask";
import { TaskList } from "./src/components/TaskList";
import { useTheme } from "./src/context/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <main className="min-h-screen">
      <div className="max-w-xl mx-auto py-10 space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Task Master Pro
        </h1>
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition"
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <AddTask />
        <TaskList />
      </div>
    </main>
  );
}