import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './Login/login-page/login-page.component';
import {MyProfileViewPageComponent} from './Profile/my-profile-view-page/my-profile-view-page.component';
import {MyProfileEditPageComponent} from './Profile/my-profile-edit-page/my-profile-edit-page.component';
import {PageContainerComponent} from './UserViewPage/page-container/page-container.component';
import {AuthGuard} from './guard/routerGuard';


const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'profile', component: MyProfileEditPageComponent, canActivate: [AuthGuard]},
  {path: 'profile/:id', component: MyProfileViewPageComponent, canActivate: [AuthGuard]},
  {path: 'map', component: PageContainerComponent, canActivate: [AuthGuard]},
  {path: 'list', component: PageContainerComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
