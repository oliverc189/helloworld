/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HelloworldTestModule } from '../../../test.module';
import { FooComponent } from '../../../../../../main/webapp/app/entities/foo/foo.component';
import { FooService } from '../../../../../../main/webapp/app/entities/foo/foo.service';
import { Foo } from '../../../../../../main/webapp/app/entities/foo/foo.model';

describe('Component Tests', () => {

    describe('Foo Management Component', () => {
        let comp: FooComponent;
        let fixture: ComponentFixture<FooComponent>;
        let service: FooService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HelloworldTestModule],
                declarations: [FooComponent],
                providers: [
                    FooService
                ]
            })
            .overrideTemplate(FooComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FooComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FooService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Foo('9fec3727-3421-4967-b213-ba36557ca194')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.foos[0]).toEqual(jasmine.objectContaining({id: '9fec3727-3421-4967-b213-ba36557ca194'}));
            });
        });
    });

});
