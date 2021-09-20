function useProducts() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('idle')
  const isLoading = status === 'loading'
  const error = status === 'error'

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

  return { products, status, isLoading, error }
}
