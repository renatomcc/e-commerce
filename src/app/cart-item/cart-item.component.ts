import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'Cart-Item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.sass']
})
export class CartItemComponent implements OnInit {
  @Input() id: number = 0;
  @Input() description: string = '';
  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() category: string = '';
  @Input() image: string = '';
  @Input() itemAmount: number = 1;
  @Input() updatedPrice: number = 0;

  @Output() More: EventEmitter<any> = new EventEmitter();
  @Output() Less: EventEmitter<any> = new EventEmitter();
  @Output() Remove: EventEmitter<any> = new EventEmitter();

  handleMore() {
    this.updatedPrice += this.price;
    this.itemAmount += 1;
    this.More.emit()
  }

  handleLess() {
    if (this.itemAmount == 0)
      return;
    this.updatedPrice -= this.price;
    this.itemAmount -= 1;
    if (this.itemAmount == 0)
      this.updatedPrice *= -1
    this.Less.emit()
  }

  handleRemove() {
    this.Remove.emit()
  }

  constructor() { }

  ngOnInit(): void {
  }

}
