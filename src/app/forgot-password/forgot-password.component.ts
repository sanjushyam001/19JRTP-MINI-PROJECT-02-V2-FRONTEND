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
        this.mesg=statusObj.status;

        
      }
    );
    console.log("EMAIL:: "+this.email);
    
  }

}
