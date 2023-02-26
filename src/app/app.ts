// TODO
// 2. Связать вместе размеры поля в модели и вью
// 5. Добавить классы для Змеи и Еды
// 6. Занести интерфейсы и енумы в соответсвующие директории


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
