import styles from './CartDrawer.module.css';

function CartDrawer({ onCloseCart, items = [], onRemove, opened }) {
    const itemsPrice = items.map((item, i) => item.price).reduce((a, b) => a + b, 0);
    const priceTaxFifth = itemsPrice * 0.05;
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
                            <button className="greenButton">
                                Оформить заказ
                                <img src="img/Arrow.svg" alt="" />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.drawerEmpty}>
                            <img width={200} src="img/drawer.png" alt="" />
                            <h1 style={{ marginTop: 30 }} className="items">
                                Корзина пустая
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
