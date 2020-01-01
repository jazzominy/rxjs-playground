import { AsyncSubject, Observable, Subject, ReplaySubject } from "rxjs";

// let connectable$ = Observable.interval(1000).take(5).multicast(new Subject());
// we can use replay subject as well
let connectable$ = Observable.interval(1000).multicast(new ReplaySubject());

let obsA = {
    next: (x) => console.log('A next ', x),
    error: (err) => console.log('A error ', err),
    complete: () => console.log('A complete '),
}

// This subscribes to the source that is returned by Observable.interval(1000).take(5)
let sub = connectable$.connect();

connectable$.subscribe(obsA);
// subject.subscribe(obsA);

let obsB = {
    next: (x) => console.log('B next ', x),
    error: (err) => console.log('B error ', err),
    complete: () => console.log('B complete '),
}

setTimeout(() => {
    connectable$.subscribe(obsB);
    // subject.subscribe(obsB);
}, 2000)

setTimeout(() => {
    sub.unsubscribe();
}, 5000)