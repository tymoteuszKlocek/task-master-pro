"use client";

import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { Task } from "../types/task";

export function AddTask() {
  const { state, dispatch } = useTasks();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Tytuł zadania nie może być pusty.");
      return;
    }

    dispatch({
      type: "ADD_TASK",
      title: trimmedTitle,
      priority,
    });

    // Reset form state
    setTitle("");
    setPriority("medium");
    setError(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="task-title" className="font-medium">
          New Task
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(null);
          }}
          placeholder="eg. Do a code review"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="priority" className="font-medium">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as Task["priority"])
          }
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-2 rounded font-medium"
      >
        Add new
      </button>
    </form>
  );
}