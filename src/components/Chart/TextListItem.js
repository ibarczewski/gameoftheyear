import React, { Component } from 'react';

export class TextListItem extends Component {
    
    render() {
        let title = this.props.title;
        
        return (
            <div>
                <li class="text-list-item">
                    <div>{this.props.place}. {title.name} - {title.score} points, {title.firstPlaceVotes} first place {title.firstPlaceVotes === 1 ? "vote" : "votes" }</div>
                </li>
            </div>
        );
    }
}

