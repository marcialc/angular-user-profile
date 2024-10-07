import { Route } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersContainerComponent } from './users-container/users-container.component';

export const appRoutes: Route[] = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: UsersContainerComponent },
    { path: 'users/:id', component: UserProfileComponent }
];
