import React from "react";

interface Props {
    className?: string
}

export default function Asterick({ className = 'text-red-700'}: Props) {

    return (
        <>
           <span className={className}>*</span>
        </>
    )
}