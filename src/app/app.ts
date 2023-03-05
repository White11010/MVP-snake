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
