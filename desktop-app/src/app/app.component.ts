import { Component } from '@angular/core';
// declare const nw: any; // TODO global declaration
// https://dev.to/thejaredwilcurt/angular-cli-and-nwjs-for-development-49gl

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    window.nw.Window.get().showDevTools();
    const dir = window.fs.readdirSync('./');
    console.log(window.nw);
    console.log(dir);
  }
  title = 'desktop-app';
}
