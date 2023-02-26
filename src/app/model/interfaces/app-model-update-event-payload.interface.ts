import { ICell } from '../../../interfaces';

export interface IAppModelUpdateEventPayload {
	snake: Array<ICell>,
	food: ICell
}
