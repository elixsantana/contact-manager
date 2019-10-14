import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Contact } from '@components/contact/contact.model';
import { NgForm } from '@angular/forms';
import { EditContactService } from '@services/edit-contact.service';
import { ContactComponent } from '../contact/contact.component';
@Component({
	selector: 'contact-form',
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
	public isInEditMode: boolean = false;

	@Output()
	private readonly onContactBeingEmitted: EventEmitter<Contact> = new EventEmitter<Contact>();

	public contactBeingEdited: Contact = new Contact();

	constructor(private readonly editContactService: EditContactService) {}

	ngOnInit() {
		this.onContactEdit();
	}

	// Submit contact
	public onFormSubmitted(form: NgForm): void {
		if (this.isInEditMode === true) {
			ContactComponent.editState = true;
		} else ContactComponent.editState = false;

		this.onContactBeingEmitted.emit({
			id: this.contactBeingEdited.id,
			firstName: form.value.firstName,
			lastName: form.value.lastName,
			phone: form.value.phone
		} as Contact);

		this.isInEditMode = false;

		ContactComponent.editState = false;

		this.contactBeingEdited.id = 0;

		form.reset(); // Reset input fields after adding data
	}

	private onContactEdit(): void {
		this.editContactService.editContactSubject.subscribe((c: Contact) => {
			this.contactBeingEdited = c;
			this.isInEditMode = true;
		});
	}
}
