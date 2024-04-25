import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemedioComponent } from './remedio.component';

describe('RemedioComponent', () => {
  let component: RemedioComponent;
  let fixture: ComponentFixture<RemedioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemedioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
