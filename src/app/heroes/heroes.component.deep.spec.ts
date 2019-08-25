import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { HeroComponent } from "../hero/hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HeroesComponents (DeepTest)', () => {
    let fixture: ComponentFixture<HeroesComponent>
    let mockHeroService;
    let HEROES;

    beforeEach(() => {

        HEROES = [
            {id:1, name: 'James Spider', strength: 8},
            {id:2, name: 'Wonder Woman', strength: 20},
            {id:3, name: 'Super Duder', strength: 67},
        ]

        mockHeroService = jasmine.createSpyObj([
            'getHeroes',
            'addHero',
            'deleteHero',
        ])
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroComponent],
            providers: [
                {provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should render each hero as a component', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        //triggers the ngOnInit
        fixture.detectChanges();
        
        const HeroComponentDes = fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect(HeroComponentDes.length).toBe(3);
        // expect(HeroComponentDes[0].componentInstance.hero.name).toBe('James Spider')
        for(let i = 0; i < HeroComponentDes.length; i ++ ) {
            expect(HeroComponentDes[i].componentInstance.hero).toBe(HEROES[i]) 
        }
    });

    it(`should call heroService.deleteHero when the Hero Component's 
        delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete'); // watch HeroComponent for any event on it.
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const HeroComponentDe = fixture.debugElement.queryAll(By.directive(HeroComponent));
        HeroComponentDe[0].query(By.css('button')).triggerEventHandler(
            'click',  { stopPropagation: () => {} }
        )

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })

})