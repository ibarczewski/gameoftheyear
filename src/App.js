import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as CSV from 'csv-string';
import * as _ from 'lodash';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { BarChart } from './components/BarChart';
import { DoughnutChart } from './components/DoughnutChart';
import { List } from './components/List';
import UserBallot from './components/Ballot/UserBallot';

const scoring = [15, 12, 10, 8, 6, 5, 4, 3, 2, 1];


class App extends Component {
  render() {
    let titles = this.getTitles();
    let anticipated = this.getAnticipated();
    let surprises = this.getSurprises();
    let oldGames = this.getOldGames();
    let disappointments = this.getDisappointments();
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* <BarChart data={this.getData(titles)} /> */}
        {/* <DoughnutChart data={this.getData(titles)} /> */}
        {/* <DoughnutChart data={this.getData(surprises)} /> */}
        {/* <DoughnutChart data={this.getData(disappointments)} /> */}
        {/* <DoughnutChart data={this.getData(oldGames)} /> */}
        {/* <DoughnutChart data={this.getData(anticipated)} /> */}
        {/* <List titles={titles} />
        <List titles={surprises} />
        <List titles={disappointments} />
        <List titles={oldGames} />
        <List titles={anticipated} /> */}
        <UserBallot />
        
      </div>
    );
  }

  getData(titles) {
    let data = {
      labels:[],
      datasets:[{data: [], backgroundColor: []}]
    };

    data.labels = _.map(titles, 'name');
    data.datasets[0].data = _.map(titles, 'score');
    data.datasets[0].backgroundColor = _.map(titles, 'backgroundColor');

    return data;
  }

  getDisappointments() {
    let csvString = "Ian,Destiny 2,PLAYERUNKNOWN\'S BATTLEGROUNDS,Mass Effect: Andromeda,Everybody\'s Golf\n" + 
    "Dev,For Honor,Animal Crossing: Pocket Camp,Yooka-Laylee,The Legend Of Zelda: Breath Of The Wild\n" + 
    "Mitch,Star Wars: Battlefront II,Destiny 2,Mass Effect: Andromeda,For Honor,Middle-earth: Shadow of War,Yooka-Laylee\n" + 
    "Matt,Everybody\'s Golf,Destiny 2,Star Wars: Battlefront II,The Legend Of Zelda: Breath Of The Wild,The Surge,For Honor,Snake Pass,1-2 Switch\n" + 
    "Richard,Everybody\'s Golf,Drawn To Death\n" + 
    "Christian,Mass Effect: Andromeda,Everybody\'s Golf,Splatoon 2,Final Fantasy XIV: Stormblood,Destiny 2,,Middle-earth: Shadow of War,Animal Crossing: Pocket Camp,Prey,Super Mario Odyssey\n" + 
    "Preston,Star Wars: Battlefront II,Middle-earth: Shadow of War\n" + 
    "Anthony,NBA 2k18\n" + 
    "Zach,Destiny 2\n" + 
    "Spencer,Gran Turismo Sport,Forza 7\n" + 
    "Joel,Destiny 2,Marvel Vs. Capcom Infinite,Yooka-Laylee\n" + 
    "Tim,Destiny 2,PLAYERUNKNOWN\'S BATTLEGROUNDS, Star Wars: Battlefront II,Fortnite\n" + 
    "Logan,Fortnite,PLAYERUNKNOWN\'S BATTLEGROUNDS,Destiny 2\n" + 
    "John,Nidhogg 2\n" + 
    "Tanner,Animal Crossing: Pocket Camp\n" + 
    "Max,PLAYERUNKNOWN\'S BATTLEGROUNDS\n" + 
    "Wyatt,For Honor,Fire Pro Wrestling\n" + 
    "Ty,1-2 Switch,Star Wars: Battlefront II\n" + 
    "Adam,Star Wars: Battlefront II,Destiny 2,Middle-earth: Shadow of War,Call of Duty WWII,Mass Effect: Andromeda,Yooka-Laylee,Nioh,The Legend Of Zelda: Breath of the Wild,ARMS,1-2 Switch\n" + 
    "Martin,Metroid: Samus Returns,Marvel Vs. Capcom Infinite\n" + 
    "Joe,Fortnite,PLAYERUNKNOWN\'S BATTLEGROUNDS\n" + 
    "Vince C,PLAYERUNKNOWN\'S BATTLEGROUNDS,The Legend Of Zelda: Breath Of The Wild,For Honor,Splatoon 2\n" + 
    "Rusty,PLAYERUNKNOWN\'S BATTLEGROUNDS,,Nier:Automata";

    return this.tallyVotes(csvString);
  }

  getOldGames() {
    let csvString = "Ian,Puyo Puyo Tetris,Superhot,Titanfall 2,Thumper,Splinter Cell: Chaos Theory,Stardew Valley\n" + 
    "Jonah,Space Engineers\n" + 
    "Dev,Kerbal Space Program,Overcooked,Dishonored,The Witcher 3: Wild Hunt,Pokémon Sun/Moon\n" +
    "Mitch,No Man\'s Sky,Puyo Puyo Tetris,The Witness,The Talos Principle\n" + 
    "Matt,Titanfall 2,Superhot,House of the Dying Sun,Fallout 4,Counter Strike: Global Offensive,Dark Souls 3\n" + 
    "Richard,Dota 2,Persona 4 Golden,Street Fighter V,Final Fantasy XI\n" + 
    "Kyle,Rocket League,Stardew Valley\n" + 
    "Christian,Final Fantasy XI,Final Fantasy XII,Titanfall 2,Final Fantasy XV,Crash Bandicoot,Guilty Gear XRD Rev. 2,Kingdom Hearts HD 1.5,Kingdom Hearts HD 2.5,Street Fighter V,Windjammers\n" + 
    "Preston,Overwatch\n" + 
    "Anthony,Resident Evil 4,Final Fantasy XV\n" + 
    "Matt,DriveClub,Baja: Edge of Control\n" + 
    "Joel,Overwatch, The Binding of Isaac,Doom\n" + 
    "Logan,Rocket League,Kerbal Space Program,War Thunder\n" + 
    "Tanner,Minecraft,Kerbal Space Program,Stardew Valley,Planet Coaster,Cities: Skylines, Rogue Legacy\n" + 
    "Julie,Flight Rising\n" + 
    "Wyatt,Rainbow Six: Siege\n" + 
    "Ty,Hotline Miami 2,Dirt Rally,Hotline Miami,Pinball FX 2,Rocket League,Halo: Combat Evolved,Garry\'s Mod,Counter Strike: Global Offensive\n" + 
    "Adam,Overwatch,Stardew Valley,Crypt of the Necrodancer,Bioshock,Alien Isolation,Valkyria Chronicles,Killzone 2,Resident Evil 0\n" + 
    "Joe,Rocket League,Runescape\n" + 
    "Vince C,Heroes Of The Storm\n" + 
    "Duy,Rome II: Total War,Attila: Total War,The Elder Scrolls V: Skyrim,Ace Combat 5: Unsung War,The Witcher 3: Wild Hunt,Dead Space 2,Divinity: Original Sin,Rainbow Six: Siege,Medieval II: Total War,Dawn of War: Dark Crusade\n" + 
    "Canaan,Space Engineers,Factorio\n" + 
    "Rusty,Counter Strike: Global Offensive,Quake Champions,Titanfall 2,Battlefield 1";

    return this.tallyVotes(csvString);
  }

  getTitles() {
    let csvString = "Ian,Nier:Automata,Super Mario Odyssey,Cuphead,Nioh,Prey,Divinity: Original Sin II,Horizon Zero Dawn,The Legend Of Zelda: Breath Of The Wild,Hollow Knight,What Remains Of Edith Finch\n" + 
    "Robert ,The Legend Of Zelda: Breath Of The Wild,Super Mario Odyssey,Arms,Splatoon 2,,,,,,\n" +
    "Dev,Nier:Automata,Super Mario Odyssey,Cuphead,Divinity: Original Sin II,Middle-earth: Shadow Of War,The Legend Of Zelda: Breath Of The Wild,Mario + Rabbids: Kingdom Battle,Doki Doki Literature Club,Horizon Zero Dawn,Getting Over It With Bennett Foddy\n" +
    "Mitch,Prey,Super Mario Odyssey,Wolfenstein II: The New Colossus,Assassin\'s Creed Origins,What Remains Of Edith Finch,Cuphead,Horizon Zero Dawn,Ruiner,Little Nightmares,Snipperclips\n" + 
    "Matt,Horizon Zero Dawn,Nioh,Nier:Automata,What Remains Of Edith Finch,Prey,Uncharted: The Lost Legacy,Wolfenstein II: The New Colossus,Assassin\'s Creed Origins,Doki Doki Literature Club,The Legend Of Zelda: Breath Of The Wild\n" +
    "Charles,Super Mario Odyssey,The Legend Of Zelda: Breath Of The Wild,Nier:Automata,The Legend Of Heroes: Trails In The Sky the 3rd,Splatoon 2,Persona 5,Xenoblade Chronicles 2,Doki Doki Literature Club,Touhou 16: Hidden Star In Four Seasons,Fire Emblem Echoes: Shadows Of Valentia\n" + 
    "Richard,Persona 5,Horizon Zero Dawn,Uncharted: The Lost Legacy,Tekken 7,Nioh,Nex Machina\n" +
    "Kyle,The Legend Of Zelda: Breath Of The Wild,PLAYERUNKNOWN\'S BATTLEGROUNDS,Super Mario Odyssey,Cuphead,Mario + Rabbids: Kingdom Battle\n" +
    "Christian,Persona 5,Pyre,Cuphead,Horizon Zero Dawn,Nier:Automata,Sonic Mania,The Evil Within 2,The Legend Of Zelda: Breath Of The Wild,Pokémon Ultra Sun/Ultra Moon,Xenoblade Chronicles 2\n" +
    "Anthony,The Legend Of Zelda: Breath Of The Wild,Super Mario Odyssey,Resident Evil 7,Mario + Rabbids: Kingdom Battle\n" + 
    "Preston,Persona 5,Gran Turismo Sport,Injustice 2,Cuphead,Sonic Mania,The Legend Of Zelda: Breath Of The Wild,Assassin\'s Creed Origins,,Uncharted: The Lost Legacy\n" + 
    "Someone,Super Mario Odyssey,PLAYERUNKNOWN\'S BATTLEGROUNDS,Xenoblade Chronicles 2,The Legend Of Zelda: Breath Of The Wild,Star Wars: Battlefront II, Splatoon 2,,,,\n" + 
    "Matt,Horizon Zero Dawn,Gran Turismo Sport,Nier:Automata,Uncharted: The Lost Legacy,Everybody's Golf,Tekken 7,,,,\n" + 
    "Zach,Hollow Knight,Horizon Zero Dawn,Hellblade: Senua\'s Sacrifice,Wolfenstein II: The New Colossus,Middle-earth: Shadow of War,Nioh\n" + 
    "Spencer,Nier:Automata,Super Mario Odyssey,The Legend Of Heroes: Trails In The Sky the 3rd,Yakuza 0,Persona 5,Night In The Woods,Danganronpa V3,Golf Story,The Legend Of Zelda: Breath Of The Wild,Destiny 2\n" + 
    "Joel,The Legend Of Zelda: Breath Of The Wild,Cuphead,PLAYERUNKNOWN\'S BATTLEGROUNDS,Injustice 2,Guilty Gear Xrd Rev 2,Tekken 7,Battle Chef Brigade\n" + 
    "Tim,PLAYERUNKNOWN\'S BATTLEGROUNDS,Ghost Recon: Wildlands,The Legend Of Zelda: Breath Of The Wild\n" + 
    "Logan,PLAYERUNKNOWN\'S BATTLEGROUNDS\n" + 
    "Tanner,The Legend Of Zelda: Breath Of The Wild,Persona 5,Super Mario Odyssey,Horizon Zero Dawn,Uncharted: The Lost Legacy,Divinity: Original Sin II,ARMS,Middle-earth: Shadow Of War,Everybody\'s Golf,Out Of The Park Baseball 18\n" + 
    "Andy,The Legend Of Zelda: Breath Of The Wild,Nier:Automata,Night In The Woods,Super Mario Odyssey,What Remains Of Edith Finch,Pyre,Splatoon 2,Tacoma,The Shrouded Isle\n" + 
    "Julie,Animal Crossing: Pocket Camp\n" + 
    "Max,The Legend Of Zelda: Breath OF The Wild,Super Mario Odyssey\n" + 
    "Wyatt,Divinity: Original Sin II,,The Legend Of Zelda: Breath Of The Wild,Super Mario Odyssey\n" + 
    "Vince V,Wolfenstein II: The New Colossus\n" + 
    "Ty,Super Mario Odyssey,The Legend Of Zelda: Breath Of The Wild,Sonic Mania\n" + 
    "Adam,Resident Evil 7,Prey,Persona 5,The Evil Within 2,Nioh,The Legend Of Zelda: Breath Of The Wild,Cuphead,Outlast 2,Dream Daddy,Uncharted: The Lost Legacy\n" + 
    "Josh,The Legend Of Zelda: Breath Of The Wild,Super Mario Odyssey\n" +
    "Martin,The Legend Of Zelda: Breath Of The Wild,,Splatoon 2\n" +
    "Joe,PLAYERUNKNOWN\'S BATTLEGROUNDS\n" +
    "Rob,Nier:Automata,The Legend Of Zelda: Breath of the Wild,Super Mario Odyssey\n" +
    "Vince C,Jackbox Party Pack 3,Puyo Puyo Tetris,For Honor,Fortnite,Battlerite\n" +
    "Duy,PLAYERUNKNOWN\'S BATTLEGROUNDS,Prey\n" +
    "Canaan,Prey\n" + 
    "Rusty,Super Mario Odyssey,PLAYERUNKNOWN\'S BATTLEGROUNDS,Wolfenstein II: The New Colossus,Star Wars: Battlefront II,Nier:Automata";

    return this.tallyVotes(csvString);
  }

  getAnticipated() {
    let csvString = "Jonah,Shenmue III\n" + 
    "Dev,Super Smash Bros. Switch,Animal Crossing Switch\n" + 
    "Mitch,Red Dead Redemption II,A Way Out,Crackdown 3,Far Cry 5,The Last Night,God of War,The Wolf Among Us: Season 2,Metro Exodus,Detroit: Become Human,Days Gone\n" + 
    "Matt,Death Stranding,God of War,From Software Project,Red Dead Redemption II\n" + 
    "Charles,Shin Megami Tensei V,Metroid Prime 4,Fire Emblem Switch,Dragon Ball FighterZ,Monster Hunter: World,Death Stranding,Catherine: Full Body,Octopath Traveler,Valkyria Chronicles 4,Bayonetta 3\n" + 
    "Richard,Artifact,Dragon Ball FighterZ,Ni No Kuni II: Revenant Kingdom,Dragon Quest XI: Echoes Of An Elusive Age,Lost Sphear,Spider-Man,God of War,Octopath Traveler,Shadow of the Colossus,Dreams\n" + 
    "Preston,God of War,Spider-Man,The Last of Us Part II,Final Fantasy VII,Dreams,Yoshi Switch,Kirby: Star Allies,Detroit: Become Human,Dragon Ball FighterZ,Monster Hunter: World\n" + 
    "Anthony,Red Dead Redemption II\n" + 
    "Christian,Shadow of the Colossus,Dragon Ball FighterZ,Monster Hunter: World,Ace Combat 7,Anthem,God of War,Sea of Thieves,The Last Of Us Part II,Code Vein,Biomutant\n" + 
    "unknown,Metroid Prime 4\n" + 
    "Matt,Death Stranding\n" + 
    "Zach,Metro Exodus,Agony,God of War,,Kingdom Hearts III\n" + 
    "Spencer,Ghost Song,Monster Hunter: World,Bloodstained: Ritual Of The Night,Indivisible,Valkyria Chronicles 4,No More Heroes: Travis Strikes Again,Shin Megami Tensei V\n" + 
    "Joel,Dragon Ball FighterZ,God of War,Far Cry 5, Soul Calibur VI\n" + 
    "Tanner,Kirby: Star Allies,Yoshi Switch,Shin Megami Tensei V,Animal Crossing Switch\n" + 
    "Julie,Dappervolk\n" + 
    "Max,Pokemon Switch\n" + 
    "Ty,Kingdom Hearts III,Metroid Prime 4,Spider-Man\n" + 
    "Adam,Ni No Kuni II: Revenant Kingdom,Red Dead Redemption II,The Last Of Us Part II,God of War\n" + 
    "Josh,Yoshi Switch\n" + 
    "Martin,Spider-Man,Dragon Ball Fighterz,God of War,Red Dead Redemption II,Mega Man 11,A Way Out,Anthem,Metal Gear Survive\n" + 
    "Vince C,World of Warcraft Expansion\n" + 
    "Duy,Left Alive,Metro Exodus,Total War Saga: Thrones Of Britannia,They Are Billions\n" + 
    "Ian,Shenmue III,Valkyria Chronicles 4,Metro Exodus,Mega Man 11,Celeste,Monster Hunter: World,Indivisible,A Way Out,Red Dead Redemption II,Bloodstained: Ritual Of The Night\n" +
    "Rusty,Red Dead Redemption II";

    return this.tallyVotes(csvString);
  }

  getSurprises() {
    let csvString = "Ian,Sonic Mania,Resident Evil 7,Hellblade: Senua\'s Sacrifice,Snipperclips,Star Fox 2\n" + 
    "Robert,Super Mario Odyssey\n" + 
    "Dev,Doki Doki Literature Club,Nier:Automata,Mario + Rabbids: Kingdom Battle,Cuphead\n" + 
    "Mitch,Snipperclips,Prey,Assassin\'s Creed Origins,Sonic Mania,Injustice 2,Little Nightmares\n" + 
    "Matt,Nioh,Horizon Zero Dawn,Nier:Automata,Prey,What Remains Of Edith Finch,Assassin\'s Creed Origins,Uncharted: The Lost Legacy,Snipperclips\n" +
    "Charles,Fire Emblem Heroes,Golf Story,Mario + Rabbids: Kingdom Battle,Sonic Mania,Cuphead,Touhou Kabuto V,Snipperclips,Fire Emblem: Warriors,Ever Oasis,Doki Doki Literature Club\n" + 
    "Kyle,Mario + Rabbids: Kingdom Battle\n" + 
    "Christian,Hellblade: Senua\'s Sacrifice,Halo Wars 2,Wolfenstein II: The New Colossus,Resident Evil 7,Tekken 7,HQ,Snake Pass,Yooka-Laylee,Nioh,Marvel Vs. Capcom Infinite\n" + 
    "Preston,Cuphead,Assassin\'s Creed Origins,Sonic Mania,Horizon Zero Dawn\n" + 
    "Anthony,Resident Evil 7,Snipperclips,Mario + Rabbids: Kingdom Battle\n" + 
    "Unk,Super Mario Odyssey\n" + 
    "Matt,Horizon Zero Dawn\n" + 
    "Zach,Horizon Zero Dawn,Hollow Knight\n" + 
    "Spencer,Golf Story,Night In The Woods,Super Mario Odyssey\n" + 
    "Joel,Injustice 2\n" + 
    "Tanner,ARMS,Snipperclips\n" + 
    "Ty,Super Mario Odyssey\n" +
    "Josh,Super Mario Run,Animal Crossing: Pocket Camp,Star Fox 2\n" + 
    "Martin,Injustice 2\n" +
    "Duy,PLAYERUNKNOWN\'S BATTLEGROUNDS\n" + 
    "Canaan,Prey\n" +
    "Rusty,PLAYERUNKNOWN\'S BATTLEGROUNDS,Nier:Automata\n";

    return this.tallyVotes(csvString);
  }


  
  tallyVotes(csvString) {
    let votes = [];
    let titles = [];
    let arr = CSV.parse(csvString);
    _.forEach(arr, (result) => { 
      votes.push(new Vote(result));
    });
    
    _.forEach(votes, (vote) => {
        _.forEach(vote.results, (result, index) => {
          if (result !== "") {
            let title = _.find(titles, (title) => { return title.name.trim().toLowerCase() === result.trim().toLowerCase(); });
            
            if (!title) {
              title = new Score(result);
              titles.push(title);
            }
    
            title.score += this.getScore(index);
            title.totalVotes += 1; 
            title.firstPlaceVotes += index !== 0 ? 0 : 1;
            title.backgroundColor = this.getRandomColor();
          }
        });
    });

    return _.orderBy(titles, ['score'], ['desc']);;
  }

  getScore(index) {
    return scoring[index];
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

class Vote {
  constructor(result) {
    this.name = result[0].trim();
    this.results = _.drop(result);
  }
}

class Score {
  constructor(title) {
    this.name = title.trim();
    this.score = 0;
    this.firstPlaceVotes = 0;
    this.totalVotes = 0;
  }
}

export default App;
