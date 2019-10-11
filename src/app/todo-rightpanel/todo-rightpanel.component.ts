import { Component, OnInit } from '@angular/core';
import { StepService } from '../service/step.service';
import { DataService } from '../service/data.service';
import { Task } from '../model/task';
import { Step } from '../model/step';
import { TaskService } from '../service/task.service';

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

    /**
     * Creates Steps by given name.
     *
     * @param stepInput - It use to get specifies name.
     */
    createStepByName(stepInput: { value: string; }) {
        const createdStep = this.stepService.createStep(stepInput);
        stepInput.value = '';
        this.activeTask.steps.push(createdStep);
    }

    /**
     * Changes Step's isFinished boolean status.
     *
     * @param step - Used to get specified variable.
     */
    toggleStepFinished(step: Step) {
        step.isFinished = !step.isFinished;
    }

    /**
     * Changes Active Task isFinished boolean status.
     */
    toggleActiveTaskFinished() {
        this.activeTask.isFinished = !this.activeTask.isFinished;
    }

    /**
     * Deletes given Step from Active task.
     *
     * @param step - It Specifies step.
     */
    deleteStep(step: Step) {
        if (confirm('Are you sure want to delete Step ' + step.name)) {
            this.stepService.deleteStep(this.activeTask, step);
        }
    }

    /**
     * Updates Step Name with new name.
     *
     * @param newStepInput - It is used get Specified new Name.
     * @param step - It specifies step to be update.
     */
    updateStep(newStepInput, step: Step) {
        this.stepService.updateStep(newStepInput.value, step);
        newStepInput.blur();
    }

    /**
     * Updates Active Task Name with new name.
     *
     * @param taskInput - It is used to get specified new name.
     */
    updateTask(taskInput) {
        this.taskService.updateTask(this.activeTask, taskInput.value);
        taskInput.blur();
    }
}
