import { Component, input } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-pdf',
  imports: [NgxExtendedPdfViewerModule],
  templateUrl: './pdf.html',
  styleUrl: './pdf.scss',
})
export class Pdf {
  link = input.required<string>();
}
