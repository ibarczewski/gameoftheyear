class MiddlewareService {
    constructor() {
        this.apiUrl = 'http://localhost:4000';
    }

    uploadBallot(userId, games) {
        let data = {userId: 1, ballot: games}

        fetch(this.apiUrl + "/ballots", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    getGames(query) {
        return fetch('http://localhost:4000/games/?query=' + query, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.text();
        });
    }
}

export { MiddlewareService as default }