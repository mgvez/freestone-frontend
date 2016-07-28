import React, { Component, PropTypes } from 'react';
import { TweenMax } from 'utils/Greensock';

const noop = () => null;

export function collapser({	toggleAnimTime = 0.5, checkIsCollapsed }) {

	return (DecoratedComponent) => {
		const displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

		return class Collapser extends Component {
			
			static DecoratedComponent = DecoratedComponent;
			static displayName = `Collapser(${displayName})`;
			
			getDecoratedComponentInstance() {
				return this.decoratedComponentInstance;
			}

			componentWillMount() {
				console.log('will mount');
				this.changeCollapsed(checkIsCollapsed(this.props));
				this.changeAnimating(false);
			}

			componentDidUpdate() {
				//si on vient d'ouvrir, animate in
				const isCollapsed = checkIsCollapsed(this.props);
				console.log('collapser did update, collapsed %s', isCollapsed);

				if (this.state.isCollapsed !== isCollapsed) this.animate(!isCollapsed);
			}

			animate(isOpening, callback = noop) {
				if (this.state.isAnimating) return null;
				this.changeAnimating(true);
				
				const childrenContainer = this.decoratedComponentInstance.getCollapsable();
				if (!childrenContainer) return null;


				// console.log(childrenContainer);
				const dest = isOpening ? 'from' : 'to';
				console.log('animate %s', isOpening ? 'in' : 'out');
				TweenMax.set(childrenContainer, { height: 'auto', overflow: 'hidden' });
				TweenMax[dest](childrenContainer, toggleAnimTime, 
					{
						height: 0,
						onComplete: () => {
							this.changeAnimating(false);
							this.changeCollapsed(!isOpening);
							callback();
						},
					}
				);
			}

			changeAnimating(v) {
				this.setState({ isAnimating: v });
			}

			changeCollapsed(v) {
				console.log('change collapse %s', v);
				this.setState({ isCollapsed: v });
			}

			handleChildRef = (component) => {
				this.decoratedComponentInstance = component;
			};

			render() {
				const isShowCollapsable = !this.state.isCollapsed || this.state.isAnimating;
				console.log('render collapser, show? %s', isShowCollapsable);

				return (<div>
					Collapser
					<DecoratedComponent 
						{...this.props}
						isShowCollapsable={isShowCollapsable}
						ref={this.handleChildRef}
					/>
				</div>);
			}
		};
	};
}
