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

export interface IAppModelUpdateEventPayload {
	snake: Array<ICell>,
	food: ICell
}

export class AppModel implements IAppModel {
	private _config: IAppModelConfig;
	private _food: ICell;
	private _cells: Array<ICell>;
	private _direction: EDirection;
	private _observer: IObserver;

	constructor(config: IAppModelConfig = {}) {
		this.setConfig(config);
		this.initCells();
		this.generateNewFood();
		this.initDirection();
		this._observer = new Observer();
	}


	public setDirection(direction: EDirection) {
		if (this.isDirectionChangePossible(direction)) {
			this._direction = direction;
		}
	}

	public startGame(): void {
		const intervalId = setInterval(() => {
			const { x: headX, y: headY } = this._cells.at(-1)!;

			if (this._direction === EDirection.RIGHT) {
				this._cells.push({ x: headX + 1, y: headY });
			}
			if (this._direction === EDirection.LEFT) {
				this._cells.push({ x: headX - 1, y: headY });
			}
			if (this._direction === EDirection.UP) {
				this._cells.push({ x: headX, y: headY - 1 });
			}
			if (this._direction === EDirection.DOWN) {
				this._cells.push({ x: headX, y: headY + 1 });
			}

			if (this.hasHeadIntersectionWithWall()) {
				clearInterval(intervalId);
				this.restartGame();
				return;
			}

			if (this.hasHeadIntersectionWithFood()) {
				this.generateNewFood();
			} else {
				this._cells.shift();
			}

			this._observer.broadcast(EModelEvent.STATE_UPDATE, {
				snake: this._cells,
				food: this._food,
			} as IAppModelUpdateEventPayload);
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

	private hasHeadIntersectionWithFood(): boolean {
		const { x: headX, y: headY } = this._cells.at(-1)!;
		return headX === this._food.x && headY === this._food.y;
	}

	private hasHeadIntersectionWithWall(): boolean {
		const { x: headX, y: headY } = this._cells.at(-1)!;
		return (
			headX > this._config.fieldSize! ||
			headY > this._config.fieldSize! ||
			headY < 0 ||
			headX < 0
		);
	}

	private generateNewFood(): void {
		this._food = {
			x: Math.floor(Math.random() * (this._config.fieldSize!)),
			y: Math.floor(Math.random() * (this._config.fieldSize!))
		};
	}

	private restartGame(): void {
		this.initCells();
		this.initDirection();
		this.generateNewFood();
		this.startGame();
	}
}
