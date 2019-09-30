'use strict';

var collectionOfList = [];
var activeList;
var activeTask;

init();

function init() {
    addEventListener(getElementById("sideBarButton"), "click", sidePanelOperation);
    addEventListener(getElementById("trashListIcon"), "click", deleteOperationForList);
    addEventListener(getElementById("checkbox"), "change", toggleOperationForSteps);
    addEventListener(getElementById("stepInput"), "keydown", stepInputBoxOperation);
    addEventListener(getElementById("taskInput"), "keydown", taskInputOperation);
    addEventListener(getElementById("listInput"), "keydown", listInputOperation);
}

/**
 * Adds Event Listner to HTML Element with event and function
 * 
 * @param {HTMLElement} element      - Specifies HTML Element.
 * @param {string}      event        - Specifies Event value.
 * @param {function}    functionName - Specifies Name of the function.
 */
function addEventListener(element, event, functionName) {
    element.bind(event, functionName);
}

/**
 * Appends Child Element to Parent Element.
 * 
 * @param {HTMLElement} parentElement - Specifies Parent Element.
 * @param {HTMLElement} childElement  - Specifies Child Element.
 */
function appendParentAndChild(parentElement, childElement) {
    parentElement.appendChild(childElement);
}

function appendParentAndChild(parentElement, childElement) {
    parentElement.append(childElement);
}
/**
 * Returns a reference to the first object with the specified value of the ID attribute.
 * 
 * @param {string} elementId - String that specifies the ID value.
 */
function getElementById(elementId) {
    return $("#" + elementId);
}

/**
 * Returns Created HTML element by tag name.
 * 
 * @param {string} tagName - Specifies tag name value used to create element. 
 */
function createElementByTagName(tagName) {
    return $("<" + tagName + "></" + tagName + ">");
}

/**
 * Returns Text String from specified text value.
 * 
 * @param {string} text - String that specifies text value.
 */
function createTextNode(text) {
    return document.createTextNode(text);
}

/**
 * Sets HTML Element as Empty.
 * 
 * @param {HTMLElement} element - Specifies HTML Element.
 */
function setElementAsEmpty(element) {
    element.html("");
}

/**
 * Returns Undeleted Objects from array by objects status.
 * 
 * @param {Array} array - Array that specifies array value to filter. 
 */
function getUndeletedObjects(array) {
    return array.filter(object => object.status === true);
}

/**
 * Returns HTML div element for list in Page.
 * 
 * @param {Object} list - Used to set ID attribute to div element.
 */
function getListDiv(list) {
    var divElement = createElementByTagName("DIV");
    addEventListener(divElement, "click", listOperation);
    assignIdAndClassName(divElement, list.id, "leftPanelContent");
    return divElement;
}

/**
 * Assigns ID and Class name to HTML element.
 * 
 * @param {HTMLElement} element    - HTML element that specifies element to used.
 * @param {string}      id         - String that specifies ID value.
 * @param {string}      className  - String that specifies class name.
 */
function assignIdAndClassName(element, id, className) {
    element.attr("id", id);
    element.attr("class", className);
}

/**
 * Returns HTML I element after creating list icon.
 * 
 * @param {Object} list - Used to set ID to HTML I Element.
 */
function getListIcon(list) {
    var iElement = createElementByTagName("I");
    assignIdAndClassName(iElement, list.id, "fa fa-list");
    return iElement;
}

/**
 * Returns inner div element for creating list in Page.
 * 
 * @param {Object} list - Used to set ID to HTML div element.
 */
function getListInnerDiv(list) {
    var divElement = createElementByTagName("DIV");
    assignIdAndClassName(divElement, list.id, "leftPanelTitle blue bold");
    return divElement;
}

/**
 * Returns Span element with object name and assign ID.
 * 
 * @param {Object} object - Object which is used to specifies object name and ID.
 */
function getSpanWithTextNode(object) {
    var spanElement = createElementByTagName("SPAN");
    spanElement.id = object.id;
    let textElement = createTextNode(object.name);
    appendParentAndChild(spanElement, textElement)
    return spanElement;
}

