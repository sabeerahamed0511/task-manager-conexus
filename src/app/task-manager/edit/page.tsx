'use client'
import React, { Suspense } from "react";
import EditTaskLazy from './EditTaskLazy';

export default function EditTask() {

    return (
        <>
            <Suspense fallback={<>Loading...</>}>
                <EditTaskLazy />
            </Suspense>
        </>
    )
}