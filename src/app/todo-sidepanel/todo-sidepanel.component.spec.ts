import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSidepanelComponent } from './todo-sidepanel.component';

describe('TodoSidepanelComponent', () => {
  let component: TodoSidepanelComponent;
  let fixture: ComponentFixture<TodoSidepanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoSidepanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoSidepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
