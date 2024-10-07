import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService, User, UserFavoritesService } from '@angular-task/core-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PhoneIconComponent } from '../icons/phone-icon/phone-icon.component';
import { EmailIconComponent } from '../icons/email-icon/email-icon.component';
import { PinIconComponent } from '../icons/pin-icon/pin-icon.component';
import { FavoriteOffIconComponent } from '../icons/favorite-off-icon/favorite-off-icon.component';
import { FavoriteOnIconComponent } from '../icons/favorite-on-icon/favorite-on-icon.component';
import { CompanyIconComponent } from '../icons/company-icon/company-icon.component';
import { WebsiteIconComponent } from '../icons/website-icon/website-icon.component';
import { UserIconComponent } from '../icons/user-icon/user-icon.component';
import { PhraseIconComponent } from '../icons/phrase-icon/phrase-icon.component';
import { BackArrowIconComponent } from '../icons/back-arrow-icon/back-arrow-icon.component';

@Component({
    selector: 'crx-user-profile',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, PhoneIconComponent, EmailIconComponent, CompanyIconComponent,
        WebsiteIconComponent,
        UserIconComponent,
        PhraseIconComponent,
        WebsiteIconComponent,
        BackArrowIconComponent,
        PinIconComponent, FavoriteOffIconComponent, FavoriteOnIconComponent],
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

    user: User | null = null;
    loading = false;

    constructor (
        private route: ActivatedRoute,
        private usersService: UsersService,
        private userFavoritesService: UserFavoritesService,
        private router: Router,
    ) { }

    ngOnInit () {

        const userId = this.route.snapshot.paramMap.get('id');
        if (userId) {

            this.loadUser(+userId);

        }

    }

    loadUser (userId: number) {

        this.loading = true;
        this.usersService.getUserById(userId).subscribe({
            next: (user) => {

                this.user = user;
                this.loading = false;

            },
            error: (error) => {

                console.error('Error fetching user:', error);
                this.loading = false;

            }
        });

    }

    formatAddress (address: User['address']) {

        return `${address.suite}, ${address.street}, ${address.city}, ${address.zipcode}`;

    }

    formatWebsite (website: string) {

        return website.startsWith('http') ? website : `https://${website}`;

    }

    getAvatarForUser (name: string) {

        return this.usersService.getAvatarForUser(name);

    }

    toggleFavorite = (event: Event, userId: number) => {

        event.stopPropagation();
        this.userFavoritesService.toggleFavorite(userId);

    };

    isFavorite = (userId: number) => this.userFavoritesService.isFavorite(userId);

    getSimpleAddress = (address: User['address']) => `${address.city}, ${address.zipcode.slice(0, 5)}`;

    getPhoneNumber = (phoneNumber: string) => {

        const cleanedNumber = phoneNumber.replace(/\sx.*/, '');
        return cleanedNumber.trim();

    };

    handleBackButton = () => {

        this.router.navigate(['/users']);

    };

}
