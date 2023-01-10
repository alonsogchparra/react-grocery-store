import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Cart } from './components/Cart';
import { Navbar } from './components/Navbar';
import { Products } from './components/Products';

function App() {
  return (
    <>
      <Router basename='/'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
