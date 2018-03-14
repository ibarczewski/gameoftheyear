import { Observable } from 'rxjs';

class MiddlewareService {
    constructor() {
        this.apiUrl = 'http://localhost:4000';
    }

    uploadBallot(userId, games) {
        let data = {userId: userId, ballot: games}

        fetch(this.apiUrl + "/ballots", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    getGames(query) {
        let promise = fetch('http://localhost:4000/games/?query=' + query, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.json();
        }).then((value) => {
          return value;  
        });
        
        return Observable.fromPromise(promise);
    }
}

export { MiddlewareService as default }