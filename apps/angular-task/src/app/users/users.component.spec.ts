import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { UsersService } from '@angular-task/core-services';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MOCK_USERS } from '../../utils/users-service.mock';

describe('UsersComponent', () => {

    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    let usersServiceMock: jest.Mocked<UsersService>;

    beforeEach(async () => {

        usersServiceMock = {
            getUsers: jest.fn().mockReturnValue(of(MOCK_USERS)),
            getAvatarForUser: jest.fn((name: string) => `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&rounded=true`),
        } as unknown as jest.Mocked<UsersService>;

        await TestBed.configureTestingModule({
            imports: [UsersComponent],
            providers: [{ provide: UsersService, useValue: usersServiceMock }],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should fetch users on initialization and set them in users property', () => {

        fixture.detectChanges();
        expect(usersServiceMock.getUsers).toHaveBeenCalled();
        expect(component.users).toEqual(MOCK_USERS);

    });

});
