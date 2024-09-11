import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../fetcher';
import styled from 'styled-components';
const ProductDetail = () => {
    const [product, setProduct] = useState({errorMessage: '', data: {}});
    const {productId} = useParams();

   React.useEffect(() => {
    const fetchData = async () => {
        const responseObject = await getProductById(productId);
        setProduct(responseObject);
    }
    fetchData();
   },[productId]);

   const createMarkUp = () =>{
    return {__html:product.data?.description}
   }

  return (
    <div>
      <article>
        <ProductTitle className='category-product-title'>
            {product.data.title}
        </ProductTitle>
        <figure>
            <ProductImageContainer className='category-product-image-container'>
                <ProductImageContainerImage src={`/assets/${product.data.image}`} alt={product.data.title} />
            </ProductImageContainer>
        </figure>
        <aside>
          <div className='category-product-info-dimensions'>
            <h3>Dimensions</h3>
            <label>{product.data.specs?.dimensions}</label>
          </div>
          { product.data.specs?.capacity &&
          <div className='category-product-info-capacity'>
            <h3>capacity</h3>
            <label>{product.data.specs?.capacity}</label>
          </div>
          }
          <div className='category-product-info-features'>
            <h3>Features</h3>
            <ul>
              {product.data.features?.map((f, i) => {
                return <li key={`Features${i}`}>{f}</li>
              })}
            </ul>
          </div>
        </aside>
        
        <aside className='category-product-finance'>
          <div className='category-product-finance-price'>
            &pound; {product.data.price}
          </div>
          <div className='category-product-info-stock'>
            <label>Stock level: {product.data.stock}</label>
            <br/>
            <label>Free Delievery!!</label>
          </div>
          <div className='category-product-action'>
            <button>Add to Basket</button>
          </div>
            <ProductDescription dangerouslySetInnerHTML={createMarkUp()}></ProductDescription>
        </aside>
    </article>
    </div>
  )
}

export default ProductDetail;



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
const ProductDescription = styled.div`
grid-column: 1 / span 3; 
`;