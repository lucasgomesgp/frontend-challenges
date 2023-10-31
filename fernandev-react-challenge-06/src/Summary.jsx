import React from "react";
import { useContext } from "react";
import { CartItemContext } from "./contexts/CartItem";
import {currencyFormatter} from "./utils/currency-formatter";

const Summary = ({ statusModal, changeModalStatus }) => {
  const { total, discountCoupon, discount, setDiscountCoupon, setTotal } =
    useContext(CartItemContext);

  
  function handleRemoveCoupon() {
    setDiscountCoupon("");
    setTotal(discount + total);
  }
  return (
    <>
      <div className="box">
        <header>Resumo da compra</header>
        <div className="info">
          <div>
            <span>Sub-total</span>
            <span>{currencyFormatter(total)}</span>
          </div>
          <div>
            <span>Frete</span>
            <span>Gratuito</span>
          </div>
          <div>
            {discountCoupon ? (
              <button onClick={handleRemoveCoupon} style={{ color: "red" }}>
                Remover cupom: {discountCoupon.toUpperCase()}
              </button>
            ) : (
              <button
                onClick={() => {
                  changeModalStatus(!statusModal);
                }}
              >
                Adicionar cupom de desconto
                <i className="bx bx-right-arrow-alt"></i>
              </button>
            )}
          </div>
        </div>
        <footer>
          <span>Total</span>
          <span>{currencyFormatter(total)}</span>
        </footer>
      </div>
      <button>Finalizar Compra</button>
    </>
  );
};

export default Summary;
