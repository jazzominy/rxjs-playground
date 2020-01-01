import { AsyncSubject, Observable, Subject, ReplaySubject } from "rxjs";

// let connectable$ = Observable.interval(1000).take(5).multicast(new Subject());
// we can use replay subject as well
let connectable$ = Observable.interval(1000)
    .do(x => console.log('source ' + x))
    .multicast(new ReplaySubject());

let obsA = {
    next: (x) => console.log('A next ', x),
    error: (err) => console.log('A error ', err),
    complete: () => console.log('A complete '),
}

// with refCount(), no need to do connectable$.connect(). It automatically connects to source observable
// As soon as we do autoConnected$.subscribe(), it starts executing the values from src observable
let autoConnected$ = connectable$.refCount();

let subA = autoConnected$.subscribe(obsA); // start executing as reference count = 1

let obsB = {
    next: (x) => console.log('B next ', x),
    error: (err) => console.log('B error ', err),
    complete: () => console.log('B complete '),
}

let subB;
setTimeout(() => {
    subB = autoConnected$.subscribe(obsB); // reference count 2
}, 2000)

setTimeout(() => {
    subA.unsubscribe();
    console.log('unsubscribed A');
}, 5000)

setTimeout(() => {
    subB.unsubscribe();
    console.log('unsubscribed B');
}, 7000)