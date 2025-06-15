import { Task } from "@/types/task";
import { PriorityIndex } from "./constants";

export const sortByPriorityLowToHigh = (list: Array<Task>) => {
    list = [...list];
    return list?.sort((a, b) => {
        const taskA = PriorityIndex[a.priority as keyof typeof PriorityIndex]
        const taskB = PriorityIndex[b.priority as keyof typeof PriorityIndex]

        return taskA - taskB
    })
}

export const sortByPriorityHighToLow = (list: Array<Task>) => {
    list = [...list];
    return list?.sort((a, b) => {
        const taskA = PriorityIndex[a.priority as keyof typeof PriorityIndex]
        const taskB = PriorityIndex[b.priority as keyof typeof PriorityIndex]

        return taskB - taskA;
    })
}
