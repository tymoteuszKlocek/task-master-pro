'use client';

import type { Task } from "../types/task";
import { useTasks } from "../context/TaskContext";

export function TaskList() {
    const { state, dispatch } = useTasks();

    const filteredTasks = state.tasks.filter((t) => {
        if (state.filter === 'completed') return t.completed;
        if (state.filter === 'active') return !t.completed;
        return true;
    });

    if (filteredTasks.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
                No tasks to display
            </div>
        );
    }

    return (
        <div>
            <ul>
                {
                    filteredTasks.map(task => {
                        return <TaskItem key={task.id}
                            task={task}
                            onToggle={() => dispatch({ type: "TOGGLE_TASK", id: task.id })}
                            onDelete={() => dispatch({ type: "DELETE_TASK", id: task.id })} />
                    })
                }
            </ul>
        </div>
    )
}

type TaskItemProps = {
    task: Task,
    onDelete: () => void;
    onToggle: () => void;
}

function TaskItem({ onDelete, onToggle, task }: TaskItemProps) {

    const priorityColor = {
        low: "bg-green-100 text-green-800",
        medium: "bg-yellow-100 text-yellow-800",
        high: "bg-red-100 text-red-800",
    }[task.priority];

    return (
        <div className="p-4 flex item-center gap-4 hover:bg-gray-50 transition">
            <input
                className="w-5 h-5 cursor-pointer"
                type="checkbox"
                name="completed"
                id="completed"
                onChange={onToggle}

            />
            <div className="flex-1">
                <p className={`font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-900"
                    }`}>{task.title}</p>
            </div>

            <span
                className={`px-2 py-1 text-xs font-semibold rounded ${priorityColor}`}
            >
                {task.priority}
            </span>

            <button
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 font-medium transition"
                aria-label={`Remove "${task.title}"`}
            >
                Usuń
            </button>
        </div>
    )
}