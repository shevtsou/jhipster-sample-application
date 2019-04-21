export interface ICondition {
    id?: number;
    name?: string;
}

export class Condition implements ICondition {
    constructor(public id?: number, public name?: string) {}
}
