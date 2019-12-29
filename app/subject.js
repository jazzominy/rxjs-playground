import { AsyncSubject } from "rxjs";

// ReplaySubject replays many, before or after completion
// BehaviorSubject replays one, only before completion
// AsyncSubject replays one, only if completed
let subject = new AsyncSubject();

let obsA = {
    next: (x) => console.log('A next ', x),
    error: (err) => console.log('A error ', err),
    complete: () => console.log('A complete '),
}

subject.subscribe(obsA);

let obsB = {
    next: (x) => console.log('B next ', x),
    error: (err) => console.log('B error ', err),
    complete: () => console.log('B complete '),
}

setTimeout(() => subject.next(1), 100)
setTimeout(() => subject.next(2), 200)
setTimeout(() => subject.next(3), 300)
setTimeout(() => subject.complete(), 350)

setTimeout(() => {
    subject.subscribe(obsB);
}, 400)