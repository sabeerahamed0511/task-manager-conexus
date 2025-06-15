import { Task } from "@/types/task";
import { useMemo, useState } from "react"

interface Props {
    tasks: Array<Task>;
}

export const useFilter = ({ tasks }: Props) => {
    const priorityList = useMemo(() => {
        const priorityObj: { [key: string]: boolean } = {};
        const uniqueVal = [...new Set(tasks.map(list => list?.priority)?.filter(Boolean))];
        for (const key of uniqueVal) {
            priorityObj[key] = false
        }
        return priorityObj;
    }, [tasks]);

    const assigneeList = useMemo(() => {
        const assigneeObj: { [key: string]: boolean } = {};
        const uniqueVal = [...new Set(tasks.map(list => list?.assignee)?.filter(Boolean))];
        for (const key of uniqueVal) {
            assigneeObj[key as string] = false
        }
        return assigneeObj;
    }, [tasks]);

    const [priorityFilters, setPriorityFilter] = useState(priorityList);
    const [assigneeFilters, setAssigneeFilter] = useState(assigneeList);

    const filteredData = useMemo(() => {

        const appliedFilterOnPriority: any = Object.keys(priorityFilters)?.map(key => ({
            value: key as string,
            isChecked: priorityFilters[key],
        })).filter(filter => filter.isChecked);

        const appliedFilterOnAssignee: any = Object.keys(assigneeFilters)?.map(key => ({
            value: key as string,
            isChecked: assigneeFilters[key],
        })).filter(filter => filter.isChecked);

        return tasks.filter((task: Task) => {
            const isPriorityApplied = appliedFilterOnPriority.length ? appliedFilterOnPriority.some((filter: any) => filter?.value === task?.priority) : true;
            const isAssigneeApplied = appliedFilterOnAssignee.length ? appliedFilterOnAssignee.some((filter: any) => filter?.value === task?.assignee) : true;
            return isPriorityApplied && isAssigneeApplied;
        })

    }, [priorityFilters, tasks]);

    return {
        filteredData,
        priorityFilters: Object.keys(priorityFilters)?.map(key => ({
            value: key as string,
            isChecked: priorityFilters[key],
        })),
        setPriorityFilter,
        assigneeFilters: Object.keys(assigneeFilters)?.map(key => ({
            value: key as string,
            isChecked: priorityFilters[key],
        })),
        setAssigneeFilter,
    }
}