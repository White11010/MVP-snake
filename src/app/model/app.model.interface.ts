import type { ICell } from '../../interfaces';
import { EDirection, EModelEvent } from '../../enums';


export interface IAppModel {
	readonly cells: Array<ICell>;
	direction: EDirection;
	startGame(): void;
	subscribe(event: EModelEvent, callback: (...args: any[]) => void): void;
}
