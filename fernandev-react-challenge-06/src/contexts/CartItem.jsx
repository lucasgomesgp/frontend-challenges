import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";

export const CartItemContext = createContext({
  items: [],
  total: 0,
  discount: 0,
  discountCoupon: "",
  setItems: (items) => {},
  setTotal: (total) => {},
  setDiscount: (discount) => {},
  setDiscountCoupon: (discountCoupon) => {},
});

export function CartItemProvider(props) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountCoupon, setDiscountCoupon] = useState("");

  useEffect(() => {
    const value = items?.map((item) => item.price * item.quantity);
    if (value.length >= 1) {
      const totalValue = value?.reduce(
        (accumulator, item) => accumulator + item
      );
      const discountValue = totalValue * (10 / 100);
      setDiscount(discountValue);
      const totalOperation = discountCoupon
        ? Math.floor(totalValue - discountValue)
        : totalValue;
      setTotal(totalOperation);
    } else {
      setTotal(0);
    }
  }, [items]);
  return (
    <CartItemContext.Provider
      value={{
        items,
        setItems,
        total,
        discount,
        setDiscount,
        setTotal,
        discountCoupon,
        setDiscountCoupon,
      }}
    >
      {props.children}
    </CartItemContext.Provider>
  );
}
