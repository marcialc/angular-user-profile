import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class UserFavoritesService {

    private favorites: Set<number> = new Set();
    private favoritesSubject = new BehaviorSubject<Set<number>>(new Set(this.favorites));

    constructor (private localStorageService: LocalStorageService) {

        this.loadFavorites();

    }

    private loadFavorites () {

        const storedFavorites = this.localStorageService.getItem('user-favorites');
        if (storedFavorites) {

            try {

                const parsedFavorites = JSON.parse(storedFavorites) as number[] | null;
                if (Array.isArray(parsedFavorites)) {

                    this.favorites = new Set(parsedFavorites);
                    this.favoritesSubject.next(new Set(this.favorites));

                }

            } catch (error) {

                console.error('Error loading user favorites:', error);
                this.localStorageService.removeItem('user-favorites');

            }

        }

    }

    private saveFavorites () {

        this.localStorageService.setItem(
            'user-favorites',
            JSON.stringify(Array.from(this.favorites))
        );

    }

    toggleFavorite (userId: number) {

        const newFavorites = new Set(this.favorites);
        if (newFavorites.has(userId)) {

            newFavorites.delete(userId);

        } else {

            newFavorites.add(userId);

        }
        this.favorites = newFavorites;
        this.saveFavorites();
        this.favoritesSubject.next(newFavorites);

    }

    isFavorite (userId: number) {

        return this.favorites.has(userId);

    }

    getFavorites () {

        return this.favoritesSubject.asObservable();

    }

}
