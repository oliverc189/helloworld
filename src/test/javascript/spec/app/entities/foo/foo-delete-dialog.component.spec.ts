/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HelloworldTestModule } from '../../../test.module';
import { FooDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/foo/foo-delete-dialog.component';
import { FooService } from '../../../../../../main/webapp/app/entities/foo/foo.service';

describe('Component Tests', () => {

    describe('Foo Management Delete Component', () => {
        let comp: FooDeleteDialogComponent;
        let fixture: ComponentFixture<FooDeleteDialogComponent>;
        let service: FooService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HelloworldTestModule],
                declarations: [FooDeleteDialogComponent],
                providers: [
                    FooService
                ]
            })
            .overrideTemplate(FooDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FooDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FooService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete('9fec3727-3421-4967-b213-ba36557ca194');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('9fec3727-3421-4967-b213-ba36557ca194');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
