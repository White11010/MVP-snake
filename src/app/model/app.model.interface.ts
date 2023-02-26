import { EDirection, EModelEvent } from './index';


export interface IAppModel {
	startGame(): void;
	subscribe(event: EModelEvent, callback: (...args: any[]) => void): void;
	setDirection(direction: EDirection): void;
}
