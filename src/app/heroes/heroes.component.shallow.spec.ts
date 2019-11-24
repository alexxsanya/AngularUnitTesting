import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Input, Component } from '@angular/core';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

describe('HeroesComponents (ShallowTest)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    @Component({
        selector: 'app-hero',
        template: '<div></div>'
    })
    class MockedHeroComponent {
        @Input() hero: Hero;
    }

    beforeEach(() => {

        HEROES = [
            {id: 1, name: 'James Spider', strength: 8},
            {id: 2, name: 'Wonder Woman', strength: 20},
            {id: 3, name: 'Super Duder', strength: 67},
        ];

        mockHeroService = jasmine.createSpyObj([
            'getHeroes',
            'addHero',
            'deleteHero',
        ]);
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, MockedHeroComponent],
            providers: [
                {provide: HeroService, useValue: mockHeroService }
            ]
        });

        fixture = TestBed.createComponent(HeroesComponent);

    });

    it('should set heroes correctly from the services', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it('should create one li for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });
});
