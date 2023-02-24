import type {ICell} from '../../interfaces/cell.interface';
import type {IAppModel} from './app.model.interface';

import {EDirection} from '../../enums/direction.enum';
import {IObserver, Observer} from '../../utils/observer';
import {EModelEvent} from '../../enums/model-event.enum';


export class AppModel implements IAppModel {
	private _cells: Array<ICell>;
	private _direction: EDirection;
	private _observer: IObserver;

	constructor() {
		this.initCells();
		this.initDirection();
		this._observer = new Observer();
	}

	public startGame(): void {
		setInterval(() => {
			const headCell = this._cells.at(-1)!;
			this._cells.shift();
			if (this._direction === EDirection.RIGHT) {
				this._cells.push({x: headCell.x + 1, y: headCell.y});
			}
			if (this._direction === EDirection.LEFT) {
				this._cells.push({x: headCell.x - 1, y: headCell.y});
			}
			if (this._direction === EDirection.UP) {
				this._cells.push({x: headCell.x, y: headCell.y - 1});
			}
			if (this._direction === EDirection.DOWN) {
				this._cells.push({x: headCell.x, y: headCell.y + 1});
			}
			this._observer.broadcast(EModelEvent.CELLS_CHANGE, this._cells);
		}, 200)
	}

	public get cells(): Array<ICell> {
		return this._cells;
	}

	public get direction(): EDirection {
		return this._direction;
	}

	public set direction(direction: EDirection) {
		this._direction = direction;
	}

	public subscribe(event: EModelEvent, callback: (...args: any[]) => void) {
		this._observer.subscribe(event, callback);
	}

	private initCells(): void {
		this._cells = [
			{ x: 4, y: 5 },
			{ x: 5, y: 5 },
			{ x: 6, y: 5 },
		];
	}

	private initDirection(): void {
		this._direction = EDirection.RIGHT;
	}
}
