import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AwardsDialog } from './awards-dialog/awards-dialog';

@Component({
  selector: 'app-about',
  imports: [RouterModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  readonly dialog = inject(MatDialog);

  aboutBody = [
    "I'm an independent designer based in Pretoria/Johannesburg working on remote and hands-on projects that carry meaning, not just decoration – with a taste for adventure, gold ink and sustainable designs that support the earth.",
    'My work lives at the intersection of craft and concept - I believe that every visual decision carries purpose and that the considered choices often say the most. My work has grown through a mix of independent client projects, self-initiated explorations and cross-disciplinary roles. ',
    "When I'm not at my desk, I'm hiking some mountain peak or trekking through some Spanish village on horseback. ",
  ];

  skills = [
    'Advertising & Campaign',
    'Brand Identity',
    'Digital & Web',
    'Editorial',
    'Environmental',
    'Merch & Product',
    'Motion & Animation',
    'Packaging',
  ];

  constructor() {}

  openAwards(): void {
    this.dialog.open(AwardsDialog, { width: '90%', height: '80%' });
  }
}
