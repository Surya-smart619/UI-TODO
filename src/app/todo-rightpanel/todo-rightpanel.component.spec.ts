import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoRightpanelComponent } from './todo-rightpanel.component';

describe('TodoRightpanelComponent', () => {
  let component: TodoRightpanelComponent;
  let fixture: ComponentFixture<TodoRightpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoRightpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoRightpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
