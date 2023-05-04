import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tatasteelmining';
  onlineMessage:any;

  constructor(private _router: Router) {
    this.createOnline$().subscribe((isOnline) => {
      if (isOnline) {
        this.onlineMessage = 'You are connected to internet';
      } else {
        this.onlineMessage =
          'Connection lost, Please check your internet connection.';
          // window.confirm("Connection lost, Please check your internet connection.");
        this._router.navigate(['/others/connection-lost']);
      }
    });
  }

  createOnline$() {
    return merge(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }

}
