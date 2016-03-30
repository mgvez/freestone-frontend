
const MAX_ATTEMPTS = 1;

export class RequireApiData {
	constructor() {
		this.attempts = {};
	}
	/**
	makes sure that props[propName] exists, otherwise call provided action. If action is called MAX_ATTEMPTS time without success, throws error
	*/
	requireProp(propName, props, fetchCallback, fetchArgs) {
		this.attempts[propName] = this.attempts[propName] || 0;
		this.attempts[propName]++;
		// console.log(props[propName], propName);
		if (!props[propName]) {
			// console.log('attempt ' + this.attempts[propName]);
			if (this.attempts[propName] <= MAX_ATTEMPTS) {
				// console.log('fetch');
				return fetchCallback.apply(null, fetchArgs);
			}
			// const args = JSON.stringify(fetchArgs);
			// throw new Error(`Attempted ${MAX_ATTEMPTS} times to fetch ${propName}. It's too damn high... ${fetchArgs}`);
		} else {
			this.attempts[propName] = 0;
		}
	}

	requirePropVal(prop, fetchCallback, fetchArgs) {
		if (!prop) {
			return fetchCallback.apply(null, fetchArgs);
		}
	}
}
