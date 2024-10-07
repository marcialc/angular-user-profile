import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'crx-favorite-on-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './favorite-on-icon.component.html',
    styleUrl: './favorite-on-icon.component.scss',
})
export class FavoriteOnIconComponent {

    @Input() size = '24';
    @Input() fill = 'currentColor';

}
