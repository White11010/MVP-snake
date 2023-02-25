import type { ICell } from '../../interfaces';
import { EKeyEvent } from '../../enums';


export interface IAppView {
	draw(snake: Array<ICell>, food: ICell): void;
	addKeyEventHandler(key: EKeyEvent, handler: (...args: any[]) => void): void;
}
