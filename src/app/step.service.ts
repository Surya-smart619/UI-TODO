import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Step } from './step';

@Injectable({
    providedIn: 'root'
})
export class StepService {
    step: Step;
    constructor() { }
    createStep(stepInput: { value: string; }) {
        return this.step = {id: uuid(), name: stepInput.value, isFinished: false};
    }
}
