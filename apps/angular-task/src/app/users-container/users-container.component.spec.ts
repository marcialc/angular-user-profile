import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersContainerComponent } from './users-container.component';
import { UsersService } from '@angular-task/core-services';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ThemeControllerComponent } from '../theme-controller/theme-controller.component';
import { UsersComponent } from '../users/users.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { FilterDrawerComponent } from '../filter-drawer/filter-drawer.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MOCK_USERS } from '../../utils/users-service.mock';
import { of } from 'rxjs';

describe('UsersContainerComponent', () => {

    let component: UsersContainerComponent;
    let fixture: ComponentFixture<UsersContainerComponent>;
    let usersServiceMock: jest.Mocked<UsersService>;

    beforeEach(async () => {

        usersServiceMock = {
            filterUsersBy: jest.fn(),
            sortUsers: jest.fn(),
            getUsers: jest.fn().mockReturnValue(of(MOCK_USERS)),
            getFilteringOptions: jest.fn().mockReturnValue(of([
                { key: 'name', options: ['Alice', 'Bob'] },
                { key: 'email', options: ['alice@example.com', 'bob@example.com'] },
            ])),
            getAvatarForUser: jest.fn((name: string) => `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&rounded=true`),
        } as unknown as jest.Mocked<UsersService>;

        await TestBed.configureTestingModule({
            imports: [
                SearchBarComponent,
                ThemeControllerComponent,
                UsersComponent,
                UserProfileComponent,
                FilterDrawerComponent,
            ],
            providers: [{ provide: UsersService, useValue: usersServiceMock }],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(UsersContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create the component', () => {

        expect(component).toBeTruthy();

    });

    it('should filter users by name when handleFilterUserByName is called', () => {

        const searchTerm = 'John Doe';
        component.handleFilterUserByName(searchTerm);
        expect(usersServiceMock.filterUsersBy).toHaveBeenCalledWith([
            { attribute: 'name', value: searchTerm },
        ]);

    });

    it('should sort users when handleSortChange is called', () => {

        const eventMock = { target: { value: 'name' } };
        component.handleSortChange(eventMock as unknown as Event);
        expect(usersServiceMock.sortUsers).toHaveBeenCalledWith('name');

    });

    it('should close the drawer when closeDrawer is called', () => {

        const drawerCheckbox = document.getElementById('drawer-checkbox') as HTMLInputElement;
        component.closeDrawer();
        expect(drawerCheckbox.checked).toBe(false);

    });

});
