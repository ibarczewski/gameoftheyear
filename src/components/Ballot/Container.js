import React, { Component } from 'react'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'
import Autocomplete from 'react-autocomplete';
import * as _ from 'lodash';
import MiddlewareService from '../../services/MiddlewareService';
import { last, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

const style = {
	width: 400,
}

let searchSubject$;

export class Container extends Component {
	constructor(props) {
		super(props);
        this.moveCard = this.moveCard.bind(this);
        this.addCard = this.addCard.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onSelectTitle = this.onSelectTitle.bind(this);
        this.shouldItemRender = this.shouldItemRender.bind(this);
        this.cleanupCollections = this.cleanupCollections.bind(this);
        this.removeGame = this.removeGame.bind(this);
        this.middlewareService = new MiddlewareService();
		this.state = {
            title: '',
            cards: [],
            autocompleteItems:[
            ],
            userId: props.userId
		}
    }

    componentWillReceiveProps(props) {
        this.setState({userId: props.userId });
    }

    componentDidMount() {
        searchSubject$ = new Subject();
        searchSubject$
        .pipe(debounceTime(500))
        .subscribe((searchString) => {
            this.changeTitle(searchString);
        });
    }
    
    addCard() {
        let newCards = this.state.cards;
        let photo = _.filter(this.state.autocompleteItems, item => item.label === this.state.title)[0].icon;
        newCards.push({id: this.state.cards.length + 1, text: this.state.title, photo: photo});
        this.cleanupCollections(newCards);
    }

    cleanupCollections(newCards) {
        let items = this.state.autocompleteItems;
        _.remove(items, (item) => {
            return item.label === this.state.title;
        });

        this.setState({
            cards: newCards,
            autocompleteItems: items,
            title: ''
        });

        this.middlewareService.uploadBallot(this.state.userId, newCards);
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
        
        this.middlewareService.uploadBallot(this.state.userId, this.state.cards);
    }
    
    onTitleChange(event) {
        let searchString = event.target.value;
        this.setState({
            title: searchString
        });
        searchSubject$.next(searchString);
    }

    changeTitle(searchString) {
        
        this.middlewareService
        .getGames(searchString)
        .pipe(debounceTime(250), last())
        .subscribe((result) => {
            this.setState({autocompleteItems: result});
        });
    }

    onSelectTitle(val) {
        this.setState({
            title: val
        }, this.addCard);
    }

    shouldItemRender(val) {
        return val.label.toString().toLowerCase().includes(this.state.title.toLowerCase());
    }

    removeGame(gameTitle){
        let oldArray = this.state.cards;
        _.remove(oldArray, (card) => {
            return card.text === gameTitle;
        });

        this.setState({
            cards: oldArray
        });
    }

	render() {
		const { cards } = this.state
        let disableButton = this.state.cards.length >= 15;
		return (
			<div className='search-container' style={style}>
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
                {/* <button onClick={this.addCard} disabled={disableButton}>Add</button> */}
                <div className="foo">
                    {cards.map((card, i) => (
                        <Card
                            key={card.id}
                            index={i}
                            id={card.id}
                            text={card.text}
                            photo={card.photo}
                            moveCard={this.moveCard}
                            removeGame={this.removeGame}
                        />
                    ))}
                </div>
				
                
			</div>
            
		)
	}
}
export default DragDropContext(HTML5Backend)(Container);