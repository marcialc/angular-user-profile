import { TestBed } from '@angular/core/testing';
import { UserFavoritesService } from './user-favorites.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

describe('UserFavoritesService', () => {

    let userFavoritesService: UserFavoritesService;
    let localStorageServiceMock: jest.Mocked<LocalStorageService>;

    beforeEach(() => {

        localStorageServiceMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
        } as unknown as jest.Mocked<LocalStorageService>;

        TestBed.configureTestingModule({
            providers: [
                UserFavoritesService,
                { provide: LocalStorageService, useValue: localStorageServiceMock },
            ],
        });

        userFavoritesService = TestBed.inject(UserFavoritesService);

    });

    it('should be created', () => {

        expect(userFavoritesService).toBeTruthy();

    });

    it('should load favorites from localStorage on initialization', () => {

        localStorageServiceMock.getItem.mockReturnValue(JSON.stringify([1, 2, 3]));
        userFavoritesService['loadFavorites']();

        expect(localStorageServiceMock.getItem).toHaveBeenCalledWith('favorites');
        userFavoritesService.getFavorites().subscribe((favorites) => {

            expect(Array.from(favorites)).toEqual([1, 2, 3]);

        });

    });

    it('should toggle favorite (add)', () => {

        userFavoritesService.toggleFavorite(1);

        expect(userFavoritesService.isFavorite(1)).toBe(true);
        expect(localStorageServiceMock.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([1]));

    });

    it('should toggle favorite (remove)', () => {

        userFavoritesService.toggleFavorite(1);
        userFavoritesService.toggleFavorite(1);

        expect(userFavoritesService.isFavorite(1)).toBe(false);
        expect(localStorageServiceMock.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([]));

    });

    it('should return favorites as an observable', () => {

        userFavoritesService.toggleFavorite(1);
        userFavoritesService.getFavorites().subscribe((favorites) => {

            expect(Array.from(favorites)).toEqual([1]);

        });

    });

});
