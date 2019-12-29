import { Observable } from "rxjs";

let observable = Observable.interval(1000).take(5);

let bridgeObs = {
    next: function(x) {this.observers.forEach(o => o.next(x))},
    error: function(x) {this.observers.forEach(o => o.error(err))},
    complete: function(x) {this.observers.forEach(o => o.complete())},
    observers: [],
    addObserver: function(o) {this.observers.push(o)}
}

let obsA = {
    next: (x) => console.log('A next ', x),
    error: (err) => console.log('A error ', err),
    complete: () => console.log('A complete '),
}

observable.subscribe(bridgeObs);
bridgeObs.addObserver(obsA);

let obsB = {
    next: (x) => console.log('B next ', x),
    error: (err) => console.log('B error ', err),
    complete: () => console.log('B complete '),
}

setTimeout(() => {
    bridgeObs.addObserver(obsB);
}, 2000)