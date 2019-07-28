import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { PageNotFoundComponent } from './other/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { EditProfileComponent } from './shared/profile/edit-profile/edit-profile.component';

  const appRoutes: Routes = [
    {
      path: '',
      redirectTo: "/login",
      pathMatch:"full"
    },
    {
      path: "login",
      component: LoginComponent,
    },
    {
      path:"home",
      component: HomeComponent,
    },
    {
      path: "profile",
      component: ProfileComponent,
    },
    {
      path: "editProfile",
      component: EditProfileComponent,
    },
    {path: '404', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/404'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


