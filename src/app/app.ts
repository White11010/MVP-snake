// TODO
// + 1. Написать интерфейс для событий модели (пейлоада) +
// 2. Связать вместе размеры поля в модели и вью
// + 3. Объеденить 2 события модели в одно +
// 4. Добавить проверку на пересечение с едой
// 5. Добавить классы для Змеи и Еды


import type { IAppPresenter } from './presenter';
import { AppPresenter } from './presenter';
import { AppModel } from './model';
import { AppView } from './view';

export class App {
	private _presenter: IAppPresenter;

	constructor(presenter: IAppPresenter = new AppPresenter(new AppModel(), new AppView())) {
		this._presenter = presenter;
	}

	public startGame(): void {
		this._presenter.startGame();
	}
}
