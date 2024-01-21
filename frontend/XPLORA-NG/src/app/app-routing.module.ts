import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { CreateToursComponent } from './create-tours/create-tours.component';
import { ToursComponent } from './tours/tours.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tours', component: ToursComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UsersComponent },
  { path: 'update', component: CreateToursComponent },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
