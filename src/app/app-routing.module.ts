import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

  const appRoutes: Routes = [
    {
      path: '',
      redirectTo: "/home",
      pathMatch:"full"
    },
    { path: "home", component: ProfileComponent },
    {
      path: "login",
      component: LoginComponent,
    },
    {
      path: "profile",
      component: ProfileComponent,
    },
    // {path: '404', component: NotFoundComponent},
    // {path: '**', redirectTo: '/404'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