/**
 * Returns Unfinished Objects as Array form Array of Objects by filtering with isFinished flag variable.
 * 
 * @param {Array} array - Array to be filter.
 */
function getUnfinishedObjectFromArray(array) {
    return array.filter(object => object.isFinished === false);
}

/**
 * Sets Unfinished Task Count in div element by calculating from list object.
 * 
 * @param {Object}      list - Object that specifies list object.
 * @param {HTMLElement} div  - HTML element that specifies div element.
 */
function setUnfinishedTaskCountInDiv(list, div) {
    var unFinishedTasksLength = getUnfinishedObjectFromArray(list.tasks).length;
    if (unFinishedTasksLength > 0) {
        var spanElementForTaskCount = createElementByTagName("SPAN");
        spanElementForTaskCount.attr("id", list.id);
        spanElementForTaskCount.attr("class", "taskCount");
        var CountTextElement = document.createTextNode(unFinishedTasksLength);
        appendParentAndChild(spanElementForTaskCount, CountTextElement);
        appendParentAndChild(div, spanElementForTaskCount);
    }
}

/**
 * Loads created list in left panel.
 */
function loadLists() {
    var listContainer = getElementById("sideList");
    setElementAsEmpty(listContainer);
    setActiveListName();
    var unDeletedList = getUndeletedObjects(collectionOfList);
    for (let listIndex in unDeletedList) {
        let list = unDeletedList[listIndex];
        let divElement = getListDiv(list);
        let iElement = getListIcon(list);
        appendParentAndChild(divElement, iElement);
        let innerDivElement = getListInnerDiv(list);
        let spanElement = getSpanWithTextNode(list);
        appendParentAndChild(innerDivElement, spanElement);
        setUnfinishedTaskCountInDiv(list, innerDivElement);
        appendParentAndChild(divElement, innerDivElement);
        appendParentAndChild(listContainer, divElement);
    }
}

/**
 * Soft Delete the Active List.
 */
function deleteOperationForList() {
    if (confirm("Are you sure want to delete '" + activeList.name + "'")) {
        activeList.status = false;
        loadTasks();
    }
}

/**
 * 
 * @param {*} list 
 */
/*function getIndexOfList(list) {
    return list === activeList;
}*/

/**
 * Sets Active List Name in Task div Header.
 */
function setActiveListName() {
    if (activeList.status === true) {
        getElementById("displayListTitle").html(activeList.name);
    } else { //TODO change default list as "Task"
        getElementById("displayListTitle").html("Tasks");
        activeList = "";
        getElementById("taskDetails").addClass("displayNone");
        /*var previousListIndex = collectionOfList.findIndex(getIndexOfList) - 1;
        activeList = collectionOfList[previousListIndex];
        document.getElementById("displayListTitle").innerHTML = activeList.name;*/
    }
}

/**
 * Returns HTML div element for task in page.
 * 
 * @param {Object} task - Used to set ID attribute to div element.
 */
function getTaskDiv(task) {
    var divElement = createElementByTagName("DIV");
    addEventListener(divElement, "click", taskClickOperation);
    assignIdAndClassName(divElement, task.id, "tasks");
    return divElement;
}

/**
 * Returns Checkbox after creates div element for task in page.
 * 
 * @param {Object} task - Object used to set ID attribute to checkBox.
 */
function getTaskCheckBox(task) {
    var checkBoxDiv = createElementByTagName("DIV");
    checkBoxDiv.attr("class", "checkBox");
    var checkBox = createElementByTagName("INPUT");
    checkBox.attr("type", "checkbox");
    checkBox.attr("name", task.id);
    assignIdAndClassName(checkBox, "taskCheckBox" + task.id, "checkbox");
    toggleCheckboxCheckedProperty(task, checkBox);
    addEventListener(checkBox, "change", eventOperationForTaskCheckBox);
    var label = createElementByTagName("LABEL");
    label.attr("for", "taskCheckBox" + task.id);
    appendParentAndChild(checkBoxDiv, checkBox);
    appendParentAndChild(checkBoxDiv, label);
    return checkBoxDiv;
}

