import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    ConditionComponent,
    ConditionDetailComponent,
    ConditionUpdateComponent,
    ConditionDeletePopupComponent,
    ConditionDeleteDialogComponent,
    conditionRoute,
    conditionPopupRoute
} from './';

const ENTITY_STATES = [...conditionRoute, ...conditionPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConditionComponent,
        ConditionDetailComponent,
        ConditionUpdateComponent,
        ConditionDeleteDialogComponent,
        ConditionDeletePopupComponent
    ],
    entryComponents: [ConditionComponent, ConditionUpdateComponent, ConditionDeleteDialogComponent, ConditionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationConditionModule {}
