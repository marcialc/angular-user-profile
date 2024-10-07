import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from './local-storage.service';

type MockDocument = {
    defaultView: {
        localStorage: {
            getItem: jest.Mock<string | null, [string]>;
            setItem: jest.Mock<void, [string, string]>;
            removeItem: jest.Mock<void, [string]>;
        };
    };
};

describe('LocalStorageService', () => {

    let service: LocalStorageService;
    let mockDocument: MockDocument;

    beforeEach(() => {

        mockDocument = {
            defaultView: {
                localStorage: {
                    getItem: jest.fn(),
                    setItem: jest.fn(),
                    removeItem: jest.fn(),
                },
            },
        };

        TestBed.configureTestingModule({
            providers: [
                LocalStorageService,
                { provide: PLATFORM_ID, useValue: 'browser' },
                { provide: DOCUMENT, useValue: mockDocument },
            ],
        });

        service = TestBed.inject(LocalStorageService);

    });

    it('should be created', () => {

        expect(service).toBeTruthy();

    });

    it('should set an item in localStorage', () => {

        service.setItem('key', 'value');
        expect(mockDocument.defaultView.localStorage.setItem).toHaveBeenCalledWith('key', 'value');

    });

    it('should handle error when setting an item in localStorage', () => {

        mockDocument.defaultView.localStorage.setItem.mockImplementation(() => {

            throw new Error('Storage error');

        });

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        service.setItem('key', 'value');

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/Error saving to localStorage/));

    });

    it('should get an item from localStorage', () => {

        mockDocument.defaultView.localStorage.getItem.mockReturnValue('storedValue');
        const value = service.getItem('key');
        expect(mockDocument.defaultView.localStorage.getItem).toHaveBeenCalledWith('key');
        expect(value).toBe('storedValue');

    });

    it('should handle error when getting an item from localStorage', () => {

        mockDocument.defaultView.localStorage.getItem.mockImplementation(() => {

            throw new Error('Storage error');

        });

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        const value = service.getItem('key');

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/Error reading from localStorage/));
        expect(value).toBeNull();

    });

    it('should return null if item does not exist in localStorage', () => {

        mockDocument.defaultView.localStorage.getItem.mockReturnValue(null);
        const value = service.getItem('nonExistentKey');
        expect(value).toBeNull();

    });

    it('should remove an item from localStorage', () => {

        service.removeItem('key');
        expect(mockDocument.defaultView.localStorage.removeItem).toHaveBeenCalledWith('key');

    });

    it('should handle error when removing an item from localStorage', () => {

        mockDocument.defaultView.localStorage.removeItem.mockImplementation(() => {

            throw new Error('Storage error');

        });

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        service.removeItem('key');

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/Error removing from localStorage/));

    });

});
