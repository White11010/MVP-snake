import { EKeyEvent } from '../../enums/key-event.enum';
import { ICell } from '../../interfaces/cell.interface';

export interface IAppView {
	draw(cells: Array<ICell>): void;
	addKeyEventHandler(key: EKeyEvent, handler: (...args: any[]) => void): void;
}
