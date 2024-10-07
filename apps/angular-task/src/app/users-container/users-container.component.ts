import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '@angular-task/core-services';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ThemeControllerComponent } from '../theme-controller/theme-controller.component';
import { UsersComponent } from '../users/users.component';
import { FilterDrawerComponent } from '../filter-drawer/filter-drawer.component';

@Component({
    selector: 'crx-users-container',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        SearchBarComponent,
        ThemeControllerComponent,
        UsersComponent,
        UserProfileComponent,
        FilterDrawerComponent
    ],
    templateUrl: './users-container.component.html',
    styleUrl: './users-container.component.scss',
})
export class UsersContainerComponent {

    @ViewChild('drawerCheckbox') drawerCheckbox: ElementRef<HTMLInputElement> | undefined;

    constructor (private usersService: UsersService) { }

    handleFilterUserByName = (searchTerm: string) => {

        this.usersService.filterUsersBy([{ attribute: 'name', value: searchTerm }]);

    };

    handleSortChange (event: Event) {

        const selectEl = event.target as HTMLSelectElement;
        const selectedValue = selectEl.value;
        this.usersService.sortUsers(selectedValue);

    }

    closeDrawer () {

        if (this.drawerCheckbox) {

            this.drawerCheckbox.nativeElement.checked = false;

        }

    }

}
