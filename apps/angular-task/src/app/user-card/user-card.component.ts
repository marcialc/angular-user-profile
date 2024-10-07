import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFavoritesService, User, UsersService } from '@angular-task/core-services';
import { PhoneIconComponent } from '../icons/phone-icon/phone-icon.component';
import { EmailIconComponent } from '../icons/email-icon/email-icon.component';
import { PinIconComponent } from '../icons/pin-icon/pin-icon.component';
import { FavoriteOffIconComponent } from '../icons/favorite-off-icon/favorite-off-icon.component';
import { FavoriteOnIconComponent } from '../icons/favorite-on-icon/favorite-on-icon.component';
import { Router } from '@angular/router';

@Component({
    selector: 'crx-user-card',
    standalone: true,
    imports: [
        CommonModule,
        PhoneIconComponent,
        EmailIconComponent,
        PinIconComponent,
        FavoriteOffIconComponent,
        FavoriteOnIconComponent
    ],
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

    @Input({ required: true }) user: User |  null = null;

    constructor (
        private userFavoritesService: UserFavoritesService,
        private usersService: UsersService,
        private router: Router
    ) {}

    getAvatarForUser = (name: string) => this.usersService.getAvatarForUser(name);

    getSimpleAddress = (address: User['address']) => `${address.city}, ${address.zipcode.slice(0, 5)}`;

    getPhoneNumber = (phoneNumber: string) => {

        const cleanedNumber = phoneNumber.replace(/\sx.*/, '');
        return cleanedNumber.trim();

    };

    handleCardClick = (userId: number) => {

        this.router.navigate(['/users', userId]);

    };

    toggleFavorite = (event: Event, userId: number) => {

        event.stopPropagation();
        this.userFavoritesService.toggleFavorite(userId);

    };

    isFavorite = (userId: number) => this.userFavoritesService.isFavorite(userId);

    onKeyDown (event: KeyboardEvent) {

        if (event.key === 'Enter' && this.user) {

            this.handleCardClick(this.user.id);

        }

    }

}
