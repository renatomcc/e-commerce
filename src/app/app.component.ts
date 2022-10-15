import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MyDataService } from './services/my-data.service';
import { take } from 'rxjs';

interface Product {
  id: number;
  description: string;
  title: string;
  price: number;
  category: string;
  image: string;
  itemAmount: number;
  updatedPrice: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  myData: any;
  products: Product[] = [];
  cartProducts: Product[] = [];
  filteredProducts: Product[] = this.products;
  showCart: boolean = false
  cartAmount: number = 0
  cartPrice: any = 0
  constructor(private myDataService: MyDataService) { }

  ngOnInit(): void {
    this.myDataService.getData().pipe(take(1)).subscribe((data) => {
      this.myData = data
      console.log(this.myData.length)
      this.myData.map((item: Product) => {
        const newItem = {
          id: item.id,
          description: item.description,
          title: item.title.replace(/^(.{25}[^\s]*).*/, "$1"),
          price: item.price,
          category: item.category.replace("'", ""),
          image: item.image,
          itemAmount: 1,
          updatedPrice: item.price
        }
        this.products.push(newItem);
      })
    });
  }

  setCategory(newCategory: string) {
    console.log(this.filteredProducts)
    if (newCategory == 'all') {
      this.filteredProducts = this.products
      return;
    }
    this.filteredProducts = this.products.filter(item => item.category == newCategory);
  }

  onAddToCart(id: number, title: string, price: number, image: string, description: string, category: string) {
    this.cartAmount += 1
    this.cartPrice += price
    let newProduct: Product = {
      id: id,
      title: title,
      price: price,
      image: image,
      description: description,
      category: category,
      itemAmount: 1,
      updatedPrice: price,
    }
    let alreadyAdded: boolean = false;
    this.cartProducts.map(data => {
      if (data.id == id) {
        alreadyAdded = true;
        data.itemAmount += 1;
        data.updatedPrice += price
      }
    })
    if (alreadyAdded == false) {
      this.cartProducts.push(newProduct)
    }
  }

  onRemoveFromCart(id: number, title: string, price: number, image: string, description: string, category: string) {
    if (this.cartAmount == 0) return;
    this.cartAmount -= 1
    this.cartPrice -= price
  }

  updateCartOnAdd(id: number, price: number) {
    this.cartProducts.map(item => {
      if (item.id == id) {
        item.itemAmount += 1
        item.updatedPrice += price
      }
    })
    this.cartPrice += price;
    console.log(this.cartPrice)
    this.cartAmount += 1;
  }

  updateCartOnRemove(id: number, price: number) {
    if (this.cartAmount == 0) return;
    this.cartProducts.map(item => {
      if (item.id == id) {
        item.itemAmount -= 1
        item.updatedPrice -= price
        if (item.itemAmount == 0) {
          item.updatedPrice *= -1
          console.log('multiplicou por -1')
        }
      }
    })
    this.cartPrice -= price;
    this.cartAmount -= 1;
  }

  removeItemFromCart(id: number) {
    this.cartProducts.map(item => {
      if (item.id == id) {
        console.log('encontrado', this.cartProducts)
        this.cartProducts.splice(this.cartProducts.indexOf(item), 1)
        console.log('teoricamente removido', this.cartProducts)
      }
    })
  }

  onModal() {
    document.body.style.height = '100vh'
    document.body.style.overflow = 'hidden'
  }

  onModalOff() {
    console.log('chamou')
    document.body.style.overflow = 'auto'
  }
}
