import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { List } from './list';

@Injectable({
    providedIn: 'root'
})
export class ListService {

    constructor() { }
    list: List;

    createList(listInput: string) {
        return this.list = {id: uuid(), name: listInput, tasks: []};
    }


    deleteList(toDoList: List[], targetList: List) {
        const indexOfList = toDoList.indexOf(targetList);
        toDoList.splice(indexOfList, 1);
    }
}
