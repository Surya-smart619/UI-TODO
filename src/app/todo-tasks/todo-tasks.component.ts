import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../service/task.service';
import { DataService } from '../service/data.service';
import { List } from '../model/list';
import { Task } from '../model/task';
import { Step } from '../model/step';
import { ListService } from '../service/list.service';

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

    /**
     * Creates Task by name.
     *
     * @param taskInput - It is used to get specified name.
     */
    createTaskByName(taskInput: { value: string; }) {
        if (taskInput.value !== '') {
            const task = this.taskService.createTask(taskInput);
            this.activeList.tasks.push(task);
            taskInput.value = '';
        }
    }

    /**
     * Activates Given task.
     *
     * @param task - It specifies that task.
     */
    activateTask(task: Task) {
        this.dataService.changeActiveTask(task);
        this.openTaskDetails();
    }

    /**
     * Opens Task Details.
     */
    openTaskDetails() {
        this.dataService.toggleTaskDetail(true);
    }

    /**
     * Toggles Task's isfinished variable.
     *
     * @param task - It specifies that task.
     */
    toggleTaskFinished(task: Task) {
        task.isFinished = !task.isFinished;
    }

    /**
     * Shows Context menu in clicked position and target the Task.
     *
     * @param event - It is used to get position of context menu.
     * @param task - It specifies that task.
     */
    showTaskContextMenu(event, task: Task) {
        this.contextMenuX = event.clientX;
        this.contextMenuY = event.clientY;
        this.contextTaskMenu = true;
        this.targetTask = task;
    }

    /**
     * Deletes Task.
     */
    deleteTask() {
        if (confirm('Are you sure want to delete Task ' + this.targetTask.name)) {
            this.taskService.deleteTask(this.activeList, this.targetTask);
            this.disableTaskContextMenu();
        }
    }

    /**
     * Disables Context menu.
     */
    disableTaskContextMenu() {
        this.contextTaskMenu = false;
    }

    /**
     * Gets finished Step Count.
     *
     * @param steps - It used to get that specified count.
     */
    getFinishedStepsCount(steps: Step[]) {
        return steps.filter(step => step.isFinished === true).length;
    }

    /**
     * Updates List with new name.
     *
     * @param newListInput - It specifies that new name.
     */
    updateList(newListInput) {
        this.listService.updateList(this.activeList, newListInput.value);
        newListInput.blur();
    }
}
