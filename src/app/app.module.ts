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
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LayoutComponent } from './layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { environment } from '../environment/enviroment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { HttpClientModule } from '@angular/common/http';
import { ImagemComponent } from './imagem/imagem.component';

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
    ProntuariosPacienteComponent,
    PerfilComponent,
    LayoutComponent,
    DashboardComponent,
    ImagemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    //import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
