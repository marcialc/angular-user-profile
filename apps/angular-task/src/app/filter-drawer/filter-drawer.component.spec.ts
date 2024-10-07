import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterDrawerComponent } from './filter-drawer.component';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UsersService } from '@angular-task/core-services';

describe('FilterDrawerComponent', () => {

    let component: FilterDrawerComponent;
    let fixture: ComponentFixture<FilterDrawerComponent>;
    let usersServiceMock: jest.Mocked<UsersService>;

    beforeEach(async () => {

        usersServiceMock = {
            getFilteringOptions: jest.fn().mockReturnValue(of([
                { key: 'name', options: ['Alice', 'Bob'] },
                { key: 'email', options: ['alice@example.com', 'bob@example.com'] },
            ])),
            filterUsersBy: jest.fn(),
            resetUsers: jest.fn(),
        } as unknown as jest.Mocked<UsersService>;

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FilterDrawerComponent],
            providers: [{ provide: UsersService, useValue: usersServiceMock }],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(FilterDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create the component', () => {

        expect(component).toBeTruthy();

    });

    it('should initialize form controls based on filtering options', () => {

        expect(usersServiceMock.getFilteringOptions).toHaveBeenCalled();
        expect(component.filterForm.contains('name')).toBe(true);
        expect(component.filterForm.contains('email')).toBe(true);

    });

    it('should submit selected filters and emit submitFilters event', () => {

        const submitFiltersSpy = jest.spyOn(component.submitFilters, 'emit');
        const filterFormValue = {
            name: 'Alice',
            email: 'alice@example.com',
        };

        component.filterForm.setValue(filterFormValue);

        component.onSubmit();

        expect(usersServiceMock.filterUsersBy).toHaveBeenCalledWith([
            { attribute: 'name', value: 'Alice' },
            { attribute: 'email', value: 'alice@example.com' },
        ]);
        expect(submitFiltersSpy).toHaveBeenCalled();

    });

    it('should reset the form and call resetUsers service on clear', () => {

        component.onClear();
        expect(component.filterForm.value).toEqual({
            name: '',
            email: '',
        });
        expect(usersServiceMock.resetUsers).toHaveBeenCalled();

    });

});
