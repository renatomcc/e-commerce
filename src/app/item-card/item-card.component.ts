import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface Rate {
  count: number,
  rate: number
}

@Component({
  selector: 'Item-Card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.sass']
})
export class ItemCardComponent implements OnInit {
  @Input() id: number = 0;
  @Input() description: string = '';
  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() category: string = '';
  @Input() image: string = '';

  @Output() addToCart: EventEmitter<any> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<any> = new EventEmitter();
  @Output() modal: EventEmitter<any> = new EventEmitter();
  @Output() disableModal: EventEmitter<any> = new EventEmitter();

  added: boolean = false
  amount: number = 0
  showModal: boolean = false

  moreItens() {
    this.amount += 1;
    this.addToCart.emit();
  }

  lessItens() {
    this.amount -= 1;
    this.removeFromCart.emit();
    if (this.amount <= 0) this.added = false
  }

  modalOn() {
    this.showModal = true
    this.modal.emit()
  }

  modalOff() {
    this.showModal = false
    this.disableModal.emit()
  }

  constructor() { }

  ngOnInit(): void {
  }

}
