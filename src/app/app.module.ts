import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginPageComponent} from './Login/login-page/login-page.component';
import {MyProfilePageComponent} from './Profile/my-profile-page/my-profile-page.component';
import {MyProfileViewPageComponent} from './Profile/my-profile-view-page/my-profile-view-page.component';
import {MyProfileEditPageComponent} from './Profile/my-profile-edit-page/my-profile-edit-page.component';
import {UserViewPageComponent} from './user-view-page/user-view-page.component';
import {MapViewComponent} from './UserViewPage/map-view/map-view.component';
import {ListViewComponent} from './UserViewPage/list-view/list-view.component';
import {TopNavBarComponent} from './UserViewPage/top-nav-bar/top-nav-bar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {PageContainerComponent} from './UserViewPage/page-container/page-container.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MyProfilePageComponent,
    MyProfileViewPageComponent,
    MyProfileEditPageComponent,
    UserViewPageComponent,
    MapViewComponent,
    ListViewComponent,
    TopNavBarComponent,
    PageContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatIconModule,
    MatPaginatorModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
