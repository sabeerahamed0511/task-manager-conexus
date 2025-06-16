'use client'
import React, { Suspense, useEffect } from "react";
import CreateTaskLazy from './CreateTaskLazy';

export default function CreateTask() {

    useEffect(() => {
        document.title = 'Create New Task'
    }, []);

    return (
        <>
         <Suspense fallback={<>Loading...</>}>
            <CreateTaskLazy />
         </Suspense>
        </>
    )
}