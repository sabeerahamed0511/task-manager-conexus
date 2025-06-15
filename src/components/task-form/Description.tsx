import React from "react";
import Asterick from "./Asterick";

interface Props {
    required?: boolean,
    name: string,
    id: string,
    label: string,
    onChange: (e:React.ChangeEvent<HTMLTextAreaElement> ) => void,
    onblur: (e: React.FocusEvent<HTMLTextAreaElement>) => void,
    value: string,
        errorMsg?: string,
        readonly?: boolean, 
}

export default function Description({ name, required = false, id, label, value, onChange, onblur, errorMsg , readonly = false}: Props) {

    return (
        <>
            <div className="w-full flex flex-col mb-5 relative">
                <label htmlFor={name} className="text-md font-semibold text-gray-700">
                    {label}
                    {required && <Asterick />}
                </label>
                <textarea
                    name={name}
                    id={id}
                    required={required}
                    className="bg-white border-none outline-none rounded-sm resize-none h-20 px-2"
                    value={value}
                    onChange={onChange}
                    readOnly={readonly}
                />
                {errorMsg && (<p className="text-[14px] text-red-700 absolute top-[100%]">{errorMsg}</p>)}
            </div>
        </>
    )
}