'use client'
import React, { useEffect } from "react";
import dynamic from 'next/dynamic';
const TaskBoard = dynamic(() => import('@/components/task-board/Board'), {
    ssr: false,
});

export default function TaskManager() {

    useEffect(() => {
        document.title = 'Task Board'
    }, []);

    return (
        <>
            <TaskBoard />
        </>
    )
}