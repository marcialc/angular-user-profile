import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'crx-pin-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pin-icon.component.html',
    styleUrl: './pin-icon.component.scss',
})
export class PinIconComponent {

    @Input() size = '24';
    @Input() fill = 'currentColor';

}
