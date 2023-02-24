// TODO
// 1. Написать интерфейс для событий модели (пейлоада)
// 2. Связать вместе размеры поля в модели и вью
// 3. Объеденить 2 события модели в одно
// 4. Добавить проверку на пересечение с едой
// 5. Добавить классы для Змеи и Еды


import type { IAppController } from './controller';
import { AppController } from './controller';
import { AppModel } from './model';
import { AppView } from './view';

export class App {
	private _controller: IAppController;

	constructor(controller: IAppController = new AppController(new AppModel(), new AppView())) {
		this._controller = controller;
	}

	public start(): void {
		this._controller.startDraw();
	}
}
