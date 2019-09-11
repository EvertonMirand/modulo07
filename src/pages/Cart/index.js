import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';

import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

import {
  updateAmountRequest,
  removeFromCart,
} from '../../store/modules/cart/actions';

// import { Container } from './styles';

export default function Cart() {
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce(
        (totalSum, product) => totalSum + product.price * product.amount,
        0
      )
    )
  );

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );
  const dispatch = useDispatch();
  function increment(product) {
    dispatch(updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <button type="button" onClick={() => decrement(product)}>
                  <MdRemoveCircleOutline size={20} color="#7159c1" />
                </button>
              </td>
              <input type="number" readOnly value={product.amount} />
              <td>
                <button type="button" onClick={() => increment(product)}>
                  <MdAddCircleOutline size={20} color="#7159c1" />
                </button>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(product.id))}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar pedido</button>
        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
