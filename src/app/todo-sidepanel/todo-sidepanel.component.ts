import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { List } from '../list';
import { ListService } from '../list.service';

@Component({
    selector: 'app-todo-sidepanel',
    templateUrl: './todo-sidepanel.component.html',
    styleUrls: ['./todo-sidepanel.component.scss']
})
export class TodoSidepanelComponent implements OnInit {
    list: List;
    toDoLists: List[] = [];
    constructor(private listService: ListService) { }

    ngOnInit() {
    }

    listInputOperation(listInput: { value: string; }) {
        this.toDoLists.push(this.listService.createList(listInput));
        listInput.value = '';
    }

    sidePanelOperation(sideBarButton: any) {
        console.log(sideBarButton);
        /*var sideMenu = getElementById("sideMenu");
        if("leftPanelContainer" == sideMenu.attr("class")) {
            closeLeftPanel(sideMenu);
        } else {
            openLeftPanel(sideMenu);
        }*/
    }

    /* closeLeftPanel(sideMenu) {
        sideMenu.addClass("closeLeftPanelContainer").removeClass("leftPanelContainer");
        getElementById("listInput").addClass("displayNone");
        var leftPanelTitle = document.getElementsByClassName("leftPanelTitle");
        [...leftPanelTitle].forEach ( element => {
            element.classList.replace("leftPanelTitle", "displayNone");
        });
    }

    openLeftPanel(sideMenu) {
        sideMenu.addClass("leftPanelContainer").removeClass("closeLeftPanelContainer");
        getElementById("listInput").removeClass("displayNone");
        var leftPanelTitle = document.getElementsByClassName("displayNone");
        [...leftPanelTitle].forEach ( element => {
            element.classList.replace("displayNone", "leftPanelTitle");
        });
    }*/
}
