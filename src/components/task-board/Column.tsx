import React from "react";
import Card from "./Card";

export default function Column({column, tasks}: any) {

    return (<>
    <div className="grow p-2 bg-[#e4e7eb] rounded-sm">
        <h2 className="font-semibold text-sm text-gray-700 p-2">{column.label}</h2>
        <div className="">
            {
            tasks.map((task: any) => (<Card key={task.id} task={task}/>))
        }
        </div>
    </div>
    </>)
}