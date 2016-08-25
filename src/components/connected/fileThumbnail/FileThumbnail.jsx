import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(
	state => {
		return {
			env: state.env,
		};
	}
)
export class FileThumbnail extends Component {
	static propTypes = {
		env: React.PropTypes.object,
		dir: React.PropTypes.string,
		val: React.PropTypes.string,
		localVal: React.PropTypes.string,
		type: React.PropTypes.string,
	};

	componentWillMount() {
		this.css = {
			maxHeight: 200,
			maxWidth: 200,
		};
	}


	render() {

		if (!this.props.val && !this.props.localVal) return null;

		const val = this.props.val ? `${this.props.env.thumbsDir}/${this.props.dir}/${this.props.val}` : this.props.localVal;

		return <a href={`${this.props.env.filesDir}/${this.props.dir}/${this.props.val}`} target="_blank"><img src={val} style={this.css} /></a>;

	}
}
