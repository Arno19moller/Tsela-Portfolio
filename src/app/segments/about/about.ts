import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  aboutBody = [
    "I'm an independent designer based in Pretoria/Johannesburg working on remote and hands-on projects that carry meaning, not just decoration – with a taste for adventure, gold ink and sustainable designs that support the earth.",
    'My work lives at the intersection of craft and concept - I believe that every visual decision carry purpose and that the considered choices often say the most. My work has grown through a mix of independent client projects, self-initiated explorations and cross-disciplinary roles. ',
    "When I'm not at my desk, I'm hiking some mountain peak or trekking through some Spanish village on horseback. ",
  ];

  skills = [
    'Brand Identity',
    'Print',
    'Digital & Web',
    'Packaging',
    'Environmental',
    'Motion & Animation',
    'Editorial',
    'Advertising & Campaign',
    'Merch & Product',
  ];

  constructor() {}
}
