import { IAppController } from './app.controller.interface';
import { IAppModel } from '../model/app.model.interface';
import { IAppView } from '../view/app.view.interface';
import { EKeyEvent } from '../../enums/key-event.enum';
import { EDirection } from '../../enums/direction.enum';
import { EModelEvent } from '../../enums/model-event.enum';
import { ICell } from '../../interfaces/cell.interface';

export class AppController implements IAppController {
	private _model: IAppModel;
	private _view: IAppView;

	constructor(model: IAppModel, view: IAppView) {
		this._model =  model;
		this._view = view;

		this.setViewKeyEventHandlers();
		this.subscribeToModelEvents();
	}

	public startDraw(): void {
		this._model.startGame();
	}

	private setViewKeyEventHandlers(): void {
		this._view.addKeyEventHandler(EKeyEvent.LEFT_ARROW, () => this._model.direction = EDirection.LEFT);
		this._view.addKeyEventHandler(EKeyEvent.RIGHT_ARROW, () => this._model.direction = EDirection.RIGHT);
		this._view.addKeyEventHandler(EKeyEvent.UP_ARROW, () => this._model.direction = EDirection.UP);
		this._view.addKeyEventHandler(EKeyEvent.DOWN_ARROW, () => this._model.direction = EDirection.DOWN);
	}

	private subscribeToModelEvents(): void {
		this._model.subscribe(EModelEvent.CELLS_CHANGE, (cells: Array<ICell>) => {
			this._view.draw(cells);
		});
	}
}
