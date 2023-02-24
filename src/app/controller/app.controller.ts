import type { IAppController } from './index';
import type { IAppModel } from '../model';
import type { IAppView } from '../view';
import type { ICell } from '../../interfaces';
import { EKeyEvent, EDirection, EModelEvent } from '../../enums';


export class AppController implements IAppController {
	private _model: IAppModel;
	private _view: IAppView;

	constructor(model: IAppModel, view: IAppView) {
		this._model =  model;
		this._view = view;

		this.initViewKeyEventHandlers();
		this.subscribeToModelEvents();
	}

	public startDraw(): void {
		this._model.startGame();
	}



	private initViewKeyEventHandlers(): void {
		this._view.addKeyEventHandler(EKeyEvent.LEFT_ARROW, () => this._model.direction = EDirection.LEFT);
		this._view.addKeyEventHandler(EKeyEvent.RIGHT_ARROW, () => this._model.direction = EDirection.RIGHT);
		this._view.addKeyEventHandler(EKeyEvent.UP_ARROW, () => this._model.direction = EDirection.UP);
		this._view.addKeyEventHandler(EKeyEvent.DOWN_ARROW, () => this._model.direction = EDirection.DOWN);
	}

	private subscribeToModelEvents(): void {
		this._model.subscribe(EModelEvent.CELLS_CHANGE, (cells: Array<ICell>) => {
			console.log(cells[0]);
			this._view.draw(cells);
		});
		this._model.subscribe(EModelEvent.FOOD_CHANGE, (food: ICell) => {
			console.log(food);
			this._view.drawFood(food);
		});
	}
}
