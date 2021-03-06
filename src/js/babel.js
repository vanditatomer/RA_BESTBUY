(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url + '?apiKey=' + obj.api + '&format=json');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = function () {
            return reject(xhr.statusText);
        };
        xhr.send(obj.body);
    });
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
			value: true
});
//import Flickity from 'flickity';

var carousel = exports.carousel = function carousel(result) {

			for (var i = 0; i < result.products.length; i++) {
						var productImg = result.products[i].largeImage;
						var productBrand = result.products[i].manufacturer;
						var productDescription = result.products[i].includedItemList[0].includedItem;
						var productPrice = result.products[i].regularPrice;
						var productSku = result.products[i].sku;
						var popupContentHeading = "Your Cart";

						// carouselLi IS CONTAINED INSIDE OF THE carouselList
						var carouselLi = document.createElement('li');
						document.getElementById('productList').appendChild(carouselLi);
						carouselLi.className += 'carouselLi';
						// PRODUCT IMAGE AS A BACKGROUND IMAGE
						carouselLi.style.backgroundImage = "url('" + productImg + "')";
						carouselLi.style.backgroundRepeat = "no-repeat";

						// BRAND NAME
						var manufacturer = document.createElement('h2');
						carouselLi.appendChild(manufacturer);
						manufacturer.innerHTML = "" + productBrand + "";

						// PRODUCT INFO
						var name = document.createElement('h4');
						carouselLi.appendChild(name);
						name.innerHTML = "" + productDescription + "";

						// PRODUCT PRICE
						var price = document.createElement('h3');
						carouselLi.appendChild(price);
						price.innerHTML = "$" + productPrice + "";

						// ADD TO CART BUTTON
						var buttonForCart = document.createElement('button');
						carouselLi.appendChild(buttonForCart);
						buttonForCart.textContent = "Add to cart";
						//buttonForCart.id = 'add-to-cart';
						buttonForCart.className += 'addButton';
						buttonForCart.setAttribute('data-sku', '' + productSku + '');
						buttonForCart.setAttribute('data-price', '' + productPrice + '');
			} //adding the div's end	

			//WORKING WITH FLICKITY
			// let elem = document.querySelector('.carousel');
			// let flkty = new Flickity(elem, {
			// 	cellAlign: 'left',
			// 	contain: true
			// });
}; //export end

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var _class = function () {
	function _class() {
		_classCallCheck(this, _class);

		this.sku = "";
		this.price = "";
		this.cart = {
			price: 0,
			quantity: 0
		};
	}

	_createClass(_class, [{
		key: "addToCart",
		value: function addToCart() {

			var item = sessionStorage.getItem(this.sku);
			var cartProduct = null;

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
			console.log("sku: " + this.sku + ", price: " + cartProduct.price + ", quantity: " + cartProduct.quantity + " Total Items: " + this.getTotalCartItems() + " Total Price: " + this.getTotalCartPrice());

			var cartObj = null;
			var productLine = "";
			var lineDivide = "";
			var getTotalCartItems = 0;

			$('.modalItem').remove();

			getTotalCartItems = sessionStorage.length;

			if (getTotalCartItems > 0) {
				for (var i = 0; i < getTotalCartItems; i++) {
					this.sku = sessionStorage.key(i);

					item = sessionStorage.getItem(this.sku);
					cartObj = JSON.parse(item);

					productLine = 'line' + (i + 1).toString();
					lineDivide = productLine + '-hr';

					if (i > 0) {
						$('.modalBody').append('<hr id="' + lineDivide + '" class="modalItem">');
					}

					$('.modalBody').append('<div id="' + productLine + '" class="modalItem flex">' + '<div>SKU : ' + this.sku + '</div>' + '<div>QUANTITY : <input type="text" class="cartQuantity" maxlength="2" value="' + this.cart.quantity + '"></div>' + '<div>TOTAL : $<span>' + cartObj.total + '</span></div>' + '<div><button type="button" class="update-button" data-sku="' + this.sku + '">UPDATE</button>' + '<button type="button" class="remove-button" data-sku="' + this.sku + '">REMOVE</button></div>' + '</div>');
				}
			} else {
				this.setEmptyCart();
			}
		}
	}, {
		key: "updateItemAmount",
		value: function updateItemAmount() {
			var productLine = $(this.x.target).parent().parent().attr("id");
			var sku = $(this.x.target).data('sku');
			var quantity = $(this.x.target).parent().parent().find("input").val();

			if (quantity == 0) {
				this.removeCartItem();
				return;
			}

			var item = sessionStorage.getItem(sku);

			if (item != null) {
				var cartObj = JSON.parse(item);

				cartObj.quantity = quantity;
				cartObj.total = cartObj.price * quantity;

				$('#' + productLine).find("span").text(cartObj.total);

				item = JSON.stringify(cartObj);
				sessionStorage.setItem(sku, item);
			}

			this.setItemCount();
			this.setCartTotal();

			alert("Quantity updated");
		}
	}, {
		key: "removeCartItem",
		value: function removeCartItem() {
			var productLine = $(this.x.target).parent().parent().attr("id");
			var sku = $(this.x.target).data('sku');

			if (response != true) {
				return;
			}

			sessionStorage.removeItem(sku);

			var lineDivide = null;

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

			alert("Item removed from cart");
		}
	}, {
		key: "setItemCount",
		value: function setItemCount() {
			var x = document.getElementById("itemCount");
			var itemCount = sessionStorage.length;

			if (itemCount > 0) {
				if (x.style.display != "block") {
					x.style.display = "block";
				}

				x.textContent = itemCount.toString();
			} else {
				x.style.display = "none";
			}
		}
	}, {
		key: "getTotalCartItems",
		value: function getTotalCartItems() {
			return sessionStorage.length;
		}
	}, {
		key: "getTotalCartPrice",
		value: function getTotalCartPrice() {
			var totalQuantity = 0;
			var priceTotal = 0;
			for (var key in sessionStorage) {
				var x = JSON.parse(sessionStorage[key]);
				totalQuantity = totalQuantity + x.quantity;
				priceTotal += x.price * x.quantity;

				document.getElementById('itemCount').innerHTML = totalQuantity;
				document.getElementById('itemPrice').innerHTML = priceTotal;
			}
			return priceTotal;
		}
	}, {
		key: "buildCartHtml",
		value: function buildCartHtml() {
			var itemCount = document.getElementById("itemCount");
			if (itemCount.style.display != "block") {
				itemCount.style.display = "block";
			}
			itemCount.innerHTML = this.getTotalCartItems();

			//Get the modal
			var modal = document.getElementById('myModal');

			// Get the button that opens the modal
			var btn = document.getElementById("cart");

			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];

			// When the user clicks on the button, open the modal 
			btn.onclick = function () {
				modal.style.display = "block";
			};

			// When the user clicks on <span> (x), close the modal
			span.onclick = function () {
				modal.style.display = "none";
			};

			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function (event) {
				if (event.target == modal) {
					modal.style.display = "none";
				}
			};
		}
	}, {
		key: "setCartTotal",
		value: function setCartTotal() {
			var skuKey = "";
			var item = null;
			var cartObj = null;
			var totalItems = 0;
			var totalAmount = 0;

			$('#cart-total').remove();

			totalItems = sessionStorage.length;

			for (var i = 0; i < totalItems; i++) {
				skuKey = sessionStorage.key(i);

				item = sessionStorage.getItem(skuKey);
				cartObj = JSON.parse(item);

				totalAmount += cartObj.total;
			}

			$('.modalHeader').append('<div id="cart-total" class="modalItem">' + '<p>YOUR ITEMS : <span>' + totalItems + '</span> | ' + 'CART TOTAL : <span>$' + totalAmount.toFixed(2) + '</span></p>' + '</div>');
		}
	}, {
		key: "setEmptyCart",
		value: function setEmptyCart() {
			$('.modalBody').append('<p class="modalItem">YOUR CART IS EMPTY.</p>');
		}
	}, {
		key: "quantityValidation",
		value: function quantityValidation() {
			var keyCode = this.x.keyCode;
			var ctrlCode = this.x.ctrlCode;
			var metaKey = this.x.metaKey;
			var shiftKey = this.x.shiftKey;

			if ($.inArray(keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || keyCode == 65 && (ctrlKey === true || metaKey === true) || keyCode == 67 && (ctrlKey === true || metaKey === true) || keyCode == 88 && (ctrlKey === true || metaKey === true) || keyCode >= 35 && keyCode <= 39) {
				return;
			}

			if ((shiftKey || keyCode < 48 || keyCode > 57) && (keyCode < 96 || keyCode > 105)) {
				this.x.preventDefault();
			}
		}
	}]);

	return _class;
}();

exports.default = _class;
;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _bestbuy = require("./bestbuy");

var _bestbuy2 = _interopRequireDefault(_bestbuy);

var _cart = require("./cart");

var _cart2 = _interopRequireDefault(_cart);

var _carousel = require("./carousel");

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.initBBCall();
		this.buttonListen();
	}

	_createClass(App, [{
		key: "buttonListen",
		value: function buttonListen() {
			$("#productContainer").on("click", ".addButton", function (x) {
				var product = new _cart2.default();
				product.sku = $(x.target).data("sku");
				product.price = $(x.target).data("price");
				product.addToCart();
			});
		}
	}, {
		key: "initBBCall",
		value: function initBBCall() {
			(0, _bestbuy2.default)({ url: "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))", api: "8ccddf4rtjz5k5btqam84qak" }).then(function (result) {
				/* fill carosel with products */
				//console.log(result);
				(0, _carousel.carousel)(result);
			}).catch(function (error) {
				console.log(error);
			});
		}
	}]);

	return App;
}();

exports.default = App;

var x = new App();

},{"./bestbuy":1,"./carousel":2,"./cart":3}]},{},[4]);
