/*
? DESAFIO - Shopping Cart:

Você deve desenvolver um carrinho de compras funcional.
Funcionalidades que esperamos que você desenvolva:

todo - inserção de novos produtos no carrinho
todo - remoção de produtos já inseridos
todo - alteração de quantidade de cada item 
todo - cálculo do preço total dos itens inseridos

todo - FUNCIONALIDADE EXTRA: aplicação de cupom de desconto
*/
import "./styles.scss";

import PageHeader from "./layout/PageHeader";
import PageTitle from "./layout/PageTitle";
import Summary from "./Summary";
import TableRow from "./TableRow";
import { useContext } from "react";
import { CartItemContext } from "./contexts/CartItem";
import { Modal } from "./components/Modal";
import { useState } from "react";

function App() {
  const { items, setItems } = useContext(CartItemContext);
  const [statusModal, setStatusModal] = useState(false);

  async function handleAddToCart() {
    try {
      const productId = Math.ceil(Math.random() * 20);
      const data = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/${productId}`
      );
      const dataJson = await data.json();

      setItems((prev) => {
        let newArray = [];
        const itemHasAdded = items.filter(
          (current) => current.id === dataJson.id
        );
        const item = {
          id: dataJson.id,
          img: dataJson.thumbnail,
          name: dataJson.name || "Produto",
          category: dataJson.category,
          price: dataJson.price,
          quantity: itemHasAdded.length >= 1 ? itemHasAdded[0].quantity + 1 : 1,
        };
        if (itemHasAdded.length >= 1) {
          newArray = items.map((current) => {
            if (current.id === dataJson.id) {
              return { ...item };
            }
          });
        } else {
          newArray = [...prev, item];
        }
        return newArray;
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Modal statusModal={statusModal} handleChangeModal={setStatusModal} />
      <PageHeader />
      <main>
        <PageTitle data={"Seu carrinho"} />
        <button onClick={handleAddToCart} className="add-cart">
          Add to cart
          <i className="bx bx-cart-add bx-sm"></i>
        </button>
        <div className="content">
          <section>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {items?.map(({ id, img, name, category, price, quantity }) => (
                  <TableRow
                    key={id}
                    id={id}
                    img={img}
                    name={name}
                    category={category}
                    price={price}
                    quantity={quantity}
                  />
                ))}
              </tbody>
            </table>
          </section>
          <aside>
            <Summary
              statusModal={statusModal}
              changeModalStatus={setStatusModal}
            />
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
