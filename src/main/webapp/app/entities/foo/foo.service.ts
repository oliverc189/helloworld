import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Foo } from './foo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Foo>;

@Injectable()
export class FooService {

    private resourceUrl =  SERVER_API_URL + 'api/foos';

    constructor(private http: HttpClient) { }

    create(foo: Foo): Observable<EntityResponseType> {
        const copy = this.convert(foo);
        return this.http.post<Foo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(foo: Foo): Observable<EntityResponseType> {
        const copy = this.convert(foo);
        return this.http.put<Foo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<Foo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Foo[]>> {
        const options = createRequestOption(req);
        return this.http.get<Foo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Foo[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Foo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Foo[]>): HttpResponse<Foo[]> {
        const jsonResponse: Foo[] = res.body;
        const body: Foo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Foo.
     */
    private convertItemFromServer(foo: Foo): Foo {
        const copy: Foo = Object.assign({}, foo);
        return copy;
    }

    /**
     * Convert a Foo to a JSON which can be sent to the server.
     */
    private convert(foo: Foo): Foo {
        const copy: Foo = Object.assign({}, foo);
        return copy;
    }
}
