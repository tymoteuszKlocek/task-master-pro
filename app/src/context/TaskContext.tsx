'use client';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Task } from '../types/task';

type State = {
    tasks: Task[];
    filter: 'all' | 'completed' | 'active';
}

type Action =
    | { type: 'ADD_TASK'; title: string; priority: Task['priority'] }
    | { type: 'TOGGLE_TASK'; id: string }
    | { type: 'DELETE_TASK'; id: string }
    | { type: 'SET_FILTER'; filter: State['filter'] }
    | { type: 'LOAD_TASKS'; tasks: Task[] };

const TaskContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

function taskReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [
                    { id: crypto.randomUUID(), title: action.title, completed: false, priority: action.priority },
                    ...state.tasks
                ]
            };
        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.id
                    ? {
                        ...task,
                        completed: !task.completed
                    } : task)
            }

        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(t => t.id !== action.id)
            }

        case 'SET_FILTER':
            return {
                ...state,
                filter: action.filter
            }

        case 'LOAD_TASKS':
            return {
                ...state, tasks: action.tasks
            }

        default:
            return state;
    }
}


export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(taskReducer, { tasks: [], filter: 'all' });

    useEffect(() => {
        const saved = localStorage.getItem('tasks-pro');
        if (saved) {
            dispatch({ type: 'LOAD_TASKS', tasks: JSON.parse(saved) })
        }
    }, []);

    // Zapis do LocalStorage przy każdej zmianie
    useEffect(() => {
        localStorage.setItem('tasks-pro', JSON.stringify(state.tasks));
    }, [state.tasks]);


    return <TaskContext.Provider value={{ state, dispatch }}>
        {children}
    </TaskContext.Provider>
}

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTasks must be used within TaskProvider');
    return context;
};