import { Observable } from "rxjs";

const click$ = Observable.fromEvent(document, 'click');
const md$ = Observable.fromEvent(document, 'mousedown');
const mu$ = Observable.fromEvent(document, 'mouseup');
const clock$ = Observable.interval(1000);

// Allow the clock values between mouse down and mouse up
const result$ = clock$.windowToggle(md$, () => mu$)
    .switch();

/*
--0--1--2--3--4--5--6--7--8--9--
----------D-------------D------- md$
-------------------U------------ mu$

 windowToggle
 
----------+-------------+-------
               \3--4--5-|    \-8--9--
          
 mergeAll or switch
 
-----------3--4--5--------8--9--

*/

result$.subscribe(console.log);