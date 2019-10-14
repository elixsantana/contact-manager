import {
	Component,
	EventEmitter,
	AfterViewInit,
	Input,
	ChangeDetectorRef,
	ChangeDetectionStrategy
} from '@angular/core';
import { LocalStorageManagerService } from '@services/local-storage-manager.service';
import { Contact } from '@components/contact/contact.model';

@Component({
	selector: 'contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ContactsComponent implements AfterViewInit {
	@Input()
	public readonly listener: EventEmitter<void>;

	public contacts: Contact[] = [];

	public isInEditMode: boolean = false;

	constructor(
		private readonly changeDetectorRef: ChangeDetectorRef,
		private readonly localStorageManagerService: LocalStorageManagerService
	) {}

	ngAfterViewInit() {
		this.updateList();
		this.listener.subscribe(() => {
			this.updateList();
		});
	}

	public updateList(): void {
		this.contacts = [];
		let i: number = 1;
		const id: number = Number(this.localStorageManagerService.get('latestId'));

		while (i <= id) {
			const c: Contact = JSON.parse(this.localStorageManagerService.get(String(i)));
			if (!!c) {
				this.contacts.push(c);
			}
			i++;
		}
		this.changeDetectorRef.detectChanges();
	}
}
