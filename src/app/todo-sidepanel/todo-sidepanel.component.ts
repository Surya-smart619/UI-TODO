import { Component, OnInit, Input } from '@angular/core';
import { List } from '../list';
import { ListService } from '../list.service';
import { DataService } from '../data.service';

@Component({
    selector: 'app-todo-sidepanel',
    templateUrl: './todo-sidepanel.component.html',
    styleUrls: ['./todo-sidepanel.component.scss']
})
export class TodoSidepanelComponent implements OnInit {
    list: List;
    toDoLists: List[] = [];
    isSideMenuOpened = true;
    activeList: List;
    constructor(private listService: ListService, private dataService: DataService) { }
    ngOnInit() {
        this.dataService.activeList.subscribe(list => this.activeList = list);
    }

    createListByName(listInput: { value: string; }) {
        const createdList = this.listService.createList(listInput);
        this.toDoLists.push(createdList);
        this.activateList(createdList);
        listInput.value = '';
    }

    sidePanelToggleOperation() {
        this.isSideMenuOpened = !this.isSideMenuOpened;
    }

    openSideMenu() {
        this.isSideMenuOpened = true;
    }

    activateList(list) {
        this.dataService.changeActiveList(list);
        this.closeTaskDetails();
    }

    closeTaskDetails() {
        this.dataService.toggleTaskDetail(false);
    }
}
