import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICondition } from 'app/shared/model/condition.model';
import { ConditionService } from './condition.service';

@Component({
    selector: 'jhi-condition-update',
    templateUrl: './condition-update.component.html'
})
export class ConditionUpdateComponent implements OnInit {
    condition: ICondition;
    isSaving: boolean;

    constructor(protected conditionService: ConditionService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ condition }) => {
            this.condition = condition;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.condition.id !== undefined) {
            this.subscribeToSaveResponse(this.conditionService.update(this.condition));
        } else {
            this.subscribeToSaveResponse(this.conditionService.create(this.condition));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICondition>>) {
        result.subscribe((res: HttpResponse<ICondition>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
