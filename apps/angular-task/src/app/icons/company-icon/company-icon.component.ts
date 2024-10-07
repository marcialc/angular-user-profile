import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'crx-company-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './company-icon.component.html',
    styleUrl: './company-icon.component.scss',
})
export class CompanyIconComponent {

    @Input() size = '24';
    @Input() fill = 'currentColor';

}
