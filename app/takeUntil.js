import { Observable } from "rxjs";

const click$ = Observable.fromEvent(document, 'click');
const four$ = Observable.interval(4000).take(1); // just emit once after 4 seconds

const clickUntil4$ = click$.takeUntil(four$);

clickUntil4$.subscribe((e) => {
    console.log(e.clientX); //logs for 4 secs then stops
})