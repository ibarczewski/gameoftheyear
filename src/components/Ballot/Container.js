import React, { Component } from 'react'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'
import DragSource from 'react-dnd/lib/DragSource';
import Autocomplete from 'react-autocomplete';
import * as _ from 'lodash';
import BallotService from '../../services/BallotService';
import GiantBombService from '../../services/GiantBombService';
import { setTimeout } from 'timers';

const style = {
	width: 400,
}

export class Container extends Component {
    requestTimer = null;

	constructor(props) {
		super(props);
        this.moveCard = this.moveCard.bind(this);
        this.addCard = this.addCard.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onSelectTitle = this.onSelectTitle.bind(this);
        this.shouldItemRender = this.shouldItemRender.bind(this);
        this.cleanupCollections = this.cleanupCollections.bind(this);
		this.state = {
            title: '',
            cards: [],
            autocompleteItems:[
            ]
		}
    }
    
    addCard() {
        let newCards = this.state.cards;
        newCards.push({id: this.state.cards.length + 1, text: this.state.title });
        this.cleanupCollections(newCards)
    }

    cleanupCollections(newCards) {
        let ballotService = new BallotService();
        let items = this.state.autocompleteItems;
        _.remove(items, (item) => {
            return item.label === this.state.title;
        });

        this.setState({
            cards: newCards,
            autocompleteItems: items,
            title: ''
        });

        ballotService.uploadBallot(1, newCards);
    }

	moveCard(dragIndex, hoverIndex) {
		const { cards } = this.state
		const dragCard = cards[dragIndex]

		this.setState(
			update(this.state, {
				cards: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			}),
        );
        
        let ballotService = new BallotService();
        ballotService.uploadBallot(1, this.state.cards);
    }
    
    onTitleChange(event) {
        this.setState({
            title: event.target.value
        });
        
        let service = new GiantBombService();
        clearTimeout(this.requestTimer);
        let foo = event.target.value;
        this.requestTimer = setTimeout(() => {
            service.getGames(foo).then((result) => {
            this.setState({autocompleteItems: JSON.parse(result)});
            });
        }, 500);
    }

    onSelectTitle(val) {
        this.setState({
            title: val
        }, this.addCard);
    }

    shouldItemRender(val) {
        return val.label.toString().toLowerCase().includes(this.state.title.toLowerCase());
    }

	render() {
		const { cards } = this.state
        let disableButton = this.state.cards.length >= 15;
		return (
			<div style={style}>
				{cards.map((card, i) => (
					<Card
						key={card.id}
						index={i}
						id={card.id}
						text={card.text}
						moveCard={this.moveCard}
					/>
                ))}
                <Autocomplete
                    getItemValue={(item) => item.label}
                    items={this.state.autocompleteItems}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.label}
                        </div>
                    }
                    value={this.state.title}
                    onChange={this.onTitleChange}
                    onSelect={this.onSelectTitle}
                    autoHighlight={true}
                    shouldItemRender={this.shouldItemRender}
                />
                <button onClick={this.addCard} disabled={disableButton}>Add</button>
			</div>
            
		)
	}
}
export default DragDropContext(HTML5Backend)(Container);