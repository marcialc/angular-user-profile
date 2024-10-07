import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeControllerComponent } from './theme-controller/theme-controller.component';

@Component({
    standalone: true,
    imports: [RouterModule, ThemeControllerComponent],
    selector: 'crx-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    title = 'angular-task';

}
