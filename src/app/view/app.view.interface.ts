import type { ICell } from '../../interfaces';
import { EKeyEvent } from '../../enums';


export interface IAppView {
	draw(cells: Array<ICell>): void;
	drawFood(food: ICell): void;
	addKeyEventHandler(key: EKeyEvent, handler: (...args: any[]) => void): void;
}
