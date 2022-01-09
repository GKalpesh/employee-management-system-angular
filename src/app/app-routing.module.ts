import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



//importing Components
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { UserListComponent } from './user-list/user-list.component'
import { HrListComponent } from './hr-list/hr-list.component'
import { EDetailsComponent } from './edetails/edetails.component'
import { AuthGuard } from './Auth/auth.guard'
  import { from } from 'rxjs';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'UserProfile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'hrList', component: HrListComponent },
  { path: 'userList', component: UserListComponent },
  { path: 'Edetails', component: EDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
