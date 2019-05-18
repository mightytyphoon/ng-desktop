import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  dir: any;

  constructor() {
    this.dir = window.fs.readdirSync('.');
    console.log(this.dir);
    console.log(location.pathname);
    console.log(location.hash);
    console.log(location);
    const href = location.href;
    console.log(window.nw);
  }

  ngOnInit() {
  }

}
