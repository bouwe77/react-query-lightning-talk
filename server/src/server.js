import 'dotenv/config'
import { create } from 'temba'

const config = {
  //delay: 1200,
}
const server = create(config)

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Temba is running on port ${port}`)
})
