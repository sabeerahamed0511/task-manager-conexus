import React from "react";
import Card from "./Card";
import { Task } from "@/types/task";
interface Column {
    key: string;
    label: string;
}
interface Props {
    tasks: Array<Task>;
    column: Column;
}

export default function Column({column, tasks}: Props) {

    return (<>
    <div className="grow p-2 bg-[#e4e7eb] rounded-sm">
        <h2 className="font-semibold text-sm text-gray-700 p-2">{column.label}</h2>
        <div className="">
            {
            tasks.map((task) => (<Card key={task?.id} task={task}/>))
        }
        </div>
    </div>
    </>)
}