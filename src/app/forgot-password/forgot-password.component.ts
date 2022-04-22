import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email:string='';
  mesg:string='';
  alertType:string='';
  unlockAlert:boolean=false;
  constructor(private userService:UserService,private router:Router,
              private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
  }
  sendPasswordToEmail(formValue:NgForm){
    this.email= formValue.value.email;
    this.userService.sendPaswdToEmail(this.email).subscribe(
      data=>{
        
       //JSON.parse(JSON.stringify(data));
        let statusObj=JSON.parse(JSON.stringify(data));
        
        console.log(statusObj.status);
        if(statusObj.status=="valid"){
          this.mesg="Your password sent to your registered email"
          this.alertType="success";
          this.unlockAlert=true;
        }
        if(statusObj.status=="invalid"){
          this.mesg="Please enter your registered email"
          this.alertType="danger";
          this.unlockAlert=true;
        }

        
      }
    );
    console.log("EMAIL:: "+this.email);
    
  }

}
