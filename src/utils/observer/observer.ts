import type { IObserver } from './observer.interface';

export class Observer implements IObserver {
	private observers: Array<{event: string, callback: (...args: any[]) => void}>;

	constructor() {
		this.observers = [];
	}

	public broadcast(event: string, data: any): void {
		this.observers
			.filter(subscriber => subscriber.event === event)
			.forEach(subscriber => subscriber.callback(data));
	}

	public subscribe(event: string, callback: (...args: any[]) => void): void {
		this.observers.push({ event, callback });
	}
}
