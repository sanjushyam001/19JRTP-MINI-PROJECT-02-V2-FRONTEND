import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  user:User=new User();
  countries:Map<number,string>=new Map<number,string>();
  states:Map<number,string>=new Map<number,string>();
  cities:Map<number,string>=new Map<number,string>();
  mesg:string='';
  saveUserAlert:boolean=false;
  emailDuplicacyCheck:string='';
  emailCheck:boolean=false;
  invalidCheck:string="";

  constructor(private httpClient:HttpClient,private userService:UserService) { 

  }

  ngOnInit(): void {
    this.loadAllCountries();
  }

  //save user

  saveUser(user:User){
    this.userService.createUser(this.user).subscribe(
      data=>{
        console.log("SUCCESSFULL........");
        console.log(data);
        this.mesg=data+" , We have sent an email with a temporary password to your email address ";
        this.saveUserAlert=true;
      
      },
      error=>{
        console.log("FAILED........");
        console.log(error);
      }
    
    );

  }

   //invoked getAllCountries() from CustomerService
   loadAllCountries(){
    this.userService.getAllCountries().subscribe(

      data=>{
        console.log("RECIEVED DATA: "+data);
        
        this.countries=data;
      },
      error=>{
        console.log("SOEMTHING WENT WRONG .."+ error);
        
      }
    );
  }

    //getting value from country dropdown list
 
    onChangeCountry(e:any){
      console.log("Country value: "+(typeof parseInt(e.target.value)));
      
      this.userService.getStatesByCountryId(parseInt(e.target.value)).subscribe(

        data=>{
          console.log("RECIEVED STATES: "+data);
          
          this.states=data;
        },
        error=>{
          console.log("Something went wrong .. "+error);
          
        }
      );
      
    }

    //getting value from country dropdown list
 
    onChangeState(e:any){
      console.log("Country value: "+(typeof parseInt(e.target.value)));
      
      this.userService.getCitiesByStateId(parseInt(e.target.value)).subscribe(

        data=>{
          console.log("RECIEVED STATES: "+data);
          
          this.cities=data;
        },
        error=>{
          console.log("Something went wrong .. "+error);
          
        }
      );
      
    }

    addUser(formValue:NgForm){
      
      this.saveUser(this.user);   
      this.restForm(formValue);   
    }

     restForm(formValue:NgForm){
       formValue.resetForm();
     }
     isEmailDuplicate(e:any){
       console.log("TESTING BLUR EVENT & EMAIL : "+(e.target.value));
       let email=e.target.value;
       this.userService.checkEmailDuplicacy(email).subscribe(
         data=>{
          let statusObj=JSON.parse(JSON.stringify(data));
          console.log(statusObj.status);
          if(statusObj.status==="UNIQUE"){
            this.emailDuplicacyCheck='';
            this.emailCheck=false;
            this.invalidCheck="";
          }else{
            this.emailDuplicacyCheck='Email is already registered'
            this.emailCheck=true;
            this.invalidCheck="is-invalid";
          }
          
         },
         error=>{

         });
       
     }

}
