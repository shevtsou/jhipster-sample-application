import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICondition } from 'app/shared/model/condition.model';
import { ConditionService } from './condition.service';

@Component({
    selector: 'jhi-condition-delete-dialog',
    templateUrl: './condition-delete-dialog.component.html'
})
export class ConditionDeleteDialogComponent {
    condition: ICondition;

    constructor(
        protected conditionService: ConditionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.conditionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'conditionListModification',
                content: 'Deleted an condition'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-condition-delete-popup',
    template: ''
})
export class ConditionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ condition }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ConditionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.condition = condition;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/condition', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/condition', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
