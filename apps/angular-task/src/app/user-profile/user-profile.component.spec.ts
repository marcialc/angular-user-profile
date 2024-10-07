import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService, UserFavoritesService, User } from '@angular-task/core-services';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MOCK_USERS } from '../../utils/users-service.mock';

const MOCK_USER = MOCK_USERS[0];

describe('UserProfileComponent', () => {

    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;
    let usersServiceMock: jest.Mocked<UsersService>;
    let userFavoritesServiceMock: jest.Mocked<UserFavoritesService>;
    let routerMock: Router;

    beforeEach(async () => {

        usersServiceMock = {
            getUserById: jest.fn().mockReturnValue(of(MOCK_USER)),
            getAvatarForUser: jest.fn((name: string) => `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&rounded=true`),
        } as unknown as jest.Mocked<UsersService>;

        userFavoritesServiceMock = {
            toggleFavorite: jest.fn(),
            isFavorite: jest.fn().mockReturnValue(false),
        } as unknown as jest.Mocked<UserFavoritesService>;

        await TestBed.configureTestingModule({
            imports: [UserProfileComponent],
            providers: [
                { provide: UsersService, useValue: usersServiceMock },
                { provide: UserFavoritesService, useValue: userFavoritesServiceMock },
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } } },
                },
                provideHttpClientTesting(),
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        routerMock = TestBed.inject(Router);
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should load user on initialization', () => {

        expect(usersServiceMock.getUserById).toHaveBeenCalledWith(1);
        expect(component.user).toEqual(MOCK_USER);

    });

    it('should format address correctly', () => {

        const address = {
            suite: 'Apt 1',
            street: '123 st',
            city: 'Huntington Beach',
            zipcode: '92648',
        } as User['address'];

        const formattedAddress = component.formatAddress(address);
        expect(formattedAddress).toBe('Apt 1, 123 st, Huntington Beach, 92648');

    });

    it('should format website correctly', () => {

        const website = 'example.com';
        const formattedWebsite = component.formatWebsite(website);
        expect(formattedWebsite).toBe('https://example.com');

    });

    it('should toggle favorite when favorite button is clicked', () => {

        const userId = 1;
        const event = new MouseEvent('click');
        component.toggleFavorite(event, userId);
        expect(userFavoritesServiceMock.toggleFavorite).toHaveBeenCalledWith(userId);

    });

    it('should check if user is favorite', () => {

        const userId = 1;
        expect(component.isFavorite(userId)).toBe(false);
        expect(userFavoritesServiceMock.isFavorite).toHaveBeenCalledWith(userId);

    });

    it('should navigate back to the users list when back button is clicked', () => {

        jest.spyOn(routerMock, 'navigate');
        component.handleBackButton();
        expect(routerMock.navigate).toHaveBeenCalledWith(['/users']);

    });

});
