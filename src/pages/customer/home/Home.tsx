import Carosel from './components/carosel/Carosel'
import Product from './components/product/Product'
import SellingProduct from './components/bessSellProduct'
import './Home.scss'

const Home = () => {
  return (
    <div className="home">
      <Carosel />
      <div className='product'>
        <div className="product-content">
          <Product />
        </div>
        <SellingProduct />
      </div>
    </div>
  )
}

export default Home
