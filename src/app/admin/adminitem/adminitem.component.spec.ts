import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminitemComponent } from './adminitem.component';

describe('AdminitemComponent', () => {
  let component: AdminitemComponent;
  let fixture: ComponentFixture<AdminitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
