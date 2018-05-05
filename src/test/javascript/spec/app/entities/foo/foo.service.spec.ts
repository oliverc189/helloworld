/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JhiDateUtils } from 'ng-jhipster';

import { FooService } from '../../../../../../main/webapp/app/entities/foo/foo.service';
import { SERVER_API_URL } from '../../../../../../main/webapp/app/app.constants';

describe('Service Tests', () => {

    describe('Foo Service', () => {
        let injector: TestBed;
        let service: FooService;
        let httpMock: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule
                ],
                providers: [
                    JhiDateUtils,
                    FooService
                ]
            });
            injector = getTestBed();
            service = injector.get(FooService);
            httpMock = injector.get(HttpTestingController);
        });

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find('9fec3727-3421-4967-b213-ba36557ca194').subscribe(() => {});

                const req  = httpMock.expectOne({ method: 'GET' });

                const resourceUrl = SERVER_API_URL + 'api/foos';
                expect(req.request.url).toEqual(resourceUrl + '/' + '9fec3727-3421-4967-b213-ba36557ca194');
            });
            it('should return Foo', () => {

                service.find('9fec3727-3421-4967-b213-ba36557ca194').subscribe((received) => {
                    expect(received.body.id).toEqual('9fec3727-3421-4967-b213-ba36557ca194');
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush({id: '9fec3727-3421-4967-b213-ba36557ca194'});
            });

            it('should propagate not found response', () => {

                service.find('9fec3727-3421-4967-b213-ba36557ca194').subscribe(null, (_error: any) => {
                    expect(_error.status).toEqual(404);
                });

                const req  = httpMock.expectOne({ method: 'GET' });
                req.flush('Invalid request parameters', {
                    status: 404, statusText: 'Bad Request'
                });

            });
        });

        afterEach(() => {
            httpMock.verify();
        });

    });

});
