import styles from './Header.module.css';
function Header({ onClickOpen, items }) {
    return (
        <header>
            <div className={styles.headerLeft}>
                <img width={40} height={40} src="/img/Logo.png" alt="" />
                <div>
                    <h3>React Sneakers</h3>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className={styles.headerRight}>
                <li onClick={onClickOpen}>
                    <img width={18} height={18} src="/img/Cart.svg" alt="" />
                    <span style={{ textTransform: 'none' }}>{items.map((item , i) => item.price).reduce((a, b) => a + b, 0)} руб.</span>
                </li>
                <li>
                    <img width={18} height={18} src="/img/User.svg" alt="" />
                </li>
            </ul>
        </header>
    );
}

export default Header;
