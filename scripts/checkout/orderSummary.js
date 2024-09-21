import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    console.log(deliveryDate);
    let matchingProduct;
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
    cartSummaryHTML += `
          <div class="cart-item-container js-cart-item-container-${
            matchingProduct.id
          }">
                  <div class="delivery-date">
                  Delivery date:    ${dateString}
                  </div>
  
                  <div class="cart-item-details-grid">
                  <img class="product-image"
                      src="${matchingProduct.image}">
  
                  <div class="cart-item-details">
                      <div class="product-name">
                          ${matchingProduct.name}
                      </div>
                      <div class="product-price">
                      $${(matchingProduct.priceCents / 100).toFixed(2)}
                      </div>
  
  
                      <div class="product-quantity">
                                  <span>
                                  Quantity: 
                                  <span class="quantity-label js-quantity-label-${
                                    matchingProduct.id
                                  }">
                                  ${cartItem.quantity}
                                  </span>
  
  
                      <span class="update-quantity-link link-primary js-update-link" data-product-id=${
                        matchingProduct.id
                      }>
                          Update
                      </span>
                      <input class="quantity-input js-quantity-input-${
                        matchingProduct.id
                      }">
                      <span class="save-quantity-link link-primary js-save-link" data-product-id=${
                        matchingProduct.id
                      }>
                          Save
                      <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${
                        matchingProduct.id
                      }>
                          Delete
                      </span>
                      </div>
                  </div>
  
                  <div class="delivery-options js.delivery-options">
                      <div class="delivery-options-title">
                      Choose a delivery option:
                      </div>
                      ${deliveryOptionsHTML(matchingProduct, cartItem)}
                      </div>
                  </div>
                  </div>
              </div>
          `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let deliveryOptionsHTML = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      let dateString = today
        .add(deliveryOption.deliveryDays, "days")
        .format("dddd, MMMM D");

      let priceString =
        deliveryOption.priceCents === 0
          ? "FREE Shipping"
          : `$${(deliveryOption.priceCents / 100).toFixed(2)} - Shipping`;
      const isChecked =
        deliveryOption.id === cartItem.deliveryOptionId ? "checked" : "";

      deliveryOptionsHTML += `
          <div class="delivery-option js-delivery-option"
              data-product-id="${matchingProduct.id}"
              data-delivery-option-id="${deliveryOption.id}">
              <input type="radio"
              ${isChecked}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
              <div>
              <div class="delivery-option-date">
                  ${dateString} 
              </div>
              <div class="delivery-option-price">
                  ${priceString}  
              </div>
              </div>
          </div>
          `;
    });
    return deliveryOptionsHTML;
  }
  //console.log(cartSummaryHTML2);
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      console.log(productId);
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      updateCartQuantity();
    });
  });
  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${cartQuantity} items`;
  }

  updateCartQuantity();

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      console.log(Number(quantityInput.value));
      const newQuantity = Number(quantityInput.value);

      updateQuantity(productId, newQuantity);
      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();
    });
  });
  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      const productId = option.dataset.productId;

      const deliveryOptionId = option.dataset.deliveryOptionId;

      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}
