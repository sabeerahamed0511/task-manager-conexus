export enum TaskStatus {
    TODO = 'to-do',
    'IN-PROGRESS' = 'in-progress',
    'IN-REVIEW' = 'in-review',
    DONE = 'done',
}

export enum TaskPriority {
    low = 'Low',
    medium = 'Medium',
    high = 'High',
}

export enum PriorityIndex {
    low,
    medium,
    high
}

export enum SortKeyToLabel {
    relevance = 'Relevance',
    byPriorityLowToHigh = 'Priority: Low to High',
    byPriorityHighToLow = 'Priority: High to Low',
}


export const PRIORITY = 'priority';
export const LOW = 'low';
export const MEDIUM = 'medium';
export const HIGH = 'high';
export const RELEVANCE = 'relevance';