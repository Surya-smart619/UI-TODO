import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { DataService } from '../data.service';
import { List } from '../list';
import { Task } from '../task';
import { Step } from '../step';
import { ListService } from '../list.service';

@Component({
    selector: 'app-todo-tasks',
    templateUrl: './todo-tasks.component.html',
    styleUrls: ['./todo-tasks.component.scss']
})
export class TodoTasksComponent implements OnInit {
    activeList: List;
    contextTaskMenu = false;
    targetTask: Task;
    contextMenuX: any;
    contextMenuY: any;

    constructor(private listService: ListService, private taskService: TaskService, private dataService: DataService) { }

    ngOnInit() {
        this.dataService.activeList.subscribe(list => this.activeList = list);
    }

    createTaskByName(taskInput: { value: string; }) {
        if (taskInput.value !== '') {
            const task = this.taskService.createTask(taskInput);
            this.activeList.tasks.push(task);
            taskInput.value = '';
        }
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

    showTaskContextMenu(event, task: Task) {
        this.contextMenuX = event.clientX;
        this.contextMenuY = event.clientY;
        this.contextTaskMenu = true;
        this.targetTask = task;
    }

    deleteTask(event) {
        if (confirm('Are you sure want to delete Task ' + this.targetTask.name)) {
            this.taskService.deleteTask(this.activeList, this.targetTask);
            this.disableTaskContextMenu();
        }
    }

    disableTaskContextMenu() {
        this.contextTaskMenu = false;
    }

    getFinishedStepsCount(steps: Step[]) {
        return steps.filter(step => step.isFinished === true).length;
    }

    updateList(newListInput) {
        this.listService.updateList(this.activeList, newListInput.value);
        newListInput.blur();
    }
}
