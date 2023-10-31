import React from "react";
import { useContext } from "react";
import { CartItemContext } from "./contexts/CartItem";

const TableRow = ({ id, img, name, category, price, quantity }) => {
  const { items, setItems } = useContext(CartItemContext);

  function handleChangeQuantity(operation) {
    const newData = items.map((item) => {
      if (item.id === id) {
        const quantitySelected =
          operation === "plus" ? (item.quantity += 1) : (item.quantity -= 1);
        const itemCart = quantitySelected === 0 ? {} : { ...item, quantity: quantitySelected };
        return itemCart;
      }
      return { ...item };
    });
    const filterQuantity = newData.filter((item) => item.quantity >= 1);
    setItems(filterQuantity);
  }
  function handleRemoveItem() {
    const newData = items?.filter((item) => item.id !== id);
    setItems(newData);
  }

  return (
    <tr>
      <td>
        <div className="product">
          <img
            src={img}
            alt={name}
            style={{ width: "100px", height: "100px" }}
          />
          <div className="info">
            <div className="name">{name}</div>
            <div className="category">{category}</div>
          </div>
        </div>
      </td>
      <td>R$ {price}</td>
      <td>
        <div className="qty">
          <button
            onClick={() => {
              handleChangeQuantity("minus");
            }}
          >
            <i className="bx bx-minus"></i>
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => {
              handleChangeQuantity("plus");
            }}
          >
            <i className="bx bx-plus"></i>
          </button>
        </div>
      </td>
      <td>R$ {price * quantity}</td>
      <td>
        <button className="remove" onClick={handleRemoveItem}>
          <i className="bx bx-x"></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
