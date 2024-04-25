import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicoComponent } from './medico/medico.component';
import { PacienteComponent } from './paciente/paciente.component';
import { RemedioComponent } from './remedio/remedio.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ProntuarioComponent } from './prontuario/prontuario.component';
import { HomeComponent } from './home/home.component';
import { PacientesMedicoComponent } from './pacientes-medico/pacientes-medico.component';
import { ProntuariosPacienteComponent } from './prontuarios-paciente/prontuarios-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicoComponent,
    PacienteComponent,
    RemedioComponent,
    LoginComponent,
    CadastroComponent,
    ProntuarioComponent,
    HomeComponent,
    PacientesMedicoComponent,
    ProntuariosPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
