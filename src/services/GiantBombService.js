import * as gb from 'giantbomb';

class GiantBombService {
    constructor() {
        this.api = gb('6cbe1f7ddb910061b5ba934384f99ebec7def15b');
    }

    getCoverArt(game, callback) {
        let config = {
            filters: [
                {field: 'aliases', value: game}
            ]
        }
        return this.api.games.search(game, callback);
    }
}

export { GiantBombService as default }