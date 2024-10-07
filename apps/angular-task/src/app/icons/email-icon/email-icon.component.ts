import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'crx-email-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './email-icon.component.html',
    styleUrl: './email-icon.component.scss',
})
export class EmailIconComponent {

    @Input() size = '24';
    @Input() fill = 'currentColor';

}
