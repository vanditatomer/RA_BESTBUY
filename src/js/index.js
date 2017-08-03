import request from "./bestbuy";
import cart from "./cart";
import {carousel} from "./carousel";


export default class App {
	constructor(){
		this.initBBCall();
		this.buttonListen();
	}

	buttonListen()
	{
		$("#productContainer").on("click", ".addButton", (x) => {
			let product = new cart;
			product.sku = $(x.target).data("sku");
			product.price = $(x.target).data("price");
			product.addToCart();
		});
	}

	initBBCall() {
		request({url: "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))",api : "8ccddf4rtjz5k5btqam84qak"})
		.then(result => {
			/* fill carosel with products */
			//console.log(result);
			carousel(result);
		})
		.catch(error => {
			console.log(error);
		});
	}
}
let x = new App;