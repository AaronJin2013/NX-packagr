import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'root',
    template: `
  <h1>Root</h1>
  <router-outlet></router-outlet>
  `,
    styleUrls: ['./app.component.css']
})
export class RootComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
