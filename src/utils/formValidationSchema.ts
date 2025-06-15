import * as yup from 'yup';

export const taskSchema = yup.object({
    id: yup.string().required('Task ID is required.'),
    title: yup.string().required('Title is required.'),
    description: yup.string().optional(),
    status: yup.string().required('Status is required.'),
    priority: yup.string().required('Priority is required.'),
    dueDate: yup.string().optional(),
    assignee: yup.string().optional(),
});