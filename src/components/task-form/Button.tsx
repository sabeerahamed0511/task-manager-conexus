import React from "react";

interface Props {
    type: 'submit' | 'button',
    label: string,
    disabled?: boolean,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export default function Button({ type, label, disabled = false, onClick }: Props) {

    return (
        <>
            <button
                type={type}
                className="bg-black hover:bg-gray-900 text-white px-10 py-2 rounded-sm cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-700"
                disabled={disabled}
                onClick={onClick}
            >
                {label}
            </button>
        </>
    )
}