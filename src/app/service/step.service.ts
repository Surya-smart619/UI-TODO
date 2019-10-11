import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Step } from '../model/step';
import { Task } from '../model/task';

@Injectable({
    providedIn: 'root'
})
export class StepService {
    step: Step;
    constructor() { }
    createStep(stepInput: { value: string; }) {
        return this.step = {id: uuid(), name: stepInput.value, isFinished: false};
    }

    deleteStep(activeTask: Task, step: Step) {
        const indexOfStep = activeTask.steps.indexOf(step);
        activeTask.steps.splice(indexOfStep, 1);
    }

    updateStep(updatedStepName: any, step: Step) {
        step.name = updatedStepName;
    }
}
