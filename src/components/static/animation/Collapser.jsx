import React, { Component, PropTypes } from 'react';
import { TweenMax } from 'utils/Greensock';

export function collapser({ toggleAnimTime }) {

	return (DecoratedComponent) => {
		const displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

		return class Collapser extends Component {
			
			static DecoratedComponent = DecoratedComponent;
			static displayName = `Collapser(${displayName})`;
			
			getDecoratedComponentInstance() {
				return this.decoratedComponentInstance;
			}

			componentDidUpdate(prevProps) {
				const wasCollapsed = this.decoratedComponentInstance.checkIsCollapsed(prevProps);
				const isCollapsed = this.decoratedComponentInstance.checkIsCollapsed();
				console.log('collapser did update', wasCollapsed, isCollapsed);
				//si on vient d'ouvrir, animate in
				if (wasCollapsed !== isCollapsed && !isCollapsed) this.animate(true);
			}

			animate(isOpening, callback) {
				const childrenContainer = this.decoratedComponentInstance.getCollapsable();
				// console.log(childrenContainer);
				const dest = isOpening ? 'from' : 'to';
				console.log('animate %s', isOpening ? 'in' : 'out');
				TweenMax.set(childrenContainer, { height: 'auto' });
				TweenMax[dest](childrenContainer, toggleAnimTime, { height: 0, onComplete: callback });
			}

			changeState = (v) => {
				this.decoratedComponentInstance.toggleCollapse(v);
			};

			toggle = () => {
				const isCollapsed = this.decoratedComponentInstance.checkIsCollapsed();
				// console.log('collapsed %s', isCollapsed);
				//si pas ouvert, request le open avant, pour placer les children dans la page
				if (isCollapsed) {
					this.changeState(false);
				} else {
					//ouvert, on ferme
					this.animate(false, () => {
						this.changeState(true);
					});
				}
			};
			
			
			// 	cette fonction est addée au container qui se collapse/decollapse, dans les props du component décoré
			// 	<div ref={this.props.setCollapsableRef}>
			// 	et ajoutera donc ce container aux refs du component décorant
			
			// setCollapsableRef = (el) => {
			// 	console.log('collapsable container', el);
			// 	this._collapsable = el;
			// }

			handleChildRef = (component) => {
				this.decoratedComponentInstance = component;
			};

			onRequestToggleCollapse = () => {
				this.toggle();
				// this.decoratedComponentInstance.toggleCollapse(!this.isCollapsed);
			};

			render() {
				return (<DecoratedComponent {...this.props} onRequestToggleCollapse={this.onRequestToggleCollapse} ref={this.handleChildRef} />);
			}
		};
	};
}
