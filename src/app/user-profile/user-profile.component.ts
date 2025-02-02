import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails : any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {}
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login'])
  }

  checkRole(){
    if(this.userDetails.role == "HR"){
      this.router.navigate(['/hrList'])
    }
    else{
      this.router.navigate(['/userList'])
    }
  }

}
