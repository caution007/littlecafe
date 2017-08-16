import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnewspostComponent } from './editnewspost.component';

describe('EditnewspostComponent', () => {
  let component: EditnewspostComponent;
  let fixture: ComponentFixture<EditnewspostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditnewspostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnewspostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
