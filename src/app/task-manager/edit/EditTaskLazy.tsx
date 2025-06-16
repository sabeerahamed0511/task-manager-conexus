'use client'
import { useAppSelector } from '@/redux/hooks';
import { routes } from '@/utils/pageRoutes';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from "react";
const TaskForm = dynamic(() => import("@/components/task-form/TaskForm"), {
    ssr: false,
});

export default function EditTaskLazy() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const tasks = useAppSelector(store => store.data.tasks);
    const task = tasks?.[searchParams?.get('id') as string];

    useEffect(() => {
        if (!task) router.push(routes.taskManager);
    }, [task])

    useEffect(() => {
        document.title = `Edit | ${task?.title}`;
    }, []);

    return (
        <>
            <TaskForm task={task ?? null} />
        </>
    )
}