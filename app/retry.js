import { Observable } from "rxjs";

let foo = Observable.interval(500)
    .zip(Observable.of('a', 'b', 'c', 'd', 1), (x, y) => y);

let bar = foo.map(c => c.toUpperCase());
// retry() operator is same as .catch((err, outputObs) => outputObs)
// A---B---C---D---A---B---C---D---.....
// let result = bar.retry(1); // arg specifies the no. of times to retry before throwing error

// With retryWhen() you get error obs that mirrors the source observable
let result = bar.retryWhen(errObs => errObs.delay(1000));

result.subscribe(
    {
        next: (x) => console.log('next -> ', x),
        error: (x) => console.log('error -> ', x),
        complete: (x) => console.log('done')
    }
)