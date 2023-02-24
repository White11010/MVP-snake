import type { IAppModel } from './index';
import type { ICell } from '../../interfaces';
import type { IObserver } from '../../utils/observer';
import { EDirection, EModelEvent } from '../../enums';
import { Observer } from '../../utils/observer';


export interface IAppModelConfig {
	fieldSize?: number,
	renderInterval?: number;
}
const defaultConfig: IAppModelConfig = {
	fieldSize: 40,
	renderInterval: 200,
};

export class AppModel implements IAppModel {
	private _config: IAppModelConfig;
	private _food: ICell;
	private _cells: Array<ICell>;
	private _direction: EDirection;
	private _observer: IObserver;

	constructor(config: IAppModelConfig = {}) {
		this.setConfig(config);
		this.initCells();
		this._food = this.generateFood();
		this.initDirection();
		this._observer = new Observer();
	}

	public get cells(): Array<ICell> {
		return this._cells;
	}

	public get food(): ICell {
		return this._food;
	}

	public get direction(): EDirection {
		return this._direction;
	}

	public set direction(direction: EDirection) {
		if (this.isDirectionChangePossible(direction)) {
			this._direction = direction;
		}
	}

	public startGame(): void {
		setInterval(() => {
			const headCell = this._cells.at(-1)!;
			this._cells.shift();
			if (this._direction === EDirection.RIGHT) {
				this._cells.push({ x: headCell.x + 1, y: headCell.y });
			}
			if (this._direction === EDirection.LEFT) {
				this._cells.push({ x: headCell.x - 1, y: headCell.y });
			}
			if (this._direction === EDirection.UP) {
				this._cells.push({ x: headCell.x, y: headCell.y - 1 });
			}
			if (this._direction === EDirection.DOWN) {
				this._cells.push({ x: headCell.x, y: headCell.y + 1 });
			}
			this._observer.broadcast(EModelEvent.CELLS_CHANGE, this._cells);
			this._observer.broadcast(EModelEvent.FOOD_CHANGE, this._food);
		}, this._config.renderInterval);
	}

	public subscribe(event: EModelEvent, callback: (...args: any[]) => void) {
		this._observer.subscribe(event, callback);
	}



	private setConfig(config: IAppModelConfig = {}): void {
		this._config = Object.assign(config, defaultConfig);
	}

	private initCells(): void {
		this._cells = [
			{ x: this._config.fieldSize! / 2 - 1, y: this._config.fieldSize! / 2 },
			{ x: this._config.fieldSize! / 2, y: this._config.fieldSize! / 2 },
			{ x: this._config.fieldSize! / 2 + 1, y: this._config.fieldSize! / 2 },
		];
	}

	private initDirection(): void {
		this._direction = EDirection.RIGHT;
	}

	private isDirectionChangePossible(direction: EDirection): boolean {
		const oppositeDirectionsMap: Record<EDirection, EDirection> = {
			[EDirection.LEFT]: EDirection.RIGHT,
			[EDirection.UP]: EDirection.DOWN,
			[EDirection.RIGHT]: EDirection.LEFT,
			[EDirection.DOWN]: EDirection.UP,
		};

		return oppositeDirectionsMap[direction] !== this._direction;
	}

	private generateFood(): ICell {
		return {
			x: Math.floor(Math.random() * (this._config.fieldSize!)),
			y: Math.floor(Math.random() * (this._config.fieldSize!))
		};
	}
}
