import { Observable } from "rxjs";
import * as $ from "jquery";

//import { get } from "./loader";

let btn = document.getElementById("refreshBtn");
let close1Btn = document.querySelector(".close1");
let close2Btn = document.querySelector(".close2");
let close3Btn = document.querySelector(".close3");

let clickStream = Observable.fromEvent(btn,"click");
let close1Stream = Observable.fromEvent(close1Btn, "click");
let close2Stream = Observable.fromEvent(close2Btn, "click");
let close3Stream = Observable.fromEvent(close3Btn, "click");

 let reqStream = clickStream.startWith("Startup click").map(e => {
     var randomOffset = Math.floor(Math.random()*500);
     return "https://api.github.com/users?since=" + randomOffset;
 });

 let respStream = reqStream.flatMap(url => {
     return Observable.fromPromise($.getJSON(url));
 }).publish().refCount();

 function renderSuggestion(user, selector) {
     var sugEl = document.getElementById(selector);
     if(user === null) {
         sugEl.style.visibility = "hidden";
     }
     else {
         sugEl.style.visibility = "visible";
         var usernameEl = sugEl.querySelector('.username');
             usernameEl.href = user.html_url;
             usernameEl.textContent = user.login;
         var imgEl = sugEl.querySelector('img');
             imgEl.src = "";
             imgEl.src = user.avatar_url;
     }
 }

function createSuggestionStream(closeStream) {
    return closeStream.startWith("Startup click")
        .combineLatest(respStream,(click, users) => {
            var rndIndex = Math.floor(Math.random() * users.length);
            return users[rndIndex];
        })
        .merge(
            clickStream.map(() => null)//Hide the li on refresh
        );
}

 let sug1Stream = createSuggestionStream(close1Stream);
 let sug2Stream = createSuggestionStream(close2Stream);
 let sug3Stream = createSuggestionStream(close3Stream);

sug1Stream.subscribe((suggestion) => {
    renderSuggestion(suggestion,"sug1");
 });

sug2Stream.subscribe((suggestion) => {
    renderSuggestion(suggestion,"sug2");
 });

sug3Stream.subscribe((suggestion) => {
    renderSuggestion(suggestion,"sug3");
 })

let inputBox = document.getElementById("inputBox");
let inputStream = Observable.fromEvent(inputBox, "input")
                            .map(e => e.target.value)
                            //.debounceTime(200)
                            //.delay(200)
                            .throttleTime(200)
                            //.subscribe(console.log);

let inputPluckStream = Observable.fromEvent(inputBox, "input")
                                 .pluck("target","value")
                                 .subscribe(value => console.log(`From inputPluckStream -> ${value}`));

let countBtn = document.getElementById("countBtn");
let countStream = Observable.fromEvent(countBtn, "click")
                            .map(() => {return (state => Object.assign({}, state, {count: state.count + 1}))})
                            //.scan(count => count + 1, 0)
                            /*.subscribe(count => {
                                countBtn.innerHTML = `Count ${count}`;
                            });*/

let state = countStream.scan((state, changeFn) => changeFn(state), {count: 0});
state.subscribe(state => {
    countBtn.innerHTML = `Count ${state.count}`;
});
