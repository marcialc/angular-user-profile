import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchBarComponent', () => {

    let component: SearchBarComponent;
    let fixture: ComponentFixture<SearchBarComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [SearchBarComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(SearchBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create the component', () => {

        expect(component).toBeTruthy();

    });

    it('should emit searchValue on input change', () => {

        const searchValueSpy = jest.spyOn(component.searchValue, 'emit');
        const inputElement = fixture.debugElement.nativeElement.querySelector('[data-test-id="search-input"]');

        inputElement.value = 'test';
        inputElement.dispatchEvent(new Event('input'));

        expect(component.value).toBe('test');
        expect(searchValueSpy).toHaveBeenCalledWith('test');

    });

    it('should clear search value and emit empty string when clear button is clicked', () => {

        const searchValueSpy = jest.spyOn(component.searchValue, 'emit');

        component.value = 'test';
        fixture.detectChanges();

        const clearButton = fixture.debugElement.nativeElement.querySelector('[data-test-id="clear-btn"]');
        clearButton.click();

        expect(component.value).toBe('');
        expect(searchValueSpy).toHaveBeenCalledWith('');

    });

    it('should focus input when Ctrl + K is pressed', () => {

        const searchInputSpy = jest.spyOn(component, 'focusSearchInput');

        const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'k' });
        window.dispatchEvent(event);

        expect(searchInputSpy).toHaveBeenCalled();

    });

});
