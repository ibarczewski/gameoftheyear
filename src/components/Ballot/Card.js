import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
    border: '1px solid gainsboro',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    borderRadius: '3px',
    backgroundColor: 'white',
    cursor: 'move',
}

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        }
    },
}

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex;

    },
}

export class Card extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		text: PropTypes.string.isRequired,
		moveCard: PropTypes.func.isRequired,
	}

	render() {
		const {
			text,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props
        const opacity = isDragging ? 0 : 1
        // const transform = isDragging ? 'translate(120px, 50%)' : '';
        // const transform = 'translate(120px, 50%)';
        const backgroundColor = isDragging ? 'red' : '';
        let element = (
        <div className="ballot-item" style={{ ...style, opacity, backgroundColor }}>
            <img src={this.props.photo} />
            <div>{text}</div>
            <button onClick={() => { this.props.removeGame(text); }}>X</button>
        </div>
        );

		return connectDragSource(
			connectDropTarget(element),
		)
	}
}

export default DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(Card));