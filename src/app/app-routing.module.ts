import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { PageNotFoundComponent } from './other/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { EditProfileComponent } from './shared/edit-profile/edit-profile.component';
import { AuthGuard } from './Auth/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editProfile",
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


