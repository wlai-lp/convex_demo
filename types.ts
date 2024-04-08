// Define interfaces
export interface User {
    id: number;
    name: string;
    email: string;
    age?: number; // Optional property
}

// Define type aliases
export type Point = {
    x: number;
    y: number;
};

// Define enums
export enum Direction {
    Up,
    Down,
    Left,
    Right
}

export type EventData = {
    convoId: string;
    agentId: string;
    language: string;
    timestamp: number;
    date: string;
};

export type LanguageData = {
    language: string;
    time: number;
};

export type ConvoData = {
    [convoId: string]: {
        [agentId: string]: LanguageData[];
    };
};
