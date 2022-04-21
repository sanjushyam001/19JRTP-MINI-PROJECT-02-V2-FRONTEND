import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  email:string='';
  constructor(private userService:UserService,router:Router,
    private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmail();
  }
  getEmail(){
    this.email=this.activeRouter.snapshot.params['email'];
    console.log("USER PROFILE EMAIL ID ::"+this.email);
    
  }

}
