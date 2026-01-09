import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChaiCard } from './components/ChaiCard'
import { Counter } from './components/Counter'

import type { Chai } from './types'
import ChaiList from './components/ChaiList'
import OrderForm from './components/OrderForm'
import Card from './components/Card'

const menu: Chai[] = [
  { id: 1, name: "masala", price: 30 },
  { id: 2, name: "Ginger ⭐", price: 50 },
  { id: 3, name: "Lemon ⭐", price: 60 },
]
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <ChaiCard
        name="Headphones"
        price={5000}
      />
      <ChaiCard
        name="Iphone"
        price={50000}
      />

      <div>
        <Counter />
      </div>

      <div>
        <ChaiList
          items={menu}
        />
      </div>
      <div>
        <OrderForm
          onSubmit={(order) => {
            console.log("Placed ", order.name, order.cups);

          }}
        />
      </div>


      <div>
        <Card
          title='Chai aur TS'
          footer={<button>Order now</button>}
        />
      </div>
    </>
  )
}

export default App
