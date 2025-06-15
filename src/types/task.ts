export interface Task {
    id: string,
    title: string,
    description?: string,
    status: string,
    priority: string,
    dueDate?: string,
    assignee?: string,
}

export interface Filter {
    value: string;
    isChecked: boolean;
}