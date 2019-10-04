import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Task } from './task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    task: Task;
    constructor() { }
    createTask(taskInput: { value: string; }) {
        return this.task = {id: uuid(), name: taskInput.value, isFinished: false, steps: []};
    }

}
