import { Observable } from "rxjs";

const userData$ = Observable.ajax({
    url: 'https://jsonplaceholder.typicode.com/users/1',
    method: 'GET',
  });

const click$ = Observable.fromEvent(document, 'click');

/* const resWhenClick$ = click$.map(e => userData$)
// mergeAll() subscribes to observable returned by map
    .mergeAll(); */

// mergeMap or flatMap = map + mergeAll from above
const resWhenClick$ = click$.mergeMap(e => userData$)

resWhenClick$.subscribe(resp => {
    console.log(resp.response)
});