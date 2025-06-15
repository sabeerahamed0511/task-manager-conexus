'use client'
import React, { useEffect } from "react";
import TaskBoard from "@/components/task-board/Board";

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