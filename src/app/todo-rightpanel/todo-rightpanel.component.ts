import { Component, OnInit } from '@angular/core';
import { StepService } from '../step.service';
import { DataService } from '../data.service';
import { Task } from '../task';
import { Step } from '../step';
import { TaskService } from '../task.service';

@Component({
    selector: 'app-todo-rightpanel',
    templateUrl: './todo-rightpanel.component.html',
    styleUrls: ['./todo-rightpanel.component.scss']
})
export class TodoRightpanelComponent implements OnInit {
    isTaskOpen = false;
    activeTask: Task;
    constructor(private taskService: TaskService, private stepService: StepService, private dataService: DataService) { }

    ngOnInit() {
        this.dataService.isTaskOpen.subscribe(isTaskOpen => this.isTaskOpen = isTaskOpen);
        this.dataService.activeTask.subscribe(task => this.activeTask = task);
    }

    createStepByName(stepInput: { value: string; }) {
        const createdStep = this.stepService.createStep(stepInput);
        stepInput.value = '';
        this.activeTask.steps.push(createdStep);
    }

    toggleStepFinished(step: Step) {
        step.isFinished = !step.isFinished;
    }

    toggleActiveTaskFinished() {
        this.activeTask.isFinished = !this.activeTask.isFinished;
    }

    deleteStep(step: Step) {
        if (confirm('Are you sure want to delete Step ' + step.name)) {
            this.stepService.deleteStep(this.activeTask, step);
        }
    }

    updateStep(newListInput, step: Step) {
        this.stepService.updateStep(newListInput.value, step);
        newListInput.blur();
    }

    updateTask(taskInput) {
        this.taskService.updateTask(this.activeTask, taskInput.value);
        taskInput.blur();
    }
}
