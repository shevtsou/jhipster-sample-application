import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Condition } from 'app/shared/model/condition.model';
import { ConditionService } from './condition.service';
import { ConditionComponent } from './condition.component';
import { ConditionDetailComponent } from './condition-detail.component';
import { ConditionUpdateComponent } from './condition-update.component';
import { ConditionDeletePopupComponent } from './condition-delete-dialog.component';
import { ICondition } from 'app/shared/model/condition.model';

@Injectable({ providedIn: 'root' })
export class ConditionResolve implements Resolve<ICondition> {
    constructor(private service: ConditionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICondition> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Condition>) => response.ok),
                map((condition: HttpResponse<Condition>) => condition.body)
            );
        }
        return of(new Condition());
    }
}

export const conditionRoute: Routes = [
    {
        path: '',
        component: ConditionComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Conditions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ConditionDetailComponent,
        resolve: {
            condition: ConditionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Conditions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ConditionUpdateComponent,
        resolve: {
            condition: ConditionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Conditions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ConditionUpdateComponent,
        resolve: {
            condition: ConditionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Conditions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const conditionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ConditionDeletePopupComponent,
        resolve: {
            condition: ConditionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Conditions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
