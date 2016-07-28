import { TweenMax } from 'utils/Greensock';

const TOGGLE_ANIM_TIME = 0.5;

export class Collapser {
	constructor({ getOpenState, changeState, getContainer, animTime = TOGGLE_ANIM_TIME }) {
		this.getOpenState = getOpenState;
		this.animTime = animTime;
		this.changeState = changeState;
		this.getContainer = getContainer;
	}

	didUpdate(prevProps) {
		const wasOpen = this.getOpenState(prevProps);
		const isOpen = this.getOpenState();
		// console.log(wasOpen, isOpen);
		//si on vient d'ouvrir, animate in
		if (wasOpen !== isOpen && isOpen) this.animate(true);
	}

	animate(isOpening, callback) {
		const childrenContainer = this.getContainer();
		// console.log(childrenContainer);
		const dest = isOpening ? 'from' : 'to';
		TweenMax.set(childrenContainer, { height: 'auto', overflow: 'hidden' });
		TweenMax[dest](childrenContainer, this.animTime, { height: 0, onComplete: callback });
	}

	toggle = () => {
		//si pas ouvert, request le open avant, pour placer les children dans la page
		if (!this.getOpenState()) {
			this.changeState();
		} else {
			//ouvert, on ferme
			this.animate(false, this.changeState);
		}
	};
}
