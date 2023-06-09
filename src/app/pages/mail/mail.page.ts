import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AccountPage } from '../account/account.page';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {
  emails = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.http.get<any[]>('/assets/data.json').subscribe((res) => {
      this.emails = res.map((email) => {
        email.color = this.intToRGB(this.hashCode(email.from));
        return email;
      });
      console.log(this.emails);
    });
  }

  hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  intToRGB(i) {
    var c = (i & 0x00ffffff).toString(16).toUpperCase();

    return '#' + '00000'.substring(0, 6 - c.length) + c;
  }

  async openAccount(event) {
    const popover = await this.popoverCtrl.create({
      component: AccountPage,
      event: event,
      cssClass: 'custom-popover',
    });

    (await popover).present();
  }

  openDetails(id) {
    this.router.navigate(['tabs', 'mail', id]);
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
