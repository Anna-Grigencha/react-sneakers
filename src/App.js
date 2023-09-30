import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
//import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);//для хранения товаров в корзине
  const [favorites, setFavorites] = React.useState([]);//для хранения закладок
  const [searchValue, setSearchValue] = React.useState(''); // поиск
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://64ef46be219b3e2873c43e2f.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
    axios.get('https://64ef46be219b3e2873c43e2f.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    });
    axios.get('https://64f972144098a7f2fc14645e.mockapi.io/favorites').then((res) => {
      setFavorites(res.data);
    });

    //async function fetchData() {
    // const cartResponse = await axios.get('https://64ef46be219b3e2873c43e2f.mockapi.io/cart');
    //const favoritesResponse = await axios.get('https://64f972144098a7f2fc14645e.mockapi.io/favorites');
    //const itemsResponse = axios.get('https://64ef46be219b3e2873c43e2f.mockapi.io/items');

    //setCartItems(cartResponse.data);
    //setFavorites(favoritesResponse.data);
    //setItems(itemsResponse.data);
    //}
    //fetchData();

  }, []);  //ни за какими переменными следит не нужно, функция выполняется один раз, когда передаем пустой массив

  const onAddToCart = (obj) => {

    //if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
    //axios.delete(`https://64ef46be219b3e2873c43e2f.mockapi.io/cart/${obj.id}`);
    //setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    // }
    //else {
    axios.post('https://64ef46be219b3e2873c43e2f.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
    //}
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://64ef46be219b3e2873c43e2f.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
    // axios.post('https://64f972144098a7f2fc14645e.mockapi.io/favorites', obj);
    //setFavorites((prev) => [...prev, obj]);
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://64f972144098a7f2fc14645e.mockapi.io/favorites/${obj.id}`);
      }
      else {
        const { data } = await axios.post('https://64f972144098a7f2fc14645e.mockapi.io/favorites', obj);  //дождаться ответа бекэнда
        setFavorites((prev) => [...prev, data]);
      }
    }
    catch (error) {
      alert('Не удалось добавить в фавориты')
    }
  };

  const onChangeSearchInput = (event) => {
    //console.log(event.target.value);
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && (<Drawer items={cartItems} onClose={() => { setCartOpened(false) }} onRemove={onRemoveItem} />)}

      <Header onClickCart={() => { setCartOpened(true) }} />

      <Route path="/" exact>
        <Home items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        />
      </Route>

      <Route path="/favorites" exact>
        <Favorites
          items={favorites}
          onAddToFavorite={onAddToFavorite} />
      </Route>







    </div >
  );
}

export default App;
