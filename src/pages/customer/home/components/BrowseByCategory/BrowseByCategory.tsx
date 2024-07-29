import React from 'react';
import './BrowseByCategory.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';


const BrowseByCategory: React.FC = () => {
  const categoryStore = useSelector((state: RootState) => state.category);
  //lọc ra category nào có status = true
  const categories = categoryStore.data?.filter((category) => category.status === true);
  return (
    <>
    <div className="browse-by-category">
      <div className="header">
        <div className="header-up">
          <div className="header-up-box"></div>
          <div className="badge">This Month</div>
        </div>
        <div className="header-down">
          <h2>Category</h2>
          <div className="navigation">
          <button className="nav-button">←</button>
          <button className="nav-button">→</button>
        </div>
        </div>
      </div>
      <div className="category-grid">
        {categories?.map((category) => (
          <div key={category.id} className="category-item">
              <img src={category.image} alt={category.name} className="category-icon" 
              style={{width: '50px', height: '50px',}}/> 
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>

    </>
    
  );
};

export default BrowseByCategory;