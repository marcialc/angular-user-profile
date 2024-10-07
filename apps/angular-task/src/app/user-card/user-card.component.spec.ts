import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { UserFavoritesService, UsersService } from '@angular-task/core-services';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MOCK_USERS } from '../../utils/users-service.mock';
import { of } from 'rxjs';

const MOCK_USER = MOCK_USERS[0];

describe('UserCardComponent', () => {

    let component: UserCardComponent;
    let fixture: ComponentFixture<UserCardComponent>;
    let userFavoritesServiceMock: jest.Mocked<UserFavoritesService>;
    let usersServiceMock: jest.Mocked<UsersService>;
    let routerMock: jest.Mocked<Router>;

    beforeEach(async () => {

        userFavoritesServiceMock = {
            toggleFavorite: jest.fn(),
            isFavorite: jest.fn().mockReturnValue(false),
        } as unknown as jest.Mocked<UserFavoritesService>;

        usersServiceMock = {
            getUsers: jest.fn().mockReturnValue(of(MOCK_USERS)),
            getAvatarForUser: jest.fn((name: string) => `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&rounded=true`),
        } as unknown as jest.Mocked<UsersService>;

        routerMock = {
            navigate: jest.fn(),
        } as unknown as jest.Mocked<Router>;

        await TestBed.configureTestingModule({
            imports: [UserCardComponent],
            providers: [
                { provide: UserFavoritesService, useValue: userFavoritesServiceMock },
                { provide: UsersService, useValue: usersServiceMock },
                { provide: Router, useValue: routerMock },
            ],
            schemas: [NO_ERRORS_SCHEMA], // Ignore custom components
        }).compileComponents();

        fixture = TestBed.createComponent(UserCardComponent);
        component = fixture.componentInstance;
        component.user = MOCK_USER; // Inject the mocked user data
        fixture.detectChanges();

    });

    it('should create the component', () => {

        expect(component).toBeTruthy();

    });

    it('should format address correctly', () => {

        const formattedAddress = component.getSimpleAddress(MOCK_USER.address);
        expect(formattedAddress).toBe('Springfield, 62704');

    });

    it('should format phone number correctly by removing extensions', () => {

        const formattedPhone = component.getPhoneNumber(MOCK_USER.phone);
        expect(formattedPhone).toBe('555-1234'); // No extension, so it stays the same

    });

    it('should navigate to the user profile on card click', () => {

        component.handleCardClick(MOCK_USER.id);
        expect(routerMock.navigate).toHaveBeenCalledWith(['/users', MOCK_USER.id]);

    });

    it('should toggle favorite when the favorite button is clicked', () => {

        const event = new MouseEvent('click');
        component.toggleFavorite(event, MOCK_USER.id);
        expect(userFavoritesServiceMock.toggleFavorite).toHaveBeenCalledWith(MOCK_USER.id);

    });

    it('should stop event propagation when toggling favorite', () => {

        const event = new MouseEvent('click');
        jest.spyOn(event, 'stopPropagation');

        component.toggleFavorite(event, MOCK_USER.id);
        expect(event.stopPropagation).toHaveBeenCalled();

    });

    it('should check if the user is a favorite', () => {

        const isFavorite = component.isFavorite(MOCK_USER.id);
        expect(userFavoritesServiceMock.isFavorite).toHaveBeenCalledWith(MOCK_USER.id);
        expect(isFavorite).toBe(false);

    });

});
