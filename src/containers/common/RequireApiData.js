
const MAX_ATTEMPTS = 3;

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
		// console.log(props.table, tableName);
		if (!props[propName]) {
			if (this.attempts[propName] < MAX_ATTEMPTS) {
				return fetchCallback.apply(null, fetchArgs);
			}
			throw new Error(`Attempted ${MAX_ATTEMPTS} times to fetch ${propName}. It's too damn high.`);
		} else {
			this.attempts[propName] = 0;
		}
	}
}
