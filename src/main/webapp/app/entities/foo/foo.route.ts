import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FooComponent } from './foo.component';
import { FooDetailComponent } from './foo-detail.component';
import { FooPopupComponent } from './foo-dialog.component';
import { FooDeletePopupComponent } from './foo-delete-dialog.component';

export const fooRoute: Routes = [
    {
        path: 'foo',
        component: FooComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'helloworldApp.foo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'foo/:id',
        component: FooDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'helloworldApp.foo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fooPopupRoute: Routes = [
    {
        path: 'foo-new',
        component: FooPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'helloworldApp.foo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'foo/:id/edit',
        component: FooPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'helloworldApp.foo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'foo/:id/delete',
        component: FooDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'helloworldApp.foo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
