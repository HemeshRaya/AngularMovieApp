import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { LoginService } from '../login.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  btntxt = "click here";
  userDetails:any={};
  unameShowHide=false;
  passShowHide=false;
  constructor(public loginService:LoginService,
              private router: Router,
              public _snackBar: MatSnackBar,
              public sessionStorageService:SessionStorageService) { }

  ngOnInit(): void {
  }

  openSnackBar(data:any,duration:number){
    this._snackBar.openFromComponent(SnackbarComponent,{
      data:data,
      duration:duration
    })
  }

  loginbtn(){
    this.unameShowHide=false;
    this.passShowHide=false;
    if(this.userDetails.uname==undefined||this.userDetails.uname===''){
      this.unameShowHide=true;
      return;
    }
    if(this.userDetails.pass==undefined||this.userDetails.pass===''){
      this.passShowHide=true;
      return;
    }
    if(this.userDetails.uname=="admin"&&this.userDetails.pass=="admin"){
      this.router.navigate(['/homepage']);
      this.openSnackBar({
        type:'success',message:'Login Successful'
      },5000);
    }
    else{
      this.openSnackBar({
        type:'error',message:'Invalid credentials'
      },5000);
    }
    //orginal flow
    // this.loginService.getToken(this.userDetails).subscribe((data)=>{
    //   console.log(data.is_success)
    //   if(data.is_success){
    //     this.sessionStorageService.set('userToken',data.data.token);
    //     this.router.navigate(['/homepage']);
    //     this.openSnackBar({
    //       type:'success',message:'Login Successful'
    //     },5000);
    //   }
    //   else{
    //     this.openSnackBar({
    //       type:'error',message:'Invalid credentials'
    //     },5000);
    //   }
    // },
    // (err)=>{
    //   this.openSnackBar({
    //     type:'error',message:'Invalid credentials'
    //   },5000);
    // })
  }

}
