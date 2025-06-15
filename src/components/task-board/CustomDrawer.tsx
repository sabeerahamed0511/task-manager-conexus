import React from "react";
import Drawer from '@mui/material/Drawer';
import CustomCheckbox from "./Checkbox";
import { PRIORITY, TaskPriority } from "@/utils/constants";
import { Filter } from "@/types/task";
import CancelIcon from '@mui/icons-material/Cancel';



interface Props {
    handleDrawerClose: () => void;
    isDrawerOpen: boolean;
    priorityFilters: Array<Filter>;
    setPriorityFilter: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}

export default function CustomDrawer({
    isDrawerOpen,
    handleDrawerClose,
    priorityFilters,
    setPriorityFilter,
}: Props) {

    return (
        <div>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
            >
                <div className="w-[300px] p-4">
                    <div className="flex justify-between items-center mb-5 px-2">
                        <h1 className="font-semibold text-gray-700 text-lg">Filters</h1>
                        <button onClick={handleDrawerClose}><CancelIcon fontSize="large" className="cursor-pointer"/></button>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-700 bg-gray-200 rounded-sm px-2 mb-2">Priority</h2>
                        {
                            priorityFilters.map((filter, ind) => (<CustomCheckbox
                                key={filter.value}
                                isChecked={filter.isChecked}
                                label={TaskPriority[filter.value as keyof typeof TaskPriority]}
                                flag={PRIORITY}
                                setPriorityFilter={setPriorityFilter}
                                index={ind}
                                objKey={filter.value}
                            />))
                        }
                    </div>
                </div>
            </Drawer>
        </div>
    )
}