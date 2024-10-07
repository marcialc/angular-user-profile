import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhraseIconComponent } from './phrase-icon.component';

describe('PhraseIconComponent', () => {

    let component: PhraseIconComponent;
    let fixture: ComponentFixture<PhraseIconComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [PhraseIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PhraseIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

});
