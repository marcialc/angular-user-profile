import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'crx-website-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './website-icon.component.html',
    styleUrl: './website-icon.component.scss',
})
export class WebsiteIconComponent {

    @Input() size = '24';
    @Input() fill = 'currentColor';

}
