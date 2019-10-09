import { Component, OnInit, Input } from '@angular/core';
import { List } from '../list';
import { ListService } from '../list.service';
import { DataService } from '../data.service';
import { Task } from '../task';

@Component({
    selector: 'app-todo-sidepanel',
    templateUrl: './todo-sidepanel.component.html',
    styleUrls: ['./todo-sidepanel.component.scss']
})
export class TodoSidepanelComponent implements OnInit {
    list: List;
    toDoList: List[] = [];
    defaultList: List;
    isSideMenuOpened = true;
    activeList: List;
    contextMenuX = 0;
    contextMenuY = 0;
    contextListMenu = false;
    targetList: List;
    constructor(private listService: ListService, private dataService: DataService) { }
    ngOnInit() {
        this.dataService.activeList.subscribe(list => this.activeList = list);
        this.createDefaultList();
    }

    createDefaultList() {
        this.defaultList = this.listService.createList('Tasks');
        this.activateList(this.defaultList);
    }

    createListByName(listInput: { value: string; }) {
        if (listInput.value !== '') {
            const createdList = this.listService.createList(listInput.value);
            this.toDoList.push(createdList);
            this.activateList(createdList);
            listInput.value = '';
        }
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

    changeDefaultListAsActive() {
        this.activateList(this.defaultList);
    }

    showListContextMenu(event, list: List) {
        this.contextMenuX = event.clientX;
        this.contextMenuY = event.clientY;
        this.contextListMenu = true;
        this.targetList = list;
    }

    deleteList(event) {
        if (confirm('Are you sure want to delete List ' + this.targetList.name)) {
            this.listService.deleteList(this.toDoList, this.targetList);
        }
        this.disableListContextMenu();
    }

    disableListContextMenu() {
        this.contextListMenu = false;
    }

    getUnfinishedTaskcount(tasks: Task[]) {
        return tasks.filter(task => task.isFinished === false).length;
    }
}
