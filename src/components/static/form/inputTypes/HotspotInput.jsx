import React from 'react';

import { Input } from 'components/static/form/inputTypes/Input';
import { HotspotInsert } from 'components/connected/form/helpers/HotspotInsert';

export class HotspotInput extends Input {
	static propTypes = {
		lang: React.PropTypes.string,
		field: React.PropTypes.object,
	};

	constructor(props) {
		super(props);

		console.log(props);

		this.state = {
			isChoosing: false,
		};
	}

	openModal = () => {
		this.setState({ isChoosing: true });
	}

	closeModal = () => {
		this.setState({ isChoosing: false });
	};

	handleEditorChange = (v) => {
		console.log('set val', v);
		this.changeVal(v);
	};

	delete = (e) => {
		this.handleEditorChange(null);
	};

	render() {
		const value = (this.props.val) ? JSON.parse(this.props.val) : { x: 0.5, y: 0.5 };

		if (this.state.isChoosing) {
			return (<HotspotInsert parentRecordId={this.props.parentRecordId} imageFieldId={this.props.field.hotspot.imageFieldId} onClose={this.closeModal} val={value} setVal={this.handleEditorChange} lang={this.props.lang} />);
		}

		const label = (!this.props.val) ? 'Add a hotspot' : 'Modify hotspot';

		return (
			<div>
				<input type="hidden" value={this.props.val} />
				<button onClick={this.openModal} className="button-round-bordered-action">{label}</button>
			</div>
		);
	}
}
