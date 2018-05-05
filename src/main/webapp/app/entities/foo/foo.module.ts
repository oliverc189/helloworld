import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HelloworldSharedModule } from '../../shared';
import {
    FooService,
    FooPopupService,
    FooComponent,
    FooDetailComponent,
    FooDialogComponent,
    FooPopupComponent,
    FooDeletePopupComponent,
    FooDeleteDialogComponent,
    fooRoute,
    fooPopupRoute,
} from './';

const ENTITY_STATES = [
    ...fooRoute,
    ...fooPopupRoute,
];

@NgModule({
    imports: [
        HelloworldSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FooComponent,
        FooDetailComponent,
        FooDialogComponent,
        FooDeleteDialogComponent,
        FooPopupComponent,
        FooDeletePopupComponent,
    ],
    entryComponents: [
        FooComponent,
        FooDialogComponent,
        FooPopupComponent,
        FooDeleteDialogComponent,
        FooDeletePopupComponent,
    ],
    providers: [
        FooService,
        FooPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HelloworldFooModule {}
