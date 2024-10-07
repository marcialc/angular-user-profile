import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'crx-favorite-off-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './favorite-off-icon.component.html',
    styleUrl: './favorite-off-icon.component.scss',
})
export class FavoriteOffIconComponent {

    @Input() size = '24';
    @Input() fill = 'currentColor';

}
