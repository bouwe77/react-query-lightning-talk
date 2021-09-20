function Products() {
    const { products, isLoading, error } = useProducts()
  
    return (
      <>
        <h1>Products</h1>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Modal>
            Our apologies, an error has occurred and we are looking into this...
          </Modal>
        ) : (
          products.map((product) => (
            <div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          ))
        )}
      </>
    )
}

  