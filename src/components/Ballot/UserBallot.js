import React, { Component } from 'react'
import Container from './Container'

export default class UserBallot extends Component {
	constructor(props) {
		super(props);
		this.state ={
			userId: props.userId
		};
	}

	componentWillReceiveProps(props) {
		this.setState({userId: props.userId});
	}
	
	render() {
		return (
			<div>
				<Container userId={this.state.userId} />
			</div>
		)
	}
}