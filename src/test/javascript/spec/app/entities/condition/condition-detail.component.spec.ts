/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ConditionDetailComponent } from 'app/entities/condition/condition-detail.component';
import { Condition } from 'app/shared/model/condition.model';

describe('Component Tests', () => {
    describe('Condition Management Detail Component', () => {
        let comp: ConditionDetailComponent;
        let fixture: ComponentFixture<ConditionDetailComponent>;
        const route = ({ data: of({ condition: new Condition(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ConditionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ConditionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConditionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.condition).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
