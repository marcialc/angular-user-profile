import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private storage: Storage | null = null;

    constructor (
        @Inject(PLATFORM_ID) private platformId: object,
        @Inject(DOCUMENT) private document: Document
    ) {

        if (isPlatformBrowser(this.platformId)) {

            this.storage = this.document.defaultView?.localStorage ?? null;

        }

    }

    setItem (key: string, value: string) {

        try {

            this.storage?.setItem(key, value);

        } catch (error) {

            console.error(`Error saving to localStorage: ${error}`);

        }

    }

    getItem (key: string)  {

        try {

            return this.storage?.getItem(key) ?? null;

        } catch (error) {

            console.error(`Error reading from localStorage: ${error}`);
            return null;

        }

    }

    removeItem (key: string) {

        try {

            this.storage?.removeItem(key);

        } catch (error) {

            console.error(`Error removing from localStorage: ${error}`);

        }

    }

}
