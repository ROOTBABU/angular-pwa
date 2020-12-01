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
  constructor(private userService:UserService,private update:SwUpdate){ 
  }
  ngOnInit(): void {
    this.getUserData();
    this.updateUser();
  }
  getUserData(){
    this.userService.getUserDetails().subscribe(res=>{
      this.userData = res.data;
    },err=>{
      console.log(`error`);
    })
  }

  updateUser(){
    if(!this.update.isEnabled){
      console.log(`not Enabled`);
      return;
    }
    this.update.available.subscribe((event)=>{
      console.log(`event:`,event.current);
      console.log(`event:`,event.available);
      if(confirm('update availbable')){
        this.update.activateUpdate().then(()=>{
          location.reload();
        })
      }
    },err=>{
      console.log(`${err}`);
    });

    this.update.activated.subscribe((event)=>{
      console.log(`event:`,event.previous);
      console.log(`event:`,event.current);

    });
  }
}
