import React, { Component } from 'react';
import { ListItem } from './ListItem';
import { TextListItem } from './TextListItem';
import * as _ from 'lodash';

export class List extends Component {
    render() {
        let list = this.generateList();
        let textList = this.generateTextList();
        return (
            <div>
                <ul className="flex-container">
                    {list}
                </ul>
                <ul>
                    {textList}
                </ul>   
            </div>
        );
    }

    generateList() {
        let listElements = [];
        this.props.titles.forEach((title, index) => {
            listElements.push(<ListItem title={title} place={index + 1} />);
        });

        return listElements;
    }

    generateTextList() {
        let listElements = [];
        let cloneList = _.clone(this.props.titles);
        // _.reverse(cloneList);
        cloneList.forEach((title, index) => {
            listElements.push(<TextListItem title={title} place={index + 1} />);
        });

        return listElements;
    }
}