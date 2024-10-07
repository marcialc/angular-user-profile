import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'crx-close-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './close-icon.component.html',
    styleUrl: './close-icon.component.scss',
})
export class CloseIconComponent {

    @Input() size = '24';
    @Input() fill = 'currentColor';

}
