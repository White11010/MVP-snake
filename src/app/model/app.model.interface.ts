import type { ICell } from '../../interfaces/cell.interface';
import { EDirection } from '../../enums/direction.enum';
import { EModelEvent } from '../../enums/model-event.enum';

export interface IAppModel {
	readonly cells: Array<ICell>;
	direction: EDirection;
	startGame(): void;
	subscribe(event: EModelEvent, callback: (...args: any[]) => void): void;
}
