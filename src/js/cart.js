export default class {
	constructor(){
		this.sku = "";
		this.price = "";
	}

	addToCart(){

		let cart = {
			price: 0,
			quantity: 0,
			cartTotal: 0 
		}

		let item = sessionStorage.getItem(this.sku); 
		let cartProduct = null;

		if (item == null) {
			cart.price = this.price;
			cart.quantity = 1;
			cart.cartTotal = cart.price * cart.quantity; 
		} else {
			cartProduct = JSON.parse(item);
			cart.price = cartProduct.price;
			cart.quantity = cartProduct.quantity + 1;
			cart.cartTotal = cart.price * cart.quantity;
		}

		item = JSON.stringify(cart);
		sessionStorage.setItem(this.sku, item);

		item = sessionStorage.getItem(this.sku);
		cartProduct = JSON.parse(item);

		// console.log(sessionStorage);
		// console.log(sessionStorage.getItem(this.sku));

		console.log("sku: " + this.sku + ", price: " + cartProduct.price + ", quantity: " + cartProduct.quantity + ", total: " + cartProduct.cartTotal)

	}

};