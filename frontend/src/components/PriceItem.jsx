import { useDispatch } from 'react-redux'
import { deletePrice } from '../features/prices/priceSlice'

function PriceItem({price}) {
    const dispatch = useDispatch()

    return (
        <div className='price'>
            <div>
              <span>Price: {price.itemPrice.priceAmount} </span>
              <span>{price.itemPrice.priceCurrency}</span>
            </div>
            <div>
              <span>Quantity: {price.itemQuantity.quantityAmount} </span>
              <span>{price.itemQuantity.quantityUnit}</span>
            </div>
            <div>
              <span>Tags: {price.tags} </span>
            </div>
            <br></br>
            <div>
                {new Date(price.createdAt).toLocaleString('en-US')}
            </div>
            <button onClick={() => dispatch(deletePrice(price._id))} className="close">X</button>
        </div>
    )
}

export default PriceItem