import React, {useContext} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import { CartContext } from '../contexts/cartContext';

const ProductTitle = styled.div`
  grid-column: 1 / span 3; /* Span across all columns */
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const ProductImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProductImageContainerImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const CategoryProduct = ({id,title,image,specs,features,price,stock}) => {
  const Navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const {addProduct} = cartContext;
  return (
    <article>
        <ProductTitle >
            <Link to= {`/products/${id}`}>{title}</Link>
        </ProductTitle>
        <figure>
            <ProductImageContainer >
                <ProductImageContainerImage src={`/assets/${image}`} alt={title} />
            </ProductImageContainer>
        </figure>
        <aside>
          <div className='category-product-info-dimensions'>
            <h3>Dimensions</h3>
            <label>{specs.dimensions}</label>
          </div>
          { specs.capacity &&
          <div className='category-product-info-capacity'>
            <h3>capacity</h3>
            <label>{specs.capacity}</label>
          </div>
          }
          <div className='category-product-info-features'>
            <h3>Features</h3>
            <ul>
              {features?.map((f, i) => {
                return <li key={`Features${i}`}>{f}</li>
              })}
            </ul>
          </div>
        </aside>
        
        <aside className='category-product-finance'>
          <div className='category-product-finance-price'>
            &pound; {price}
          </div>
          <div className='category-product-info-stock'>
            <label>Stock level: {stock}</label>
            <br/>
            <label>Free Delievery!!</label>
          </div>
          <div className='category-product-action'>
            <button onClick={() => Navigate(`/products/${id}`) }>View Product</button>
            <br/>
            <button onClick={() => addProduct({id,title,price})}>Add to Basket</button>
          </div>

        </aside>
    </article>
  )
}

export default CategoryProduct;
