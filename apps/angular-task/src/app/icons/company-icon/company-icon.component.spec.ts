import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyIconComponent } from './company-icon.component';

describe('CompanyIconComponent', () => {

    let component: CompanyIconComponent;
    let fixture: ComponentFixture<CompanyIconComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [CompanyIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CompanyIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

});
