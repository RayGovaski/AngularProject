import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { MedicoComponent } from './medico/medico.component';
import { PacienteComponent } from './paciente/paciente.component';
import { RemedioComponent } from './remedio/remedio.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ProntuarioComponent } from './prontuario/prontuario.component';
import { HomeComponent } from './home/home.component';
import { PacientesMedicoComponent } from './pacientes-medico/pacientes-medico.component';
import { ProntuariosPacienteComponent } from './prontuarios-paciente/prontuarios-paciente.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ImagemComponent } from './imagem/imagem.component';

const routes: Routes = [
  {
  path: 'layout',
  component: LayoutComponent,
  children: [
    { path: 'prontuarios-paciente', component: ProntuariosPacienteComponent },
    { path: 'lista-usuario', component: RemedioComponent },
    { path: 'prontuario/:key', component: ProntuarioComponent },
    { path: 'lista-paciente', component: PacientesMedicoComponent },
  ]
},
{path: 'imagem', component: ImagemComponent},
{path: 'cadastro', component: CadastroComponent},
{path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
