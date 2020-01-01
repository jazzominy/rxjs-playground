import { Observable, Subject } from "rxjs";

let shared$ = Observable.interval(1000)
    .do(x => console.log('source ' + x))
    .share();

// share = publish().refCount() -----> multicast with Subject as source with refCount()
// publish() = .multicast(new Subject())
// publishBehavior(default) = .multicast(new BehaviorSubject(default))
// publishReplay(count) = .multicast(new ReplaySubject(count))
// refCount() = start on first subscribe and stop on last unsubscribe

let obsA = {
    next: (x) => console.log('A next ', x),
    error: (err) => console.log('A error ', err),
    complete: () => console.log('A complete '),
}

let subA = shared$.subscribe(obsA); // start executing as reference count = 1

let obsB = {
    next: (x) => console.log('B next ', x),
    error: (err) => console.log('B error ', err),
    complete: () => console.log('B complete '),
}

let subB;
setTimeout(() => {
    subB = shared$.subscribe(obsB); // reference count 2
}, 2000)

setTimeout(() => {
    subA.unsubscribe();
    console.log('unsubscribed A');
}, 5000)

setTimeout(() => {
    subB.unsubscribe();
    console.log('unsubscribed B');
}, 7000)