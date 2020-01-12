import { Observable } from "rxjs";

let foo = Observable.interval(500)
    .zip(Observable.of('a', 'b', 'c', 'd', 1), (x, y) => y);

let bar = foo.map(c => c.toUpperCase());
// catch operator accepts a function that returns an observable
// If you return the outputObs then result will keep on getting repeat values
// A---B---C---D---A---B---C---D---.....
let result = bar.catch((err, outputObs) => outputObs);

result.subscribe(
    {
        next: (x) => console.log('next -> ', x),
        error: (x) => console.log('error -> ', x),
        complete: (x) => console.log('done')
    }
)