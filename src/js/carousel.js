//import Flickity from 'flickity';

export const carousel = (result) => {

	 	for (let i = 0; i < result.products.length; i++) 

	 	{
	 		let productImg = result.products[i].largeImage;
		 	let productBrand = result.products[i].manufacturer;
		 	let productDescription = result.products[i].includedItemList[0].includedItem;
			let productPrice = result.products[i].regularPrice;
			let productSku = result.products[i].sku;
			let popupContentHeading = "Your Cart";

			// carouselLi IS CONTAINED INSIDE OF THE carouselList
			let carouselLi = document.createElement('li');
			document.getElementById('productList').appendChild(carouselLi);
			carouselLi.className += 'carouselLi';
			// PRODUCT IMAGE AS A BACKGROUND IMAGE
			carouselLi.style.backgroundImage = "url('" + productImg + "')";
			carouselLi.style.backgroundRepeat = "no-repeat";

			// BRAND NAME
			let manufacturer = document.createElement('h2');
			carouselLi.appendChild(manufacturer);
			manufacturer.innerHTML=""+productBrand+"";

			// PRODUCT INFO
			let name = document.createElement('h4');
			carouselLi.appendChild(name);
			name.innerHTML=""+productDescription+"";

			// PRODUCT PRICE
			let price = document.createElement('h3');
			carouselLi.appendChild(price);
			price.innerHTML="$"+productPrice+"";

			// ADD TO CART BUTTON
			let buttonForCart = document.createElement('button');
			carouselLi.appendChild(buttonForCart);
			buttonForCart.textContent = ("Add to cart");
			//buttonForCart.id = 'add-to-cart';
			buttonForCart.className += 'addButton';
			buttonForCart.setAttribute('data-sku', ''+productSku+'');
			buttonForCart.setAttribute('data-price', ''+productPrice+'');

		} //adding the div's end	

		//WORKING WITH FLICKITY
		// let elem = document.querySelector('.carousel');
		// let flkty = new Flickity(elem, {
		// 	cellAlign: 'left',
		// 	contain: true
		// });

}; //export end