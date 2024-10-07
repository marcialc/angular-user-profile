import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'crx-search-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './search-icon.component.html',
    styleUrl: './search-icon.component.scss',
})
export class SearchIconComponent {

    @Input() size = '24';
    @Input() fill = 'currentColor';

}
