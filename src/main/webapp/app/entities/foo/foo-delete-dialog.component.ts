import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Foo } from './foo.model';
import { FooPopupService } from './foo-popup.service';
import { FooService } from './foo.service';

@Component({
    selector: 'jhi-foo-delete-dialog',
    templateUrl: './foo-delete-dialog.component.html'
})
export class FooDeleteDialogComponent {

    foo: Foo;

    constructor(
        private fooService: FooService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.fooService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fooListModification',
                content: 'Deleted an foo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-foo-delete-popup',
    template: ''
})
export class FooDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fooPopupService: FooPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fooPopupService
                .open(FooDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
