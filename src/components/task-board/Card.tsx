import { Task } from "@/types/task";
import { TaskPriority } from "@/utils/constants";
import { routes } from "@/utils/pageRoutes";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import * as dropdown from "@/utils/dropdownOptions";
import { useAppDispatch } from "@/redux/hooks";
import { createOrUpdateTask } from "@/redux/features/tasks/tasks";

interface Props {
    task: Task;
}

type PriorityIndex = keyof typeof TaskPriority

function DropDown({ task }: Props) {

    const dispatch = useAppDispatch();
    const statusOptions = useMemo(() => (dropdown.statusOptions), []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        e.stopPropagation();
        const updatedTask = {
            ...task,
            status: e?.target?.value,
        }
        dispatch(createOrUpdateTask(updatedTask))
    }, []);

    return (
        <div>
            <select
                className={`bg-blue-300 text-black outline-none text-[14px] px-2  rounded-sm mt-1 inline-block`}
                value={task?.status}
                onChange={handleChange}
            >
                {
                    statusOptions?.map((list) => (<option key={list?.value} value={list?.value}>{list?.label}</option>))
                }
            </select>
        </div>
    )
}

export default function Card({ task }: Props) {

    const priorityFlag = useMemo(() => {
        switch (task.priority) {
            case 'low':
                return 'bg-yellow-500'
            case 'medium':
                return 'bg-orange-500'
            case 'high':
                return 'bg-red-500'
            default:
                return 'bg-blue-500';
        }
    }, [task])

    return (<>
        <div
            className="p-2 bg-white rounded-sm mb-2"
        >
            <Link href={`${routes.viewTask}?id=${task?.id}`}>
                <p className="line-clamp-2 text-sm cursor-pointer" title={task.title}>{task.title}</p>
            </Link>
            {task?.dueDate && (<span className={`bg-gray-500 text-white text-[14px] px-2 rounded-sm mt-1 inline-block`}>Due: {task.dueDate}</span>)}
            <DropDown task={task} />
            <div className="flex items-center relative mt-2 h-6">
                {
                    task?.assignee && (
                        <span
                            className="h-6 w-6 rounded-[50%] bg-gray-800 text-white uppercase font-semibold text-center"
                            title={task.assignee}>
                            {task.assignee?.charAt(0)}
                        </span>
                    )
                }
                <span
                    title={`Priority: ${TaskPriority[task.priority as PriorityIndex]}`}
                    className={`${priorityFlag} text-white text-[14px] px-2 rounded-sm absolute right-0`}>
                    {TaskPriority[task.priority as PriorityIndex]}
                </span>
            </div>

        </div>

    </>)
}

