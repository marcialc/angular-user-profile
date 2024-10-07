import { Component, HostListener, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchIconComponent } from '../icons/search-icon/search-icon.component';
import { CloseIconComponent } from '../icons/close-icon/close-icon.component';

@Component({
    selector: 'crx-search-bar',
    standalone: true,
    imports: [CommonModule, SearchIconComponent, CloseIconComponent],
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {

    @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement> | undefined;
    @Output() searchValue = new EventEmitter<string>();

    value = '';
    private isMetaOrCtrlPressed = false;

    @HostListener('window:keydown', ['$event'])
    handleKeydown (event: KeyboardEvent) {

        if (event.metaKey || event.ctrlKey) {

            this.isMetaOrCtrlPressed = true;

        }

        if (this.isMetaOrCtrlPressed && event.key.toLowerCase() === 'k') {

            event.preventDefault();
            this.focusSearchInput();

        }

    }

    @HostListener('window:keyup', ['$event'])
    handleKeyup (event: KeyboardEvent) {

        if (event.key === 'Meta' || event.key === 'Control') {

            this.isMetaOrCtrlPressed = false;

        }

    }

    focusSearchInput () {

        if (this.searchInput) {

            this.searchInput.nativeElement.focus();

        }

    }

    onInputChange (event: Event) {

        const inputElement = event.target as HTMLInputElement;
        this.value = inputElement.value;
        this.searchValue.emit(this.value);

    }

    handleClearSearch () {

        this.value = '';
        this.searchValue.emit('');
        this.focusSearchInput();

    }

}
