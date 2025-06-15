'use client'
import React from "react";
import Asterick from "./Asterick";
import { Task } from "@/types/task";

interface Props {
    type: string,
    required?: boolean,
    name: string,
    id: string,
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onblur: (e: React.FocusEvent<HTMLInputElement>) => void,
    value: string,
    errorMsg?: string,
    readonly?: boolean, 
}

export default function Input({ type, name, required = false, id, label, value, onChange, onblur, errorMsg, readonly = false }: Props) {

    return (
        <>
            <div className="w-full flex flex-col mb-5 relative">
                <label htmlFor={name} className="text-md font-semibold text-gray-700">
                    {label}
                    {required && <Asterick />}
                </label>
                <input
                    type={type}
                    name={name}
                    id={id}
                    required={required}
                    className="rounded-sm h-8 px-2 bg-white border-none outline-none"
                    value={value}
                    onChange={onChange}
                    onBlur={onblur}
                    readOnly={readonly}
                />
                {errorMsg && (<p className="text-[14px] text-red-700 absolute top-[100%]">{errorMsg}</p>)}
            </div>
        </>
    )
}