

class BallotService {
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
}

export { BallotService as default }