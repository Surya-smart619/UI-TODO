import { Task } from './task';

export class List {
    id: string;
    name: string;
    status: boolean;
    tasks: Task[];
}
