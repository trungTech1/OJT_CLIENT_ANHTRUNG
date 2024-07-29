import Carosel from './components/carosel/Carosel'
import Product from './components/product/Product'
import SellingProduct from './components/bessSellProduct'
import './Home.scss'
import BrowseByCategory from './components/BrowseByCategory/BrowseByCategory'

const Home = () => {
  return (
    <div className="home">
      <Carosel />
      <div className='product'>
        <div className="product-content">
          <Product />
        </div>
        <hr />
        <div className='browseByCategory'>
            <BrowseByCategory/>
            
        </div>
        <hr />
        <SellingProduct />
      </div>
    </div>
  )
}

export default Home
