import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { List } from './list';

@Injectable({
    providedIn: 'root'
})
export class ListService {

    constructor() { }
    list: List;

    createList(listInput: { value: string; }) {
        return this.list = {id: uuid(), name: listInput.value, status: true, tasks: []};
    }
}
