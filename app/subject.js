import { ReplaySubject } from "rxjs";

let subject = new ReplaySubject(2);

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

subject.next(1);
subject.next(2);
subject.next(3);

setTimeout(() => {
    subject.subscribe(obsB);
}, 2000)