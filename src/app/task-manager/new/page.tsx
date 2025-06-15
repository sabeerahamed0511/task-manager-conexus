'use client'
import dynamic from 'next/dynamic';
import React, { useEffect } from "react";
const TaskForm = dynamic(() => import("@/components/task-form/TaskForm"), {
    ssr: false,
});

export default function CreateTask() {

    useEffect(() => {
        document.title = 'Create New Task'
    }, []);

    return (
        <>
            <TaskForm />
        </>
    )
}