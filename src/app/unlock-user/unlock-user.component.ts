import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnlockDetails } from '../unlock-details';
import { UserService } from '../user.service';

@Component({
  selector: 'app-unlock-user',
  templateUrl: './unlock-user.component.html',
  styleUrls: ['./unlock-user.component.css']
})
export class UnlockUserComponent implements OnInit {
email:string='';
mesg:string='';
unlockDetail:UnlockDetails=new UnlockDetails();
  constructor(private userService:UserService,router:Router,
    private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmail();
  }

  getEmail(){
    this.email=this.activeRouter.snapshot.params['email'];
    console.log("UPDATED ID ::"+this.email);
    this.unlockDetail.email=this.email;
  }
  unLockUserAccount(formValue:NgForm){
    this.submitDetails(this.unlockDetail);
    formValue.resetForm();
  }
  //save user

  submitDetails(unlockDetail:UnlockDetails){
    this.userService.unlockUserAccount(unlockDetail).subscribe(
      data=>{
        console.log(" UNLOCKED SUCCESSFULL........");
        console.log(data);
        this.mesg=data;
        
      
      },
      error=>{
        console.log("FAILED TO UNLOCKED........");
        console.log(error);
      }
    
    );

  }
}
