import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteOnIconComponent } from './favorite-on-icon.component';

describe('FavoriteOnIconComponent', () => {

    let component: FavoriteOnIconComponent;
    let fixture: ComponentFixture<FavoriteOnIconComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [FavoriteOnIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FavoriteOnIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

});
