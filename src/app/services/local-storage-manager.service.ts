import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageManagerService {
	public add(key: string, content: any): void {
		localStorage.setItem(key, JSON.stringify(content));
	}

	public get(key: string): any {
		return localStorage.getItem(key);
	}

	public remove(key: string): void {
		localStorage.removeItem(key);
	}
}
