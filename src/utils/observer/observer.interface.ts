export interface IObserver {
	subscribe(event: string, callback: (...args: any[]) => void): void;
	broadcast(event: string, data: any): void;
}
