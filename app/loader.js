import { Observable } from "rxjs";

export function get(url) {
    return Observable.create(function(observer) {
        const xhr = new XMLHttpRequest();
        const onLoad = () => {
            if(xhr.status === 200)
            {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            }
            else
            {
                observer.error(xhr.statusText);
            }
        };

        xhr.addEventListener("load", onLoad);
        xhr.open("get",url);
        xhr.send();

        return () => {
            xhr.removeEventListener("load", onLoad);
            xhr.abort();
        }
    });
}
