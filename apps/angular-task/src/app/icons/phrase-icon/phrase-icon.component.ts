import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'crx-phrase-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './phrase-icon.component.html',
    styleUrl: './phrase-icon.component.scss',
})
export class PhraseIconComponent {

    @Input() size = '24';
    @Input() fill = 'currentColor';

}
