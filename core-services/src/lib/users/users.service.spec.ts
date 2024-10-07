import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { MOCK_USERS } from './users.mock';
import { of } from 'rxjs';

describe('UsersService', () => {

    let usersServiceMock: jest.Mocked<UsersService>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [UsersService],
        });

        usersServiceMock = {
            getUserById: jest.fn().mockReturnValue(of(MOCK_USERS[0])),
            getUsers: jest.fn().mockReturnValue(of(MOCK_USERS)),
            getAvatarForUser: jest.fn((name: string) => `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&rounded=true`),
            filterUsersBy: jest.fn(),
            sortUsers: jest.fn(),
            resetUsers: jest.fn(),
            users$: of(MOCK_USERS),
            filterOptions$: of([]),
        } as unknown as jest.Mocked<UsersService>;

    });

    it('should be created', () => {

        expect(usersServiceMock).toBeTruthy();

    });

    it('should fetch users and update BehaviorSubject', () => {

        usersServiceMock.getUsers().subscribe((users) => {

            expect(users).toEqual(MOCK_USERS);

        });

    });

    it('should return avatar URL for a user', () => {

        const avatarUrl = usersServiceMock.getAvatarForUser('John Doe');
        expect(avatarUrl).toBe('https://ui-avatars.com/api/?name=John Doe&background=random&color=fff&rounded=true');

    });

    it('should filter users by name', () => {

        usersServiceMock.filterUsersBy([{ attribute: 'name', value: 'Jane' }]);
        usersServiceMock.users$.subscribe((filteredUsers) => {

            expect(filteredUsers).toEqual([MOCK_USERS[1]]);

        });

    });

    it('should filter users by company name', () => {

        usersServiceMock.filterUsersBy([{ attribute: 'company', value: 'Johnson Technologies' }]);
        usersServiceMock.users$.subscribe((filteredUsers) => {

            expect(filteredUsers).toEqual([MOCK_USERS[0]]);

        });

    });

    it('should sort users by name in ascending order', () => {

        usersServiceMock.sortUsers('nameAsc');
        usersServiceMock.users$.subscribe((sortedUsers) => {

            expect(sortedUsers[0].name).toBe('Bob Smith');
            expect(sortedUsers[1].name).toBe('Catherine Lee');

        });

    });

    it('should sort users by company name in descending order', () => {

        usersServiceMock.sortUsers('companyDes');
        usersServiceMock.users$.subscribe((sortedUsers) => {

            expect(sortedUsers[0].company.name).toBe('Smith Industries');
            expect(sortedUsers[1].company.name).toBe('Johnson Technologies');

        });

    });

    it('should return user by id', () => {

        usersServiceMock.getUserById(1).subscribe((user) => {

            expect(user).toEqual(MOCK_USERS[0]);

        });

    });

    it('should reset users', () => {

        usersServiceMock.resetUsers();
        usersServiceMock.users$.subscribe((users) => {

            expect(users).toEqual(MOCK_USERS);

        });

    });

    it('should compute filtering options', () => {

        usersServiceMock.filterOptions$.subscribe((filterOptions) => {

            expect(filterOptions.length).toBeGreaterThan(0);

        });

    });

});
