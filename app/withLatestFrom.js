import { Observable } from "rxjs";

const foo = Observable.interval(500).take(5)
    .zip(Observable.of('H', 'e', 'l', 'l', 'o'), (_, c) => c)
const bar = Observable.interval(300).take(7)
    .zip(Observable.of(0,1,0,1,0,1,0), (_, n) => n)

/*
----H----e----l----l----o|     (foo)
--0--1--0--1--0--1--0|         (bar)
  withLatestFrom((c,n) => n === 1 ? c.toUpperCase() : c.toLowerCase())
----h----e----L----L----o|
*/

const combined = foo.withLatestFrom(bar, (c, n) => n === 1 ? c.toUpperCase() : c.toLowerCase());
combined.subscribe({
    next: (x) => console.log('next -> ', x),
    error: (x) => console.log('error -> ', x),
    complete: (x) => console.log('done')
})