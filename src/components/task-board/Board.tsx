import { useAppSelector } from "@/redux/hooks";
import { Task } from "@/types/task";
import React, { useCallback, useMemo, useState } from "react";
import Column from "./Column";
import { RELEVANCE, SortKeyToLabel, TaskStatus } from "@/utils/constants";
import Link from "next/link";
import { routes } from "@/utils/pageRoutes";
import CustomDrawer from "./CustomDrawer";
import { useFilter } from "@/app/hooks/useFilter";
import TuneIcon from '@mui/icons-material/Tune';
import { sortOptions } from "@/utils/dropdownOptions";
import { TaskList } from "@/redux/features/tasks/tasks";
import SearchBar from "./SearchBar";

interface ColoumData {
    'to-do': Array<Task>;
    'in-progress': Array<Task>;
    'in-review': Array<Task>;
    'done': Array<Task>;
}
interface DropdownProps {
    handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    sortKey: string;
}
function Dropdown({ handleSortChange, sortKey }: DropdownProps) {

    return (
        <div className="w-[100px]">
            <select
                className={`bg-[#e4e7eb] text-gray-700 font-semibold text-sm rounded-sm cursor-pointer w-[100px] py-[5px] outline-none`}
                value={sortKey}
                onChange={handleSortChange}
                title={SortKeyToLabel[sortKey as keyof typeof SortKeyToLabel]}
            >
                {
                    sortOptions?.map((list) => (<option key={list?.key} value={list?.key}>{list?.label}</option>))
                }
            </select>
        </div>
    )
}

export default function Board() {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [sortKey, setSortKey] = useState(RELEVANCE);

    const sortedTasks = useAppSelector(store => store.data.sortedTasks);

    const {
        filteredData,
        priorityFilters,
        setPriorityFilter,
    } = useFilter({ tasks: sortedTasks[sortKey as keyof TaskList] });

    const appliedFiltersCount = priorityFilters?.reduce((total, curr) => (curr?.isChecked ? total + 1 : total), 0);


    const coloumData: ColoumData = useMemo(() => {
        const data = filteredData;

        console.log("fffff data", data);
        console.log("fffff sortkey", sortKey);
        console.log("fffff sortedTasks", sortedTasks);


        const obj: ColoumData = {
            'to-do': [],
            'in-progress': [],
            'in-review': [],
            'done': [],
        }

        for (const task of data) {
            if (task.status === TaskStatus.TODO) obj["to-do"].push(task);
            else if (task.status === TaskStatus["IN-PROGRESS"]) obj["in-progress"].push(task);
            else if (task.status === TaskStatus["IN-REVIEW"]) obj["in-review"].push(task);
            else if (task.status === TaskStatus.DONE) obj.done.push(task);
        }

        return obj

    }, [filteredData, sortedTasks, sortKey])

    const columns = useMemo(() => ([
        {
            key: TaskStatus.TODO,
            label: 'To Do'
        },
        {
            key: TaskStatus["IN-PROGRESS"],
            label: 'In Progress'
        },
        {
            key: TaskStatus["IN-REVIEW"],
            label: 'In Review'
        },
        {
            key: TaskStatus.DONE,
            label: 'Done'
        },
    ]), []);

    const handleDrawerClose = useCallback(() => {
        setIsDrawerOpen(false);
    }, [])

    const handleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(true);
    }, [])

    const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortKey(e?.target?.value ?? RELEVANCE);
    }, []);

    return (<>
        <div>
            <div className="flex justify-between items-center my-5">
                <h1 className="font-extrabold text-[24px] py-2">
                    Task Board
                </h1>

                <Link
                    href={routes.createTask}
                    className="bg-black hover:bg-gray-900 font-semibold text-white px-6 py-2 rounded-sm cursor-pointer"
                >
                    Create
                </Link>

            </div>
            <div className="flex justify-between items-center mb-3">
                <div>
                    <SearchBar />
                </div>
                <div className="flex gap-3">

                    <div className="relative">
                        <button
                            onClick={handleDrawerOpen}
                            disabled={!sortedTasks?.relevance?.length}
                            className="py-[4px] flex justify-center items-center font-semibold text-sm bg-[#e4e7eb] text-gray-700 px-3 gap-1 rounded-sm cursor-pointer disabled:cursor-not-allowed"
                        >
                            <TuneIcon fontSize="inherit" />
                            Filter
                        </button>
                        {!!appliedFiltersCount && <span className="absolute top-[-10px] right-[-8px] rounded-full px-2 py-1 bg-red-700 text-white text-[10px]">{appliedFiltersCount}</span>}
                    </div>
                    <Dropdown sortKey={sortKey} handleSortChange={handleSortChange} />
                </div>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 min-h-screen`}>
                {
                    columns.map((column) => (<Column
                        key={column.key}
                        column={column}
                        tasks={coloumData[column.key]}
                    />))
                }
            </div>

            <CustomDrawer
                isDrawerOpen={isDrawerOpen}
                handleDrawerClose={handleDrawerClose}
                priorityFilters={priorityFilters}
                setPriorityFilter={setPriorityFilter}
            />

        </div>
    </>)
}