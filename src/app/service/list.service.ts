import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { List } from '../model/list';

@Injectable({
    providedIn: 'root'
})
export class ListService {

    constructor() { }
    list: List;

    createList(listName: string) {
        return this.list = {id: uuid(), name: listName, tasks: []};
    }

    deleteList(toDoList: List[], targetList: List) {
        const indexOfList = toDoList.indexOf(targetList);
        toDoList.splice(indexOfList, 1);
    }

    updateList(activeList: List, value: any) {
        activeList.name = value;
    }
}
