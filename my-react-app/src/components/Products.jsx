import styled from 'styled-components'
import React from 'react'
import Product from "./Product";





const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({list}) => {
  return (
    <Container>
      {list.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;