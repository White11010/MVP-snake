import type { IAppView } from './app.view.interface';
import type { ICell } from '../../interfaces';
import { EKeyEvent } from './index';


type TKeyHandlers = Record<EKeyEvent, (...args: any[]) => void> | Record<string,never>;

export interface IAppViewConfig {
	size?: number,
	scale?: number,
	snakeColor?: string,
	foodColor?: string,
}
const defaultConfig: IAppViewConfig = {
	size: 600,
	scale: 15,
	snakeColor: 'green',
	foodColor: 'red',
};

export class AppView implements IAppView {
	private _config: IAppViewConfig;
	private _canvas: HTMLCanvasElement;
	private _context: CanvasRenderingContext2D;
	private _keyHandlers: TKeyHandlers = {};

	constructor(config: IAppViewConfig = {}) {
		this.setConfig(config);
		this.createCanvas();
		this.initEventListeners();
	}

	public draw(snake: Array<ICell>, food: ICell): void {
		this.clearContext();

		this._context.fillStyle = this._config.snakeColor!;
		snake.forEach(cell => {
			this._context.fillRect(
				cell.x * this._config.scale!,
				cell.y * this._config.scale!,
				this._config.scale! - 1,
				this._config.scale! - 1
			);
		});

		this._context.fillStyle = this._config.foodColor!;
		this._context.fillRect(
			food.x * this._config.scale!,
			food.y * this._config.scale!,
			this._config.scale! - 1,
			this._config.scale! - 1
		);
	}

	public addKeyEventHandler(key: EKeyEvent, handler: (...args: any[]) => void): void {
		this._keyHandlers[key] = handler;
	}



	private setConfig(config: IAppViewConfig = {}): void {
		this._config = Object.assign(config, defaultConfig);
	}

	private createCanvas(): void {
		const root = document.querySelector('#app')!;

		this._canvas = document.createElement('canvas');
		this._canvas.setAttribute('width', this._config.size!.toString());
		this._canvas.setAttribute('height', this._config.size!.toString());
		root.appendChild(this._canvas);

		this._context = this._canvas.getContext('2d')!;
	}

	private clearContext(): void {
		this._context.clearRect(0, 0, this._config.size!, this._config.size!);
	}

	private initEventListeners(): void {
		document.addEventListener('keydown', (event: KeyboardEvent) => {
			if (this._keyHandlers[event.key as EKeyEvent]) {
				this._keyHandlers[event.key as EKeyEvent]();
			}
		});
	}
}
