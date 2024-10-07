import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'crx-back-arrow-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './back-arrow-icon.component.html',
    styleUrl: './back-arrow-icon.component.scss',
})
export class BackArrowIconComponent {

    @Input() size = '24';
    @Input() fill = 'currentColor';

}
