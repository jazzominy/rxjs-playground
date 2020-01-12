import { Observable } from "rxjs";

const click$ = Observable.fromEvent(document, 'click');
const clock$ = Observable.interval(1000);

// window splits an observable in to smaller observables
const result$ = clock$.window(click$)
    .map(obs => obs.count())
    .switch();

/*
--0--1--2--3--4--5--6--7--8-- clock$
-------c-------c---c--------- click$

    window
 
+------+-------+---+---------
\         \           \     \
 -0--1-|2--3--4|-5-|6--7--8--
 
  map(obs => obs.count())
  
+------+-------+---+--
\         \           \     \
 -----2|------3|--1|---
          
    switch
 
------2-------3---1----

*/

result$.subscribe(console.log);