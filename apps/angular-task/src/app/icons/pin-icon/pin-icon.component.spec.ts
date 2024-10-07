import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PinIconComponent } from './pin-icon.component';

describe('PinIconComponent', () => {

    let component: PinIconComponent;
    let fixture: ComponentFixture<PinIconComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [PinIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PinIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

});
