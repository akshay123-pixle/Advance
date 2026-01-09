import { useState } from "react"

export type orderProp = {
    name: string,
    cups: number
}
interface OrderFromProps {
    onSubmit(order: orderProp): void
}

function OrderForm({ onSubmit }: OrderFromProps) {
    const [name, setName] = useState<string>("Masala")
    const [cups, setCups] = useState<number>(1)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onSubmit({ name, cups })
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Chai Name</label>
            <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
            } />
            <label>Cups</label>
            <input value={cups} type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCups(Number(e.target.value) || 0)
            } />
            <button type="submit">Place Order</button>
        </form>
    )
}

export default OrderForm