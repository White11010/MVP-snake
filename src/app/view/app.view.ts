import { IAppView } from './app.view.interface';
import { EKeyEvent } from '../../enums/key-event.enum';
import { ICell } from '../../interfaces/cell.interface';

type TKeyHandlers = Record<EKeyEvent, (...args: any[]) => void> | Record<string,never>;

export class AppView implements IAppView {
	private _canvas: HTMLCanvasElement;
	private _context: CanvasRenderingContext2D;
	private _keyHandlers: TKeyHandlers = {};

	constructor() {
		this.createCanvas();
		this.initEventListeners();
	}

	public draw(cells: Array<ICell>): void {
		this._context.clearRect(0, 0, 600, 600);
		this._context.fillStyle = 'green';
		cells.forEach(cell => {
			this._context.fillRect(cell.x * 10, cell.y * 10, 10-1, 10-1);
		});
	}

	public addKeyEventHandler(key: EKeyEvent, handler: (...args: any[]) => void): void {
		this._keyHandlers[key] = handler;
	}


	private createCanvas(): void {
		const root = document.querySelector('#app')!;

		this._canvas = document.createElement('canvas');
		this._canvas.setAttribute('width', '600');
		this._canvas.setAttribute('height', '600');
		root.appendChild(this._canvas);

		this._context = this._canvas.getContext('2d')!;
	}

	private initEventListeners(): void {
		document.addEventListener('keydown', (event: KeyboardEvent) => {
			if (this._keyHandlers[event.key as EKeyEvent]) {
				this._keyHandlers[event.key as EKeyEvent]();
			}
		});
	}
}
