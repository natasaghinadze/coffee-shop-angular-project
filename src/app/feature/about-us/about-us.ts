import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {
  values = [
    { num: '01', title: 'Freshly Roasted', text: 'Fresh flavour, from the first aroma to the last sip.' },
    { num: '02', title: 'Thoughtfully Crafted', text: 'Care in the details. Character in every cup.' },
    { num: '03', title: 'Made for Everyday Moments', text: 'For slow mornings and everything in between.' },
  ];
}
