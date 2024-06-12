import { useEffect, useState } from 'react';
import './App.css';
import CartDrawer from './components/Drawer/CartDrawer';
import Header from './components/Header/Header';
import axios from 'axios';
import { Suspense, lazy } from 'react';
import Loading from './components/Loading';
import AppContext from './context';
function App() {
    const Card = lazy(() => import('./components/Card/Card'));
    const [items, setItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const onAddToCart = async (obj) => {
        const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
        if (findItem) {
            setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
            await axios.delete(`https://662a6a1d67df268010a3d536.mockapi.io/cart/${findItem.id}`);
        } else {
            const { data } = await axios.post('https://662a6a1d67df268010a3d536.mockapi.io/cart', obj);
            setCartItems((prev) => [...prev, data]);
        }
    };
    const onChangeSearchInput = (e) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            const itemsResponse = await axios.get('https://662a6a1d67df268010a3d536.mockapi.io/Item');

            const cartResponse = await axios.get('https://662a6a1d67df268010a3d536.mockapi.io/cart');

            setItems(itemsResponse.data);
            setCartItems(cartResponse.data);
        }
        fetchData();
    }, []);

    const onRemoveItem = (id) => {
        axios.delete(`https://662a6a1d67df268010a3d536.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id));
    };

    return (
        <AppContext.Provider value={{ items, cartItems, isItemAdded, setCartItems }}>
            <div className="wrapper">
                <CartDrawer onRemove={onRemoveItem} opened={cartOpen} items={cartItems} onCloseCart={() => setCartOpen(false)} />
                <Header onClickOpen={() => setCartOpen(true)} items={cartItems} />
                <div className="content">
                    <div className="contentWrap">
                        <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : `Все кроссовки`}</h1>
                        <div className="searchImg">
                            <img src="img/Search.svg" alt="" />
                            <p>
                                <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Поиск..." />
                                {searchValue && <img onClick={() => setSearchValue('')} className="removeInputBtn" src="img/Close.svg" alt="clear" />}
                            </p>
                        </div>
                    </div>
                    <div className="sneakers">
                        {items
                            .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((item, i) => {
                                return (
                                    <Suspense key={i} fallback={<Loading />}>
                                        <Card key={i} {...item} onClickPlus={(obj) => onAddToCart(obj)} added={isItemAdded(item && item.id)} />
                                    </Suspense>
                                );
                            })}
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    );
}

export default App;
