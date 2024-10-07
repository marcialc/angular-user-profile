import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'crx-user-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-icon.component.html',
    styleUrl: './user-icon.component.scss',
})
export class UserIconComponent {

    @Input() size = '24';
    @Input() fill = 'currentColor';

}
