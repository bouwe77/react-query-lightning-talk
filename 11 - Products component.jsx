function Products() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    async function fetchProducts() {
      try {
        setStatus('loading')
        const response = await fetch('http://example.com/products')
        setProducts(response.json())
        setStatus('success')
      } catch {
        setStatus('error')
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <h1>Products</h1>
      {status === 'loading' ? (
        <Spinner />
      ) : status === 'error' ? (
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
