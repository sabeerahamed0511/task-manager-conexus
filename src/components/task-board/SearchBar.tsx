'use client'
import React, { useCallback, useMemo, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector } from "@/redux/hooks";
import SearchResultCard from "./SearchResultCard";

export default function SearchBar() {

    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const tasks = useAppSelector(store => store.data.sortedTasks.relevance);

    const searchResult = useMemo(() => {
        return tasks?.filter(task => (task?.title?.toLowerCase()?.includes(query?.toLowerCase())));
    }, [query])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }, []);

    const handleFocus = useCallback(() => {
        setIsOpen(true)
    }, []);

    const handleBlur = useCallback(() => {
        setTimeout(() => {
            setIsOpen(false)
        }, 500);
    }, []);

    return (
        <div className="relative">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    placeholder={'Search by title...'}
                    className={'rounded-sm pl-2 pr-8 max-w-[180px] text-sm py-1 border-none outline-none bg-[#e4e7eb] text-gray-700'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                />
                <span className="absolute right-0 px-1 text-gray-700">
                    <SearchIcon fontSize="small" color={'inherit'} />
                </span>
            </div>
            {
                isOpen && (
                    <div
                        className={'absolute z-[999] top-[120%] p-2 w-[300px] break-all min-h-[200px] text-sm text-gray-700 max-h-[400px] overflow-y-auto rounded-sm bg-white inset-shadow-2xs shadow-gray-400 shadow-lg'}
                    >
                        {
                            !query ?
                                (
                                    <span>Start typing...</span>
                                ) :
                                query && searchResult?.length === 0 ?
                                    (
                                        <span>No result for <strong>"{query}"</strong></span>
                                    ) :
                                    (
                                        searchResult?.map(task => (<SearchResultCard
                                            key={task?.id}
                                            task={task}
                                        />))
                                    )
                        }
                    </div>
                )
            }
        </div>
    )

}