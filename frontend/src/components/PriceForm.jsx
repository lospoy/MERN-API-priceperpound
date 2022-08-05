import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPrice } from '../features/prices/priceSlice'

function PriceForm() {
    const [
      priceAmount, setPriceAmount,
      priceCurrency, setPriceCurrency,
      quantityAmount, setQuantityAmount,
      quantityUnit, setQuantityUnit,
      tags, setTags
    ] = useState('')
    // const [
    //   priceAmount, setPriceAmount,
    //   priceCurrency, setPriceCurrency,
    //   quantityAmount, setQuantityAmount,
    //   quantityUnit, setQuantityUnit,
    //   tags, setTags
    // ] = useState('')

    const dispatch = useDispatch()

    // this onsubmit used to be set as
    //   const onSubmit = (e) => {
    //     e.preventDefault()
    //     dispatch(createPrice({ text }))
    //     setText('') }

    // now it needs to create an object base on the price object schema
    // issue is that it needs to be 2x (number+string object) and a tag >>
    // JSON as follows

    // {
    //   "itemPrice": {
    //       "priceAmount": 50,
    //       "priceCurrency": "USD"
    //   },
    //   "itemQuantity": {
    //       "quantityAmount": 10,
    //       "quantityUnit": "lb"
    //   },
    //   "tags": "object"
    // }
    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createPrice({ 
          itemPrice: {
            priceAmount,
            priceCurrency,
          },
          itemQuantity: {
            quantityAmount,
            quantityUnit,
          },
          tags,
        }))
        setPriceAmount('')
        setPriceCurrency('')
        setQuantityAmount('')
        setQuantityUnit('')
        setTags('')
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="priceAmount">Price</label>
                    <input
                        type='number'
                        name='priceAmount'
                        id='priceAmount'
                        value={priceAmount}
                        onChange={(e) => setPriceAmount(e.target.value)}
                    />
                    <label htmlFor="priceCurrency">Currency</label>
                    <input
                        type='text'
                        name='priceCurrency'
                        id='priceCurrency'
                        value={priceCurrency}
                        onChange={(e) => setPriceCurrency(e.target.value)}
                    />
                    <label htmlFor="priceCurrency">Quantity</label>
                    <input
                        type='number'
                        name='quantityAmount'
                        id='quantityAmount'
                        value={quantityAmount}
                        onChange={(e) => setQuantityAmount(e.target.value)}
                    />
                    <label htmlFor="quantityUnit">Unit</label>
                    <input
                        type='text'
                        name='quantityUnit'
                        id='quantityUnit'
                        value={quantityUnit}
                        onChange={(e) => setQuantityUnit(e.target.value)}
                    />
                    <label htmlFor="tags">Tags</label>
                    <input
                        type='text'
                        name='tags'
                        id='tags'
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type='submit'>
                        Add Price
                    </button>
                </div>
            </form>
        </section>
    )
}

export default PriceForm