/**
 * Toggles Checkbox checked Property with condition.
 * 
 * @param {Object}      task     - Object used to check condition.
 * @param {HTMLElement} checkBox - HTML element which is to be toggled.
 */
function toggleCheckboxCheckedProperty(task, checkBox) {
    if (task.isFinished) {
        checkBox.attr("checked", true);
    } else {
        checkBox.attr("checked", false);
    }
}

/**
 * Returns inner div element for task in page.
 * 
 * @param {Object} task - Object used to set ID attribute to inner div element.
 */
function getTaskInnerDiv(task) {
    var divElement = createElementByTagName("DIV");
    assignIdAndClassName(divElement, task.id, "taskTitle");
    return divElement;
}

/**
 * Toggles class name of span element with condition.
 * 
 * @param {Object}      task        - Object that is used to check condition.
 * @param {HTMLElement} spanElement - HTML element that specifies span element.
 */
function toggleSpanClassNameByTask(task, spanElement) {
    if (task.isFinished) {
        spanElement.addClass("finished");
    } else {
        spanElement.removeClass("finished");
    }
}

/**
 * Sets Steps Count in Task div by calculating step count with task object.
 * 
 * @param {Object}      task - Object that used to calculate steps count.
 * @param {HTMLElement} div  - HTML element specifies that div element.
 */
function setStepsCountInDiv(task, div) {
    var stepCount = getUndeletedObjects(task.steps).length;
    if (stepCount > 0) {
        let finishedStepCount = task.steps.filter(step => step.isFinished === true).length;
        let spanStepCount = createElementByTagName("SPAN");
        let textStepCount = document.createTextNode(finishedStepCount + " of " + stepCount);
        appendParentAndChild(spanStepCount, textStepCount);
        appendParentAndChild(div, spanStepCount);
    }
}

/**
 * Loads Task in page.
 */
function loadTasks() {
    setActiveListName();
    var taskContainer = getElementById("tasksContainer");
    setElementAsEmpty(taskContainer);
    for (let taskIndex in activeList.tasks) {
        let task = activeList.tasks[taskIndex];
        let divElement = getTaskDiv(task);
        let checkBoxDiv = getTaskCheckBox(task);
        appendParentAndChild(divElement, checkBoxDiv);
        let innerDivElement = getTaskInnerDiv(task);
        let spanElement = getSpanWithTextNode(task);
        toggleSpanClassNameByTask(task, spanElement);
        appendParentAndChild(innerDivElement, spanElement);
        setStepsCountInDiv(task, innerDivElement);
        appendParentAndChild(divElement, innerDivElement);
        appendParentAndChild(taskContainer, divElement);
    }
    loadLists();
}

/**
 * Toggles active task isfinished flag variable with condition of checkbox.
 */
function toggleOperationForSteps() {
    if (this.checked) {
        this.checked = true;
        activeTask.isFinished = true;
    } else {
        this.checked = false;
        activeTask.isFinished = false;
    }
    loadSteps();
    loadTasks();
}

/**
 * Toggles task's isFinished flag variable by checkbox checked property, event operation for task checkbox.
 */
function eventOperationForTaskCheckBox() {
    var taskId = event.target.name;
    var task = activeList.tasks.find(task => task.id === taskId);
    if (this.checked) {
        var taskId = event.target.name;
        var task = activeList.tasks.find(task => task.id === taskId);
        task.isFinished = true;
    } else {
        task.isFinished = false;
    }
    loadTasks();
    loadSteps();
}

/**
 * Toggles step's isFinished flag variable by checkbox checked property, event operation for step checkbox.
 */
function eventOperationForStepCheckBox() {
    var stepId = event.target.name;
    var step = activeTask.steps.find(step => step.id === stepId);
    if (this.checked) {
        step.isFinished = true;
    } else {
        step.isFinished = false;
    }
    loadSteps();
    loadTasks();
}

