import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './Login/login-page/login-page.component';
import {MyProfileViewPageComponent} from './Profile/my-profile-view-page/my-profile-view-page.component';
import {MyProfileEditPageComponent} from './Profile/my-profile-edit-page/my-profile-edit-page.component';
import {PageContainerComponent} from './UserViewPage/page-container/page-container.component';


const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'profile', component: MyProfileEditPageComponent},
  {path: 'profile/:id', component: MyProfileViewPageComponent},
  {path: 'map', component: PageContainerComponent},
  {path: 'list', component: PageContainerComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
