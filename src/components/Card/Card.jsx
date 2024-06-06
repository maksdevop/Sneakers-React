import { useContext } from 'react';
import styles from './Card.module.css';
import AppContext from '../../context';
function Card({ id, title, price, imageUrl, onClickPlus }) {
    const handleChangePlus = () => {
        onClickPlus({ id, title, price, imageUrl, parentId: id });
    };
    const { isItemAdded } = useContext(AppContext);

    return (
        <div className={styles.card}>
            <img width={133} height={112} src={imageUrl} alt="123" />
            <h5>{title}</h5>
            <div className={styles.cardBottom}>
                <div className={styles.cardBottomInfo}>
                    <span>Цена : </span>
                    <b>{price} руб.</b>
                </div>

                <img onClick={handleChangePlus} width={30} height={30} src={isItemAdded(id) ? '/img/Plus-green.svg' : '/img/Plus.svg'} alt="" />
            </div>
        </div>
    );
}

export default Card;
