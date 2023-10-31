import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loader = false;

  constructor(private authService: AuthService) {
    // this.loaderr.getLoader().subscribe(value => {
    //   this.loader = value;
    // });

    this.authService.getLoader().subscribe(value => {
      setTimeout(() => {
        this.loader = value;
      }, 100);
    });
  }
}
