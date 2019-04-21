/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ConditionUpdateComponent } from 'app/entities/condition/condition-update.component';
import { ConditionService } from 'app/entities/condition/condition.service';
import { Condition } from 'app/shared/model/condition.model';

describe('Component Tests', () => {
    describe('Condition Management Update Component', () => {
        let comp: ConditionUpdateComponent;
        let fixture: ComponentFixture<ConditionUpdateComponent>;
        let service: ConditionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ConditionUpdateComponent]
            })
                .overrideTemplate(ConditionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConditionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConditionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Condition(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.condition = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Condition();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.condition = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