/**
 * Toggles taskTitle class name with condition.
 * 
 * @param {HTMLElement} taskTitle - HTML element specifies that taskTitle.
 */
function toggleTaskTitle(taskTitle) {
    if (activeTask.isFinished) {
        taskTitle.addClass("finished");
        getElementById("checkbox").prop("checked", true);
    } else {
        taskTitle.removeClass("finished");
        getElementById("checkbox").prop("checked", false);
    }
}

/**
 * Returns Step div in Page.
 */
function getStepDiv() {
    var divElement = createElementByTagName("DIV");
    divElement.addClass("step");
    return divElement;
}

/**
 * Returns Step div checkbox for step in page.
 * 
 * @param {Object} step - Object used to set ID attribute HTML elements.
 */
function getCheckBoxDivWithCheckBox(step) {
    var checkBoxDiv = createElementByTagName("DIV");
    checkBoxDiv.attr("class", "checkBox");
    var checkBox = createElementByTagName("INPUT");
    checkBox.attr("type", "checkbox");
    checkBox.attr("id", "stepId" + step.id);
    checkBox.attr("name", step.id);
    addEventListener(checkBox, "change", eventOperationForStepCheckBox);
    var label = createElementByTagName("LABEL");
    label.attr("for", "stepId" + step.id);
    appendParentAndChild(checkBoxDiv, checkBox);
    appendParentAndChild(checkBoxDiv, label);
    if (step.isFinished) {
        checkBox.attr("checked", true);
    } else {
        checkBox.attr("checked", false);
    }
    return checkBoxDiv;
}

/**
 * Returns Step inner div in page.
 */
function getStepInnerDiv() {
    var divElement = createElementByTagName("DIV");
    divElement.attr("class", "stepTitle");
    return divElement;
}

/**
 * Returns Span element with step name.
 * 
 * @param {Object} step - Object used to set name in that span element.
 */
function getStepSpanWithName(step) {
    let spanElement = createElementByTagName("SPAN");
    let textElement = createTextNode(step.name);
    appendParentAndChild(spanElement, textElement);
    if (step.isFinished) {
        spanElement.addClass("finished");
    } else {
        spanElement.removeClass("finished");
    }
    return spanElement;
}

/**
 * Return Span element with deletion icon.
 * 
 * @param {Object} step - Object used to set ID attribute in that span element.
 */
function getSpanForDeletion(step) {
    let spanElementForDeletion = createElementByTagName("SPAN");
    spanElementForDeletion.attr("class", "deletion");
    spanElementForDeletion.attr("id", step.id);
    addEventListener(spanElementForDeletion, "click", stepDeletionOperation)
    let textElementForDeletion = document.createTextNode("x");
    appendParentAndChild(spanElementForDeletion, textElementForDeletion);
    return spanElementForDeletion;
}

/**
 * Loads Steps in page.
 */
function loadSteps() {
    var taskTitle = getElementById("taskName");
    taskTitle.html(activeTask.name);
    toggleTaskTitle(taskTitle);
    var stepContainer = getElementById("stepsContainer");
    setElementAsEmpty(stepContainer);
    var undeletedSteps = getUndeletedObjects(activeTask.steps);
    for (let stepIndex in undeletedSteps) {
        let step = undeletedSteps[stepIndex];
        let divElement = getStepDiv();
        let checkBoxDiv = getCheckBoxDivWithCheckBox(step);
        appendParentAndChild(divElement, checkBoxDiv);
        let innerDivElement = getStepInnerDiv();
        let spanElement = getStepSpanWithName(step);
        let spanElementForDeletion = getSpanForDeletion(step);
        appendParentAndChild(innerDivElement, spanElement);
        appendParentAndChild(innerDivElement, spanElementForDeletion);
        appendParentAndChild(divElement, innerDivElement);
        appendParentAndChild(stepContainer, divElement);
    }
}

/**
 * Toggles Open and close left panel operation.
 */
function sidePanelOperation() {
    var sideMenu = getElementById("sideMenu");
    if("leftPanelContainer" == sideMenu.attr("class")) {
        closeLeftPanel(sideMenu);
    } else {
        openLeftPanel(sideMenu);
    }
}

