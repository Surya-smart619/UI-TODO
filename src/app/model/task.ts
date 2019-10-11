import { Step } from './step';

export class Task {
    id: string;
    name: string;
    isFinished: boolean;
    steps: Step[];
}
