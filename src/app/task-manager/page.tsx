'use client'
import React, { Suspense, useEffect } from "react";
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
            <Suspense fallback={<>Loading...</>}>
                <TaskBoard />
            </Suspense>
        </>
    )
}