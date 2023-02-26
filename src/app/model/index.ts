import type { IAppModel } from './app.model.interface';
import type { IAppModelConfig, IAppModelUpdateEventPayload } from './interfaces';
import { EDirection, EModelEvent } from './enums';
import { AppModel } from './app.model';

export {
	AppModel,
	EDirection,
	EModelEvent
};

export type {
	IAppModelConfig,
	IAppModel,
	IAppModelUpdateEventPayload,
};
