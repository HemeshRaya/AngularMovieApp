import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  data:any| null = null;
  constructor(public modalRef: MdbModalRef<ModalComponent>) {}
}