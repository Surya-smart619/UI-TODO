import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Task } from './task';
import { List } from './list';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    task: Task;
    constructor() { }
    createTask(taskInput: { value: string; }) {
        return this.task = {id: uuid(), name: taskInput.value, isFinished: false, steps: []};
    }

    deleteTask(list: List, targetTask: Task) {
        const indexofTask = list.tasks.indexOf(targetTask);
        list.tasks.splice(indexofTask, 1);
    }
}
