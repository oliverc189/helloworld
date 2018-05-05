import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Foo } from './foo.model';
import { FooPopupService } from './foo-popup.service';
import { FooService } from './foo.service';

@Component({
    selector: 'jhi-foo-dialog',
    templateUrl: './foo-dialog.component.html'
})
export class FooDialogComponent implements OnInit {

    foo: Foo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private fooService: FooService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.foo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fooService.update(this.foo));
        } else {
            this.subscribeToSaveResponse(
                this.fooService.create(this.foo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Foo>>) {
        result.subscribe((res: HttpResponse<Foo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Foo) {
        this.eventManager.broadcast({ name: 'fooListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-foo-popup',
    template: ''
})
export class FooPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fooPopupService: FooPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fooPopupService
                    .open(FooDialogComponent as Component, params['id']);
            } else {
                this.fooPopupService
                    .open(FooDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
