import { PRIORITY } from '@/utils/constants';
import React, { useCallback } from 'react';

interface Props {
    isChecked: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    flag: string;
    index: number;
    objKey: string;
    setPriorityFilter?: React.Dispatch<React.SetStateAction<{[key:string] : boolean}>>;
    // setAssigneeFilter?: React.Dispatch<React.SetStateAction<Array<Filter>>>;
}

export default function CustomCheckbox({
    isChecked = false,
    label,
    flag,
    objKey,
    setPriorityFilter,
    // setAssigneeFilter,
}: Props) {

const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {    
        if(flag === PRIORITY) {
            setPriorityFilter?.(filters => ({
                ...filters,
                [objKey] : e.target.checked
            }))
        }
    }, [])

    return (
        <div className='flex items-center px-2'>
            <input
                type={'checkbox'}
                checked={isChecked}
                onChange={handleChange}
                id={label}
                className='cursor-pointer'
            />
            <label className='ml-1 cursor-pointer text-sm' htmlFor={label}>{label}</label>
        </div>
    );
}
