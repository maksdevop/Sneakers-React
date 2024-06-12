import { useContext, useState } from 'react';
import styles from './CartDrawer.module.css';
import AppContext from '../../context';
import axios from 'axios';

function CartDrawer({ onCloseCart, items = [], onRemove, opened }) {
    const itemsPrice = items.map((item, i) => item.price).reduce((a, b) => a + b, 0);
    const priceTaxFifth = itemsPrice * 0.05;
    const { cartItems, setCartItems } = useContext(AppContext);
    const [isComplete, setIsComplete] = useState(false);

    const onClickSendOrder = () => {
        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            axios.delete('https://662a6a1d67df268010a3d536.mockapi.io/cart/' + item.id);
        }

        setIsComplete(true);
        setCartItems([]);
    };
    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2>
                    Корзина <img onClick={onCloseCart} className="removeBtn" src="img/Close.svg" alt="" />
                </h2>

                {items.length > 0 ? (
                    <>
                        <div className="items">
                            {items.map((item) => {
                                console.log(item);
                                return (
                                    <div key={item.id} className="cartItem">
                                        <img width={70} height={70} src={item.imageUrl} alt="" />
                                        <div>
                                            <p>{item.title}</p>
                                            <b>{item.price} руб.</b>
                                        </div>
                                        <img onClick={() => onRemove(item.id)} className="removeBtn" src="img/Close.svg" alt="" />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li className="cartTop">
                                    <span>Итого:</span>
                                    <div></div>
                                    <b> {itemsPrice} руб.</b>
                                </li>
                                <li className="cartBottom">
                                    <span>Налог 5%: </span>
                                    <div></div>
                                    <b>{priceTaxFifth} руб.</b>
                                </li>
                            </ul>
                            <button onClick={onClickSendOrder} className="greenButton">
                                Оформить заказ
                                <img src="img/Arrow.svg" alt="" />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.drawerEmpty}>
                            <img width={200} src={isComplete ? 'img/order.jpg' : 'img/drawer.png'} alt="" />
                            <h1 style={{ marginTop: 30 }} className="items">
                                {isComplete ? 'Ваш заказ оформлен :)' : 'Корзина пустая'}
                            </h1>

                            <button onClick={onCloseCart} className="greenButton">
                                Вернуться назад
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CartDrawer;
