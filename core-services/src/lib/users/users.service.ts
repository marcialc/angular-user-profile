import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap, switchMap, debounceTime } from 'rxjs/operators';

const IMAGE_API = 'https://ui-avatars.com/api/';
const USERS_API = 'https://jsonplaceholder.typicode.com/users';

export type User = {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
};

@Injectable({
    providedIn: 'root',
})
export class UsersService {

    private allUsers: User[] = [];
    private usersSubject = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject.asObservable();

    private filterOptionsSubject = new BehaviorSubject<Array<{ key: string, options: string[] }>>([]);
    filterOptions$ = this.filterOptionsSubject.asObservable();

    private filterSubject = new Subject<{ attribute: keyof User, value: string }>();

    constructor (private http: HttpClient) {

        this.filterSubject
        .pipe(debounceTime(300))
        .subscribe(({ attribute, value }) => {

            const filteredUsers = this.allUsers.filter((user) => {

                const userAttributeValue = user[attribute]?.toString().toLowerCase();
                return userAttributeValue.includes(value.toLowerCase());

            });
            this.usersSubject.next([...filteredUsers]);

        });

    }

    private loadUsers () {

        return this.http.get<User[]>(USERS_API).pipe(tap((users) => {

            this.allUsers = users;
            this.usersSubject.next(users);
            this.computeFilteringOptions();

        }));

    }

    getAvatarForUser (name: string) {

        return `${IMAGE_API}?name=${name}&background=random&color=fff&rounded=true`;

    }

    getUsers () {

        if (this.allUsers.length > 0) {

            return this.users$;

        } else {

            return this.loadUsers().pipe(
                tap((users) => {

                    this.usersSubject.next(users);

                }),
                switchMap(() => this.users$)
            );

        }

    }

    filterUsersBy (filters: Array<{ attribute: keyof User | 'company' | 'city', value: string }>) {

        const filteredUsers = this.allUsers.filter((user) => filters.every((filter) => {

            let userAttributeValue: string | undefined;

            if (filter.attribute === 'company') {

                userAttributeValue = user.company.name;

            } else if (filter.attribute === 'city') {

                userAttributeValue = user.address.city;

            } else {

                userAttributeValue = user[filter.attribute]?.toString();

            }

            return userAttributeValue?.toLowerCase().includes(filter.value.toLowerCase());

        }));

        this.usersSubject.next([...filteredUsers]);

    }

    getUserById (id: number) {

        return this.http.get<User>(`${USERS_API}/${id}`);

    }

    private computeFilteringOptions () {

        const optionsMap = {
            name: new Set<string>(),
            email: new Set<string>(),
            username: new Set<string>(),
            phone: new Set<string>(),
            website: new Set<string>(),
            company: new Set<string>(),
            city: new Set<string>(),
        };

        this.allUsers.forEach((user) => {

            optionsMap.name.add(user.name);
            optionsMap.email.add(user.email);
            optionsMap.username.add(user.username);
            optionsMap.phone.add(user.phone);
            optionsMap.website.add(user.website);
            optionsMap.company.add(user.company.name);
            optionsMap.city.add(user.address.city);

        });

        const filteringOptions = Object.keys(optionsMap).map((key) => ({
            key,
            options: Array.from(optionsMap[key as keyof typeof optionsMap]),
        }));

        this.filterOptionsSubject.next(filteringOptions);

    }

    sortUsers (criteria: string) {

        const sortedUsers: User[] = [...this.allUsers];

        switch (criteria) {

            case 'nameAsc':
                sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'nameDes':
                sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'companyAsc':
                sortedUsers.sort((a, b) => a.company.name.localeCompare(b.company.name));
                break;
            case 'companyDes':
                sortedUsers.sort((a, b) => b.company.name.localeCompare(a.company.name));
                break;

        }

        this.usersSubject.next(sortedUsers);

    }

    getFilteringOptions () {

        return this.filterOptions$;

    }

    resetUsers () {

        this.usersSubject.next(this.allUsers);

    }

}
