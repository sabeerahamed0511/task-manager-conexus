import React, { useCallback, useEffect, useMemo, useState } from "react";
import Input from "@/components/task-form/Input";
import Description from "@/components/task-form/Description";
import Dropdown from "@/components/task-form/Dropdown";
import Button from "@/components/task-form/Button";
import { Task } from "@/types/task";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from "@/redux/hooks";
import { createOrUpdateTask, deleteTask } from "@/redux/features/tasks/tasks";
import { usePathname, useRouter } from "next/navigation";
import { useFormik } from "formik";
import { taskSchema } from "@/utils/formValidationSchema";
import { routes } from "@/utils/pageRoutes";
import * as dropdown from "@/utils/dropdownOptions";
import ConfirmationModal from "./ConfirmationModal";


interface Props {
    task?: Task
}

export default function TaskForm({ task }: Props) {

    const router = useRouter();
    const path = usePathname();

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        if(!task && path !== routes.createTask) router.push(routes.taskManager);
    }, [task])

    const isReadOnly = useMemo(() => (task && path === routes.viewTask), [path]);


    const dispatch = useAppDispatch();

    const statusOptions = useMemo(() => (dropdown.statusOptions), []);

    const priorityOptions = useMemo(() => (dropdown.priorityOptions), []);

    const formik = useFormik({
        initialValues: {
            id: uuidv4(),
            title: '',
            description: '',
            priority: priorityOptions?.[0]?.value,
            status: statusOptions?.[0]?.value,
            assignee: '',
            dueDate: '',
            ...(task ? task : {}),
        },
        validationSchema: taskSchema,
        validateOnBlur: true,
        validateOnChange: true,
        isInitialValid: false,
        onSubmit: (data) => {
            dispatch(createOrUpdateTask(data));
            router.push(routes.taskManager)
        },
        onReset: () => {
            router.push(routes.taskManager)
        }
    })

    const handleDelete = useCallback(() => {
        dispatch(deleteTask(task as Task));
        router.push(routes.taskManager)
    }, [])

    const handleEdit = useCallback(() => {
        router.push(`${routes.editTask}?id=${task?.id}`)
    }, [])

    const handleDialogBoxClose = useCallback(() => {
        setIsDialogOpen(false);
    }, [])
    
    const handleDialogBoxOpen = useCallback(() => {
        setIsDialogOpen(true);
    }, [])


    return (
        <>
            <form className="max-w-[500px] mx-auto mt-5  p-5 rounded-md bg-gray-200" onSubmit={formik.handleSubmit}>
                <h1 className="text-[28px] font-bold text-center my-5 text-gray-700">{task ? (isReadOnly ? 'Task' : 'Update the Task') : 'Create New Task'}</h1>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    required={true}
                    label="Title"
                    onChange={formik.handleChange}
                    onblur={formik.handleBlur}
                    value={formik.values.title}
                    errorMsg={formik.errors.title}
                    readonly={isReadOnly}
                />
                <Description
                    name="description"
                    id="description"
                    required={false}
                    label="Description"
                    onChange={formik.handleChange}
                    onblur={formik.handleBlur}
                    value={formik.values.description}
                    errorMsg={formik.errors.description}
                    readonly={isReadOnly}
                />
                <div className="flex gap-2 flex-col md:flex-row">
                    {
                        isReadOnly ?
                            (
                                <>
                                    <Input
                                        type="text"
                                        name="priority"
                                        id="priority"
                                        required={true}
                                        label="Priority"
                                        onChange={formik.handleChange}
                                        onblur={formik.handleBlur}
                                        value={formik.values.priority}
                                        errorMsg={formik.errors.priority}
                                        readonly={isReadOnly}
                                    />
                                    <Input
                                        type="text"
                                        name="status"
                                        id="status"
                                        required={true}
                                        label="Status"
                                        onChange={formik.handleChange}
                                        onblur={formik.handleBlur}
                                        value={formik.values.status}
                                        errorMsg={formik.errors.status}
                                        readonly={isReadOnly}
                                    />
                                </>
                            ) :
                            (
                                <>
                                    <Dropdown
                                        name="priority"
                                        id="priority"
                                        required={true}
                                        label="Priority"
                                        options={priorityOptions}
                                        onChange={formik.handleChange}
                                        onblur={formik.handleBlur}
                                        value={formik.values.priority}
                                        errorMsg={formik.errors.priority}
                                        readonly={isReadOnly}
                                    />
                                    <Dropdown
                                        name="status"
                                        id="status"
                                        required={true}
                                        label="Status"
                                        options={statusOptions}
                                        onChange={formik.handleChange}
                                        onblur={formik.handleBlur}
                                        value={formik.values.status}
                                        errorMsg={formik.errors.status}
                                        readonly={isReadOnly}
                                    />
                                </>
                            )
                    }

                </div>

                <div className="flex gap-2 flex-col md:flex-row">
                    <Input
                        type="text"
                        name="assignee"
                        id="assignee"
                        required={false}
                        label="Assignee"
                        onChange={formik.handleChange}
                        onblur={formik.handleBlur}
                        value={formik.values.assignee}
                        errorMsg={formik.errors.assignee}
                        readonly={isReadOnly}
                    />
                    <Input
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        required={false}
                        label="Due Date"
                        onChange={formik.handleChange}
                        onblur={formik.handleBlur}
                        value={formik.values.dueDate}
                        errorMsg={formik.errors.dueDate}
                        readonly={isReadOnly}
                    />
                </div>
                <div className="flex justify-around my-5">
                    <Button
                        type="button"
                        label={isReadOnly ? "Back" : "Cancel"}
                        onClick={formik.handleReset}
                    />
                    {
                        isReadOnly ?
                        (
                            <Button
                        type="button"
                        label={'Edit'}
                        onClick={handleEdit}
                    />
                        ) :
                        (
                            <Button
                        type="submit"
                        label={task ? 'Update' : 'Create'}
                        disabled={!formik.isValid}
                    />
                        )
                    }
                    {
                        isReadOnly && (<Button
                            type="button"
                            label="Delete"
                            onClick={handleDialogBoxOpen}
                        />)
                    }

                </div>
            </form>
            
            <ConfirmationModal 
            isDialogOpen={isDialogOpen}  
            handleClose={handleDialogBoxClose} 
            handleConfirm={handleDelete} />

        </>
    )
}