/**
 * Soft Deletes step.
 */
function stepDeletionOperation() {
    if (confirm("Are you sure want to delete step")) {
        var stepId = event.target.id;
        var step = activeTask.steps.find(step => step.id === stepId);
        step.status = false;
        loadSteps();
        loadTasks();
    }
}

/**
 * Closes Left Panel.
 * 
 * @param {JQuery} sideMenu 
 */
function closeLeftPanel(sideMenu) {
    sideMenu.addClass("closeLeftPanelContainer").removeClass("leftPanelContainer");
    getElementById("listInput").addClass("displayNone");
    var leftPanelTitle = document.getElementsByClassName("leftPanelTitle");
    [...leftPanelTitle].forEach ( element => {
        element.classList.replace("leftPanelTitle", "displayNone");
    });
}

/**
 * Opens Left Panel.
 * 
 * @param {HTMLElement} sideMenu 
 */
function openLeftPanel(sideMenu) {
    sideMenu.addClass("leftPanelContainer").removeClass("closeLeftPanelContainer");
    getElementById("listInput").removeClass("displayNone");
    var leftPanelTitle = document.getElementsByClassName("displayNone");
    [...leftPanelTitle].forEach ( element => {
        element.classList.replace("displayNone", "leftPanelTitle");
    });
}

/**
 * Checks whether pressed key is "ENTER" when create list.
 */
function listInputOperation() {
    if (this.value != "") {
        if (event.keyCode == 13) {
            createList(listInput);
        }
    }
}

/**
 * Creates list object from listInput.
 * 
 * @param {string} listInput - String that specifies list input value.
 */
function createList(listInput) {
    var list = new Object();
    list.id = create_UUID();
    list.name = listInput.value;
    list.tasks = [];
    list.status = true;
    collectionOfList.push(list);
    activeList = list;
    getElementById("displayListTitle").innerHTML = listInput.value;
    listInput.value = "";
    setElementAsEmpty(getElementById("tasksContainer"));
    loadLists();
}

/**
 * Checks whether pressed key is "ENTER" when create task.
 */
function taskInputOperation() {
    if (this.value != "") {
        if (event.keyCode == 13) {
            createTask(taskInput);
        }
    }
}

/**
 * Checks whether pressed key is "ENTER" when create step.
 */
function stepInputBoxOperation() {
    if (this.value != "") {
        if (event.keyCode == 13) {
            createStep(stepInput);
        }
    }
}

/**
 * Creates task object from taskInput.
 * 
 * @param {string} taskInput - String that specifies task input value.
 */
function createTask(taskInput) {
    var task = new Object();
    task.id = create_UUID();
    task.name = taskInput.value;
    task.steps = [];
    task.isFinished = false;
    activeList.tasks.push(task);
    taskInput.value = "";
    loadTasks();
}

/**
 * Creates task object from stepInput.
 * 
 * @param {string} stepInput - String that specifies task input value.
 */
function createStep(stepInput) {
    var step = new Object();
    step.id = create_UUID();
    step.name = stepInput.value;
    step.isFinished = false;
    step.status = true;
    activeTask.steps.push(step);
    stepInput.value = "";
    loadSteps();
    loadTasks();
}

/**
 * Shows right panel with clicked task details.
 */
function taskClickOperation(event) {
    if (event.target.tagName === 'INPUT') {
        var activeTaskId = event.target.name;
    } else {
        var activeTaskId = event.target.id;
    }
    activeTask = activeList.tasks.find(task => task.id === activeTaskId);
    if (typeof activeTask !== 'undefined') {
        getElementById("taskDetails").removeClass("displayNone");
        loadSteps();
    }
}

/**
 * Hide right panel.
 */
function listOperation() {
    activeList = collectionOfList.find(list => list.id === event.target.id);
    getElementById("taskDetails").addClass("displayNone");
    loadTasks();
}

/**
 * Creates UUID to set ID attribute to object.
 */
function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
