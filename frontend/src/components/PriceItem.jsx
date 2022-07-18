import { useDispatch } from 'react-redux'
import { deletePrice } from '../features/prices/priceSlice'

function PriceItem({price}) {
    const dispatch = useDispatch()

    return (
        <div className='price'>
            <div>
                {new Date(price.createdAt).toLocaleString('en-US')}
            </div>
            <h2>{price.text}</h2>
            <button onClick={() => dispatch(deletePrice(price._id))} className="close">X</button>
        </div>
    )
}

export default PriceItem