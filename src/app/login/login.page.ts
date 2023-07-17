import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FireserviceService } from '../fireservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: any;
  public password: any;

  constructor(
    private navCtrl: NavController,
    public fireService: FireserviceService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.fireService.login({ email: this.email, password: this.password }).then(
      (res) => {
        this.navCtrl.navigateForward('/tabs/tab1');
      },
      (err) => {
        alert(err.message);
        console.log(err);
      }
    );
    console.log('Login');
  }

  registro() {
    this.navCtrl.navigateForward('/signup');
    console.log('Funciona');
  }
}
