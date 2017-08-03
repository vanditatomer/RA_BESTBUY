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

						//ADD TO CART - WORDS
						var buttonAdd = document.createElement('p');
						buttonForCart.appendChild(buttonAdd);
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
	}

	_createClass(_class, [{
		key: "addToCart",
		value: function addToCart() {

			var cart = {
				price: 0,
				quantity: 0,
				cartTotal: 0
			};

			var item = sessionStorage.getItem(this.sku);
			var cartProduct = null;

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

			console.log("sku: " + this.sku + ", price: " + cartProduct.price + ", quantity: " + cartProduct.quantity + ", total: " + cartProduct.cartTotal);
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
