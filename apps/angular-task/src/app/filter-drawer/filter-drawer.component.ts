import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { User, UsersService } from '@angular-task/core-services';

@Component({
    selector: 'crx-filter-drawer',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './filter-drawer.component.html',
    styleUrls: ['./filter-drawer.component.scss'],
})
export class FilterDrawerComponent implements OnInit {

    @Output() submitFilters = new EventEmitter<void>();

    filteringOptions: Array<{ key: string, options: string[] }> = [];
    filterForm: FormGroup = new FormGroup({});

    constructor (private usersService: UsersService) { }

    ngOnInit () {

        this.usersService.getFilteringOptions().subscribe((options) => {

            this.filteringOptions = options;

            this.filteringOptions.forEach((filter) => {

                this.filterForm.addControl(filter.key, new FormControl(''));

            });

        });

    }

    onSubmit () {

        const selectedFilters: Array<{ attribute: keyof User, value: string }> = [];

        Object.keys(this.filterForm.value).forEach((key) => {

            const value = this.filterForm.value[key];
            if (value) {

                selectedFilters.push({ attribute: key as keyof User, value });

            }

        });

        if (selectedFilters.length > 0) {

            this.usersService.filterUsersBy(selectedFilters);

        }

        this.submitFilters.emit();

    }

    onClear () {

        const resetValues: Record<string, string> = {};
        Object.keys(this.filterForm.controls).forEach((key) => {

            resetValues[key] = '';

        });

        this.filterForm.reset(resetValues);
        this.usersService.resetUsers();

    }

}
