import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '@components/contact/contact.model';
import { EditContactService } from '@services/edit-contact.service';
import { LocalStorageManagerService } from '@services/local-storage-manager.service';

@Component({
	selector: 'contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
	public static editState: boolean = false;

	@Input()
	public readonly contact: Contact;

	@Output()
	private onContactDeletedEvent: EventEmitter<void> = new EventEmitter<void>();

	constructor(
		private readonly localStorageManagerService: LocalStorageManagerService,
		public readonly editContactService: EditContactService
	) {}

	public onContactBeingEdited(): void {
		ContactComponent.editState = true;
		this.editContactService.editContactSubject.next(this.contact);
	}

	public removeContact(): void {
		if (ContactComponent.editState === false) {
			this.localStorageManagerService.remove(String(this.contact.id));
			this.onContactDeletedEvent.emit();
		} else confirm('Cannot delete while in Edit state. Press OK, then Edit/Submit');
	}
}
