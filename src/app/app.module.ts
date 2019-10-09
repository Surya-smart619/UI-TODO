import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoSidepanelComponent } from './todo-sidepanel/todo-sidepanel.component';
import { TodoTasksComponent } from './todo-tasks/todo-tasks.component';
import { TodoRightpanelComponent } from './todo-rightpanel/todo-rightpanel.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoHeaderComponent,
    TodoSidepanelComponent,
    TodoTasksComponent,
    TodoRightpanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
