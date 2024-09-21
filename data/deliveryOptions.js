export const deliveryOptions = [
  { id: "1", name: "Standard Delivery", priceCents: 0, deliveryDays: 7 },
  { id: "2", name: "Express Delivery", priceCents: 499, deliveryDays: 3 },
  { id: "3", name: "Next Day Delivery", priceCents: 999, deliveryDays: 1 },
];
export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}
