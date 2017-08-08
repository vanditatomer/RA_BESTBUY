export default class {
	constructor(){
		this.sku = "";
		this.price = "";
		this.cart = {
			price: 0,
			quantity: 0,
		}
	}

	addToCart()
	{

		let item = sessionStorage.getItem(this.sku); 
		let cartProduct = null;

		if (item == null) {
			this.cart.price = this.price;
			this.cart.quantity = 1;
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
		this.getTotalCartItems();
		this.getTotalCartPrice();
		this.buildCartHtml();
		console.log("sku: " + this.sku + ", price: " + cartProduct.price + ", quantity: " + cartProduct.quantity + " Total Items: "+ this.getTotalCartItems() + " Total Price: "+ this.getTotalCartPrice());

		let cartObj = null;
		let productLine = "";
		let lineDivide = "";
		let getTotalCartItems = 0;

		$('.modalItem').remove();

			getTotalCartItems = sessionStorage.length;

			if (getTotalCartItems > 0) {
				for (let i = 0; i < getTotalCartItems; i++)
				{
					this.sku = sessionStorage.key(i);

					item = sessionStorage.getItem(this.sku);
					cartObj = JSON.parse(item);

			  		productLine = 'line' + (i+1).toString();
			  		lineDivide = productLine + '-hr';

			  		if (i > 0) {
						$('.modalBody').append('<hr id="' + lineDivide + '" class="modalItem">');
			  		}

					$('.modalBody').append('<div id="' + productLine + '" class="modalItem flex">'
						+ '<div>SKU : ' + this.sku + '</div>'
						+ '<div>QUANTITY : <input type="text" class="cartQuantity" maxlength="2" value="' + this.cart.quantity + '"></div>'
						+ '<div>TOTAL : $<span>' + cartObj.total + '</span></div>'
						+ '<div><button type="button" class="update-button" data-sku="' + this.sku + '">UPDATE</button>'
						+ '<button type="button" class="remove-button" data-sku="' + this.sku + '">REMOVE</button></div>'
						+ '</div>');
				}			
			}
			else
			{
				this.setEmptyCart();
			}
	}

	updateItemAmount () {
		let productLine = $(this.x.target).parent().parent().attr("id");
		let sku = $(this.x.target).data('sku');
		let quantity = $(this.x.target).parent().parent().find("input").val();

		if (quantity == 0) {
			this.removeCartItem()
			return;
		}

		let item = sessionStorage.getItem(sku);

		if (item != null) {
			let cartObj = JSON.parse(item);

			cartObj.quantity = quantity;
			cartObj.total = cartObj.price * quantity;

			$('#' + productLine).find("span").text(cartObj.total);

			item = JSON.stringify(cartObj);
			sessionStorage.setItem(sku, item);
		}

		this.setItemCount();
		this.setCartTotal();

		alert("Quantity updated")
	}

	removeCartItem () {
		let productLine = $(this.x.target).parent().parent().attr("id");
		let sku = $(this.x.target).data('sku');
		
		if (response != true) {
			return;
		}

		sessionStorage.removeItem(sku);

		let lineDivide = null;

		lineDivide = $(this.x.target).parent().parent().prev().attr("id");
		if (!lineDivide) {
			lineDivide = $(this.x.target).parent().parent().next().attr("id");
		}

		$('#' + productLine).remove();

		if (lineDivide) {
			$('#' + lineDivide).remove();
		}

		if (sessionStorage.length == 0) {
			this.setEmptyCart();
		}

		this.setItemCount();
		this.setCartTotal();

		alert("Item removed from cart")
	}

	setItemCount () {
		let x = document.getElementById("itemCount");
		let itemCount = sessionStorage.length;

		if (itemCount > 0) {
			if (x.style.display != "block") {
				x.style.display = "block";
			}

			x.textContent = itemCount.toString();
		}
		else
		{
			x.style.display = "none";
		}
	}

	getTotalCartItems () {
		return sessionStorage.length;
	}

	getTotalCartPrice () {
		let totalQuantity = 0;
		let priceTotal = 0;
		for (let key in sessionStorage) {
			let x = JSON.parse(sessionStorage[key]);
			totalQuantity = totalQuantity + x.quantity;
			priceTotal += x.price * x.quantity;

			document.getElementById('itemCount').innerHTML = totalQuantity;
			document.getElementById('itemPrice').innerHTML = priceTotal;

		}
		return priceTotal;
	}

	buildCartHtml () 
	{
		let itemCount = document.getElementById("itemCount");
			if (itemCount.style.display != "block") 
			{
				itemCount.style.display = "block";
			}
			itemCount.innerHTML = this.getTotalCartItems();

		//Get the modal
		let modal = document.getElementById('myModal');

		// Get the button that opens the modal
		let btn = document.getElementById("cart");

		// Get the <span> element that closes the modal
		let span = document.getElementsByClassName("close")[0];

		// When the user clicks on the button, open the modal 
		btn.onclick = function() {
		    modal.style.display = "block";
		}

		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		    modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }

	}

}

	setCartTotal () {
		let skuKey = "";
		let item = null;
		let cartObj = null;
		let totalItems = 0;
		let totalAmount = 0;

		$('#cart-total').remove();

		totalItems = sessionStorage.length;

		for (let i = 0; i < totalItems; i++)
		{
			skuKey = sessionStorage.key(i);

			item = sessionStorage.getItem(skuKey);
			cartObj = JSON.parse(item);

			totalAmount += cartObj.total;
		}

		$('.modalHeader').append('<div id="cart-total" class="modalItem">'
			+ '<p>YOUR ITEMS : <span>' + totalItems + '</span> | ' + 'CART TOTAL : <span>$' + totalAmount.toFixed(2) + '</span></p>'
			+ '</div>');
	}

	setEmptyCart () {
		$('.modalBody').append('<p class="modalItem">YOUR CART IS EMPTY.</p>');
	}

	quantityValidation () {
		let keyCode = this.x.keyCode;
		let ctrlCode = this.x.ctrlCode;
		let metaKey = this.x.metaKey;
		let shiftKey = this.x.shiftKey;

        if ($.inArray(keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (keyCode == 65 && (ctrlKey === true || metaKey === true)) ||
            (keyCode == 67 && (ctrlKey === true || metaKey === true)) ||
            (keyCode == 88 && (ctrlKey === true || metaKey === true)) ||
            (keyCode >= 35 && keyCode <= 39)) {
        return;
        }

        if ((shiftKey || (keyCode < 48 || keyCode > 57)) && (keyCode < 96 || keyCode > 105)) {
            this.x.preventDefault();
        }
    }	

};