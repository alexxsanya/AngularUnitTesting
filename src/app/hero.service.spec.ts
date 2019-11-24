import { TestBed, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('Hero Service', () => {
    let mockMessageService;
    let httpClientTestingModule: HttpTestingController;
    let heroServiceHandle: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                HeroService,
                {provide: MessageService, useValue: mockMessageService}
            ]
        });

        /* TestBed.get(MessageService/HeroService) -
        .get is a way to get the instance of a service inside the test module */

        httpClientTestingModule = TestBed.get(HttpClientTestingModule);
        heroServiceHandle = TestBed.get(HeroService);

        describe('getHeror', () => {
            it('should call get with a correct url', () => {
                heroServiceHandle.getHero(4).subscribe();

                const req = httpClientTestingModule.expectOne('api/heroes/4');
                req.flush({ id: 4, name: 'SuperDude', strength: 100 });
                httpClientTestingModule.verify();
            });
        });

    });
});
