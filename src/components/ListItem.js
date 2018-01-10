import React, { Component } from 'react';
import GiantBombService from '../services/GiantBombService';
import * as _ from 'lodash';

export class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null
        }
    }

    componentDidMount() {
        let gbService = new GiantBombService();
        let coverArt = gbService.getCoverArt(this.props.title.name, (err, res, json) => {
            try {
                let results = json.results;
                
                this.setState({loading: false, data: results[0].image.thumb_url});
            } catch(e) {
                this.setState({loading: false, data: ''});
            }
            
        });
    }
    
    render() {
        if (this.state.loading) {
            return <div class="loader"></div>;
        }

        let title = this.props.title;
        
        return (
            <div className="item-container">
                <li className="flex-item">
                    <div className="place">{this.props.place}</div>
                    <div>{title.name}</div>
                    <img src={this.state.data} />
                    <div>{title.score} points</div>
                    <div>{title.firstPlaceVotes} first place votes</div>
                </li>
            </div>
        );
    }
}

