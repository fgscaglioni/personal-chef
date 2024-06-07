import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {

  constructor() { }

  navigateTo(url: string) {
    window.open(url, '_blank');
  }

}
