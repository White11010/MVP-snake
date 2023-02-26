import type { IAppPresenter } from './index';
// View
import type { IAppView } from '../view';
import { EKeyEvent } from '../view';
// Model
import type { IAppModel, IAppModelUpdateEventPayload } from '../model';
import { EDirection, EModelEvent } from '../model';


export class AppPresenter implements IAppPresenter {
	private _model: IAppModel;
	private _view: IAppView;

	constructor(model: IAppModel, view: IAppView) {
		this._model =  model;
		this._view = view;

		this.initViewKeyEventHandlers();
		this.subscribeToModelEvents();
	}

	public startGame(): void {
		this._model.startGame();
	}



	private initViewKeyEventHandlers(): void {
		this._view.addKeyEventHandler(EKeyEvent.LEFT_ARROW, () => this._model.setDirection(EDirection.LEFT));
		this._view.addKeyEventHandler(EKeyEvent.RIGHT_ARROW, () => this._model.setDirection(EDirection.RIGHT));
		this._view.addKeyEventHandler(EKeyEvent.UP_ARROW, () => this._model.setDirection(EDirection.UP));
		this._view.addKeyEventHandler(EKeyEvent.DOWN_ARROW, () => this._model.setDirection(EDirection.DOWN));
	}

	private subscribeToModelEvents(): void {
		this._model.subscribe(EModelEvent.STATE_UPDATE, ({ snake, food }: IAppModelUpdateEventPayload) => {
			this._view.draw(snake, food);
		});
	}
}
