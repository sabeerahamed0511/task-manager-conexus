import { Task } from '@/types/task'
import * as sort from '@/utils/sort'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TaskList {
    relevance: Array<Task>
    byPriorityLowToHigh: Array<Task>
    byPriorityHighToLow: Array<Task>
}

interface TaskManagerState {
    tasks: {
        [key: string]: Task
    },
    sortedTasks: TaskList
}

const initialState: TaskManagerState = {
    tasks: {},
    sortedTasks: {
        relevance: [],
        byPriorityLowToHigh: [],
        byPriorityHighToLow: []
    }
}

export const taskManagerSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        createOrUpdateTask: (state, action: PayloadAction<Task>) => {
            const task = action.payload;
            state.tasks[task?.id] = task;
            const list = Array.from(Object.values(state.tasks));
            state.sortedTasks.relevance = list;
            state.sortedTasks.byPriorityLowToHigh = sort.sortByPriorityLowToHigh(list);
            state.sortedTasks.byPriorityHighToLow = sort.sortByPriorityHighToLow(list);
        },
        deleteTask: (state, action: PayloadAction<Pick<Task, 'id'>>) => {
            const task = action.payload;
            delete state.tasks[task.id];
            const list = Array.from(Object.values(state.tasks));
            state.sortedTasks.relevance = list;
            state.sortedTasks.byPriorityLowToHigh = sort.sortByPriorityLowToHigh(list);
            state.sortedTasks.byPriorityHighToLow = sort.sortByPriorityHighToLow(list);
        }
    },
})

export const { createOrUpdateTask, deleteTask } = taskManagerSlice.actions

export default taskManagerSlice.reducer