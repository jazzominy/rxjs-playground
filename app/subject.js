import { Observable } from "rxjs";

let observable = Observable.interval(1000).take(5);

let obsA = {
    next: (x) => console.log('A next ', x),
    error: (err) => console.log('A error ', err),
    complete: (x) => console.log('A complete ', x),
}

observable.subscribe(obsA);

let obsB = {
    next: (x) => console.log('B next ', x),
    error: (err) => console.log('B error ', err),
    complete: (x) => console.log('B complete ', x),
}

setTimeout(() => {
    observable.subscribe(obsB);
}, 2000)