import React from "react";
import Asterick from "./Asterick";

interface Option {
    label: string,
    value: string
}

interface Props {
    required?: boolean,
    name: string,
    id: string,
    label: string,
    options: Array<Option>,
    onChange: (e:React.ChangeEvent<HTMLSelectElement> ) => void,
    onblur: (e: React.FocusEvent<HTMLSelectElement>) => void,
    value: string,
        errorMsg?: string,
        readonly?: boolean, 
}

export default function Dropdown({ name, required = false, id, label, options = [], value, onChange, errorMsg, readonly = false}: Props) {

    return (
        <>
            <div className="w-full flex flex-col mb-5 relative">
                <label htmlFor={name} className="text-md font-semibold text-gray-700">
                    {label}
                    {required && <Asterick/>}
                </label>
                <select
                    name={name}
                    id={id}
                    required={required}
                    className="bg-white border-none outline-none rounded-sm h-8 px-2"
                     value={value}
                     onChange={onChange}
                     aria-readonly={readonly}
                >
                    {
                        options?.map((list) => (<option key={list?.value} value={list?.value}>{list?.label}</option>))
                    }
                </select>
                {errorMsg && (<p className="text-[14px] text-red-700 absolute top-[100%]">{errorMsg}</p>)}
            </div>
        </>
    )
}