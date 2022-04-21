import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDetails } from '../login-details';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetail:LoginDetails=new LoginDetails();
  constructor(private userService:UserService,private router:Router,
              private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
  }
  loginUser(formValue:NgForm){
    this.submitDetails(this.loginDetail);
  }

  submitDetails(loginDetail:LoginDetails){
    this.userService.loginUserAccount(loginDetail).subscribe(
      data=>{
        console.log(" LOGGED IN SUCCESSFULL........");
        console.log(data);
        this.redirectToUserProfile(loginDetail.email);
        //this.mesg=data;
        
      
      },
      error=>{
        console.log("FAILED TO LOGGED IN........");
        console.log(error);
      }
    
    );

  }
  redirectToUserProfile(email:string){
    this.router.navigate(['/user-profile',email]);
  }
  navigateToForgetPswdComponent(){
    this.router.navigate(['/forgot-password']);
  }
  navigateToRegisterUserComponent(){
   this.router.navigate(['/register-user']) 
  }

}
