import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LocalStorageManagerService } from '@services/local-storage-manager.service';
import { Contact } from '@components/contact/contact.model';
import { EditContactService } from '@services/edit-contact.service';

@Component({
	selector: 'main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	public contactBeingEdited: Contact = new Contact();
	private readonly startIndex: number = 1;
	private id: number = this.startIndex;
	constructor(private readonly localStorageManagerService: LocalStorageManagerService) {}

	//	@Output()
	public readonly onUpdateContactList: EventEmitter<void> = new EventEmitter<void>();

	ngOnInit() {
		this.id = Number(this.localStorageManagerService.get('latestId')) || this.startIndex;
		if (this.id > this.startIndex) {
			this.id++;
		}
	}

	public onContactBeingReceived(contact: Contact): void {
		if (!!contact.id) {
			this.saveEditedContact(contact);
		} else {
			this.createNewContact(contact);
		}
	}

	private saveEditedContact(contact: Contact): void {
		const currContact: Contact = JSON.parse(this.localStorageManagerService.get(String(contact.id)));
		currContact.firstName = contact.firstName;
		currContact.lastName = contact.lastName;
		currContact.phone = contact.phone;
		this.localStorageManagerService.add(String(contact.id), currContact);
		this.onUpdateContactList.emit();
	}

	private createNewContact(contact: Contact): void {
		this.localStorageManagerService.add('latestId', this.id);
		contact.id = this.id;
		this.localStorageManagerService.add(this.id.toString(), contact);
		this.id++;
		this.onUpdateContactList.emit();
	}
}
