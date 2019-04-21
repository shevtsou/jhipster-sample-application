import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICondition } from 'app/shared/model/condition.model';

@Component({
    selector: 'jhi-condition-detail',
    templateUrl: './condition-detail.component.html'
})
export class ConditionDetailComponent implements OnInit {
    condition: ICondition;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ condition }) => {
            this.condition = condition;
        });
    }

    previousState() {
        window.history.back();
    }
}
