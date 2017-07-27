import React, { Component } from 'react';
import { connect } from 'react-redux';

import DocumentMeta from 'react-document-meta';

const metaData = {
	title: 'Freestone Home',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

@connect(
	state => state,
)
export class Troubleshooting extends Component {

	render() {
		// console.log(this.props);
		return (
			<section>
				<DocumentMeta {...metaData} />
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1>Troubleshooting</h1>
							
							<div className="row">
								<div className="col-md-3">
									<button className="button-large">Clear Cache</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
