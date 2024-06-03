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
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

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
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
