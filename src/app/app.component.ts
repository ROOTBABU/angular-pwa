import { Component,OnInit } from '@angular/core';
import {SwUpdate} from '@angular/service-worker/';
import { UserService } from 'src/app/service/user.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  userData;
  constructor(private userService:UserService){ 
  }
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData(){
    this.userService.getUserDetails().subscribe(res=>{
      console.log(`${res.data}`);
      this.userData = res.data;
    },err=>{
      console.log(`error`);
    })
  }

}
