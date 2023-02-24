import {AppController} from './controller/app.controller';
import {AppModel} from './model/app.model';
import {AppView} from './view/app.view';
import {IAppController} from './controller/app.controller.interface';

export class App {
	private _controller: IAppController;

	constructor(controller: IAppController = new AppController(new AppModel(), new AppView())) {
		this._controller = controller;
	}

	public start(): void {
		this._controller.startDraw();
	}
}
