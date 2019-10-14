import { Injectable } from '@angular/core';
import { Contact } from '@components/contact/contact.model';
import { Subject } from 'rxjs';

@Injectable()
export class EditContactService {
	public readonly editContactSubject: Subject<Contact> = new Subject<Contact>();
}
