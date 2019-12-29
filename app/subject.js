import { Observable, Subject } from "rxjs";

let observable = Observable.interval(1000).take(5);

let subject = new Subject();

let obsA = {
    next: (x) => console.log('A next ', x),
    error: (err) => console.log('A error ', err),
    complete: () => console.log('A complete '),
}

observable.subscribe(subject);
subject.subscribe(obsA);

let obsB = {
    next: (x) => console.log('B next ', x),
    error: (err) => console.log('B error ', err),
    complete: () => console.log('B complete '),
}

setTimeout(() => {
    subject.subscribe(obsB);
}, 2000)