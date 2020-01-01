import { Observable } from "rxjs";

const click$ = Observable.fromEvent(document, 'click');

const tickWhenClick$ = click$
/* mergeMap does not unsubscribe from the inner observables
    .mergeMap(ev => Observable.interval(500));

    switchMap unsubscribes from previous observable and then subscribes to new inner observable on every click
*/
    .switchMap(ev => Observable.interval(500))

tickWhenClick$.subscribe(x => {
    console.log(x);
});