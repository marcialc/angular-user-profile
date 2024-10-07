import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackArrowIconComponent } from './back-arrow-icon.component';

describe('BackArrowIconComponent', () => {

    let component: BackArrowIconComponent;
    let fixture: ComponentFixture<BackArrowIconComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [BackArrowIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BackArrowIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

});
