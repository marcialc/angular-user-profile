import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebsiteIconComponent } from './website-icon.component';

describe('WebsiteIconComponent', () => {

    let component: WebsiteIconComponent;
    let fixture: ComponentFixture<WebsiteIconComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [WebsiteIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WebsiteIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

});
