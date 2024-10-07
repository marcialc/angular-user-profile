import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'crx-phone-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './phone-icon.component.html',
    styleUrl: './phone-icon.component.scss',
})
export class PhoneIconComponent {

    @Input() size = '24';
    @Input() fill = 'currentColor';

}
