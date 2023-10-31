import { useContext } from "react";
import { CartItemContext } from "../contexts/CartItem";

export function Modal({ statusModal, handleChangeModal }) {
  const { total, setTotal, discountCoupon, setDiscountCoupon } =
    useContext(CartItemContext);
  const discount = total * (10 / 100);

  function handleApplyDiscount() {
    setTotal(total - discount);
    handleChangeModal(!statusModal);
    alert("Cupom aplicado com sucesso!");
  }
  function handleChangeCoupon(event) {
    setDiscountCoupon(event.target.value);
  }
  function handleCloseModal() {
    handleChangeModal(!statusModal);
  }
  return (
    <div
      className="modal"
      style={statusModal ? { display: "flex" } : { display: "none" }}
      onKeyUpCapture={(event) => {
        if (event.key === "Escape") {
          handleChangeModal(!statusModal);
        }
      }}
    >
      <div className="modal-card">
        <p className="title">Cupom de desconto</p>
        <button className="close-icon" onClick={handleCloseModal}>
          <i className="bx bx-x bx-md" style={{color:"red"}}></i>
        </button>
        <input
          type="text"
          name="cupom"
          value={discountCoupon}
          onChange={handleChangeCoupon}
          autoComplete="off"
        />
        <button onClick={handleApplyDiscount}>Aplicar desconto</button>
      </div>
    </div>
  );
}
