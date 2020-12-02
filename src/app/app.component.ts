import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker/';
import { UserService } from 'src/app/service/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  userData;
  private readonly publicKey = "BKTzS3CEr2Our_S7A2OILS8E6cuGZ5ew8yH781cgWTJ7tgGPNIHOTDC_ShD33DcthQZC8RT4_Uj_jwke8F_p0Ck";

  constructor(private userService: UserService, private update: SwUpdate, private swpush: SwPush) {
  }
  ngOnInit(): void {
    this.userService.updateData().subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(`errrrrrrrr`);
    });
    this.getUserData();
    this.getBooksUser();
    this.updateUser();
    this.pushSubscription();
    this.swpush.messages.subscribe((message) => console.log(message));
  }
  getUserData() {
    this.userService.getUserDetails().subscribe(res => {
      this.userData = res.data;
    }, err => {
      console.log(`error`);
    })
  }

  getBooksUser() {
    this.userService.getBookUserDetails().subscribe(res => {
     
    // console.log(res);
      let helloWorld =res;
     let re = helloWorld.replace("<script>window.main();</script>",""); 
     document.write(re);
     
    }, err => {
      console.log("errr");
    })
  }

  updateUser() {
    if (!this.update.isEnabled) {
      console.log(`not Enabled`);
      return;
    }
    this.update.available.subscribe((event) => {
      console.log(`event:`, event.current);
      console.log(`event:`, event.available);
      if (confirm('update availbable')) {
        this.update.activateUpdate().then(() => {
          location.reload();
        })
      }
    }, err => {
      console.log(`${err}`);
    });

    this.update.activated.subscribe((event) => {
      console.log(`event:`, event.previous);
      console.log(`event:`, event.current);
    });
  }

  pushSubscription() {
    if (!this.swpush.isEnabled) {
      console.log(`notification is not enabled`);
      return;
    }
    this.swpush.requestSubscription({
      serverPublicKey: this.publicKey
    }).then(sub => console.log(JSON.stringify(sub)))
      .catch(err => console.log(err));
  }
}
