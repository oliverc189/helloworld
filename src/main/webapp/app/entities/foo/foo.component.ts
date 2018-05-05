import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Foo } from './foo.model';
import { FooService } from './foo.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-foo',
    templateUrl: './foo.component.html'
})
export class FooComponent implements OnInit, OnDestroy {
foos: Foo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private fooService: FooService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.fooService.query().subscribe(
            (res: HttpResponse<Foo[]>) => {
                this.foos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFoos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Foo) {
        return item.id;
    }
    registerChangeInFoos() {
        this.eventSubscriber = this.eventManager.subscribe('fooListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
