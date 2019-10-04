import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { DataService } from '../data.service';
import { List } from '../list';
import { Task } from '../task';

@Component({
    selector: 'app-todo-tasks',
    templateUrl: './todo-tasks.component.html',
    styleUrls: ['./todo-tasks.component.scss']
})
export class TodoTasksComponent implements OnInit {
    activeList: List;

    constructor(private taskService: TaskService, private dataService: DataService) { }

    ngOnInit() {
        this.dataService.activeList.subscribe(list => this.activeList = list);
    }

    createTaskByName(taskInput: { value: string; }) {
        const task = this.taskService.createTask(taskInput);
        this.activeList.tasks.push(task);
        taskInput.value = '';
    }

    activateTask(task: Task) {
        this.dataService.changeActiveTask(task);
        this.openTaskDetails();
    }

    openTaskDetails() {
        this.dataService.toggleTaskDetail(true);
    }

    toggleTaskFinished(task: Task) {
        task.isFinished = !task.isFinished;
    }
}
