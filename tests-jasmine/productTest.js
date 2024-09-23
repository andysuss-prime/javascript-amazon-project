import { getProduct } from "../data/products.js";
import { loadFromStorage, } from "../data/cart.js";

describe("test suite: getProduct", () => {
    it("Correctly Looks up a Product", () => {
      spyOn(localStorage, "setItem");
  
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify([
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            deliveryOptionId: "1",
          },
        ]);
      });
      loadFromStorage();
  
      const x = getProduct("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
      console.log(x);
      expect(x.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
      expect(x.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");  
      

    });
    it("Returns the correct product name", () => {
        spyOn(localStorage, "setItem");
    
        spyOn(localStorage, "getItem").and.callFake(() => {
          return JSON.stringify([
            {
              productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              quantity: 1,
              deliveryOptionId: "1",
            },
          ]);
        });
        loadFromStorage();
    
        const x = getProduct("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        console.log(x);
        expect(x.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");  
        
  
      });
  
});



