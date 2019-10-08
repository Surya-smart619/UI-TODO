import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List } from './list';
import { Task } from './task';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    list: List;
    task: Task;
    toDoList: List[] = [];
    private listSource = new BehaviorSubject(this.list);
    private taskSource = new BehaviorSubject(this.task);
    private isTaskDetailSource = new BehaviorSubject(false);
    isTaskOpen = this.isTaskDetailSource.asObservable();
    activeList = this.listSource.asObservable();
    activeTask = this.taskSource.asObservable();
    constructor() { }

    changeActiveList(list: List) {
        this.listSource.next(list);
    }

    changeActiveTask(task: Task) {
        this.taskSource.next(task);
    }

    toggleTaskDetail(value: boolean) {
        this.isTaskDetailSource.next(value);
    }
}
