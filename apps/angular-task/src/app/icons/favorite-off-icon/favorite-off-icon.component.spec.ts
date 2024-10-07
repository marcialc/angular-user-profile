import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteOffIconComponent } from './favorite-off-icon.component';

describe('FavoriteOffIconComponent', () => {

    let component: FavoriteOffIconComponent;
    let fixture: ComponentFixture<FavoriteOffIconComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [FavoriteOffIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FavoriteOffIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

});
