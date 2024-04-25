import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuariosPacienteComponent } from './prontuarios-paciente.component';

describe('ProntuariosPacienteComponent', () => {
  let component: ProntuariosPacienteComponent;
  let fixture: ComponentFixture<ProntuariosPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProntuariosPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProntuariosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
