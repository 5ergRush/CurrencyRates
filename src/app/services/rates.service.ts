import { Injectable } from "@angular/core";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import { Observable, Subject, buffer, bufferTime, filter, map } from "rxjs";
import { Rate } from "../models/rate.model";

/**
 * Service for connecting to a websocket and retrieving currency rates.
 */
@Injectable({
    providedIn: 'root'
})
export class RatesService {
    private socket$: WebSocketSubject<any>;
    private ratesSubject$ = new Subject<Rate>();
    /**
     * Constructor initializes the websocket connection
     * and sets up an observable to receive and process the incoming messages.
     */
    constructor() {
        this.socket$ = webSocket('ws://localhost:8888');
        this.socket$.subscribe({
                next: (message) => this.onMessage(message),
                error: (error) => console.error('Websocket error: ', error),
                complete: () => console.log('Websocket closed')
        });
    }

    /**
     * Processes incoming messages from the websocket.
     * Converts the message to a Rate object and emits it if the rate is valid.
     */
    private onMessage(message: any) {
        const rate:Rate = {
            time: new Date(message.time),
            symbol: message.symbol,
            bid: message.bid,
            ask: message.ask
        }
        if (rate.ask >= rate.bid) {
            this.ratesSubject$.next(rate);
        }
        else{
            console.warn('Invalid rate received: ', rate);
        }
    }    

    /**
     * Returns an observable that emits an array of Rate objects.
     * The observable buffers the incoming Rate objects for 500 milliseconds, and then emits an array of the buffered rates.
     * This buffering is in place for performance reasons, as it reduces the amount of data that needs to be processed
     * and the amount of updates to the ui.
     * The array is filtered to only include rates with the same symbol, and the latest rate is used for each symbol.
     */
    getRates(): Observable<Rate[]> {
        return this.ratesSubject$.pipe(
            buffer(this.ratesSubject$.pipe(bufferTime(500))),
            filter(ratesSubject => ratesSubject.length > 0),
            map(ratesSubject => ratesSubject.reduce((acc, rate) => {
                const existingRates = acc.find(r => r.symbol === rate.symbol);
                if (existingRates) {
                    Object.assign(existingRates, rate);
                } else {
                    acc.push(rate);
                }
                return acc;
            }, [] as Rate[]))
        );
    }
}
