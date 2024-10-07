import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UsersService } from '@angular-task/core-services';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
    selector: 'crx-users',
    standalone: true,
    imports: [CommonModule, UserCardComponent],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
})
export class UsersComponent {

    users: User[] | null = null;

    constructor (private usersService: UsersService,) {

        this.usersService.getUsers().subscribe({
            next: (users) => {

                this.users = users;

            },
            error: (error) => {

                console.error('Error fetching user:', error);

            }
        });

    }

}
