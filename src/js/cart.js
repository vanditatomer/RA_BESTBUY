export default class {
	constructor(){
		this.sku = "";
		this.price = "";
		this.cart = {
			price: 0,
			quantity: 0,
		}
	}

	addToCart(){

		let item = sessionStorage.getItem(this.sku); 
		let cartProduct = null;

		if (item == null) {
			this.cart.price = this.price;
			this.cart.quantity = 1;
			this.cart.cartTotal = this.cart.price * this.cart.quantity; 
		} else {
			cartProduct = JSON.parse(item);

			this.cart.price = cartProduct.price;
			this.cart.quantity = cartProduct.quantity + 1;
		}

		item = JSON.stringify(this.cart);
		sessionStorage.setItem(this.sku, item);

		item = sessionStorage.getItem(this.sku);
		cartProduct = JSON.parse(item);

		console.log(sessionStorage);
		// console.log(sessionStorage.getItem(this.sku));
		this.getTotalCartPrice();
		this.buildCartHtml();
		console.log("sku: " + this.sku + ", price: " + cartProduct.price + ", quantity: " + cartProduct.quantity + " Total Items: "+ this.getTotalCartItems() + " Total Price: "+ this.getTotalCartPrice());

	}

	//JAVASCRIPT DOES THIS AUTOMATICALLY - THIS WILL RETURN THE TOTAL NUMBER OF ITEMS IN THE CART
	getTotalCartItems () {
		return sessionStorage.length;
	}

	// let x = {
	// 	key : {price:50,qnt:4}
	// }
	// x.1000056;

	getTotalCartPrice () {
		let totalQuantity = 0;
		let priceTotal = 0;
		for (let key in sessionStorage) {
			let x = JSON.parse(sessionStorage[key]);
			totalQuantity = totalQuantity + x.quantity;

			//let y = JSON.parse(sessionStorage[key]);
			priceTotal += x.price * x.quantity;


			//let totalPrice = (price * );
			document.getElementById('itemCount').innerHTML = totalQuantity;
			document.getElementById('itemPrice').innerHTML = priceTotal;
			//document.getElementById('itemPrice').innerHTML = cartTotal;

		}
		return priceTotal;
	}
	buildCartHtml () {
		let itemCount = document.getElementById("itemCount");
			if (itemCount.style.display != "block") 
			{
				itemCount.style.display = "block";
			}
			itemCount.innerHTML = this.getTotalCartItems();

	}

};