import { Task } from "@/types/task";
import { routes } from "@/utils/pageRoutes";
import Link from "next/link";
import React from "react";

interface Props {
    task: Task
}
export default function SearchResultCard({ task }: Props) {

    return (
        <Link href={`${routes.viewTask}?id=${task?.id}`}>
            <p 
            title={task?.title}
            className="line-clamp-2 py-1 px-2 bg-[#e4e7eb] rounded-sm mb-2">
                {task?.title}
            </p>
        </Link>
    )
}