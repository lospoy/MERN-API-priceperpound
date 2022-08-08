import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPrice } from '../features/prices/priceSlice'

function PriceForm() {
    const [ state, setState ] = useState({
      priceAmount: '',
      priceCurrency: '',
      quantityAmount: '',
      quantityUnit: '',
      tags: ''
    })

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createPrice({ 
          itemPrice: {
            priceAmount: state.priceAmount,
            priceCurrency: state.priceCurrency,
          },
          itemQuantity: {
            quantityAmount: state.quantityAmount,
            quantityUnit: state.quantityUnit
          },
          tags: state.tags,
        }))
    }

    const handleChange = (e) => { 
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    }

    return (
        <section className='form'>
            <form onSubmit={ onSubmit }>
                <div className='form-group'>
                    <label htmlFor='priceAmount'>Price</label>
                    <input
                        type='number'
                        name='priceAmount'
                        id='priceAmount'
                        value={ state.priceAmount }
                        onChange={ handleChange }
                    />
                    <label htmlFor='priceCurrency'>Currency</label>
                    <input
                        type='text'
                        name='priceCurrency'
                        id='priceCurrency'
                        value={ state.priceCurrency}
                        onChange={ handleChange }
                    />
                    <label htmlFor='priceCurrency'>Quantity</label>
                    <input
                        type='number'
                        name='quantityAmount'
                        id='quantityAmount'
                        value={ state.quantityAmount}
                        onChange={ handleChange }
                    />
                    <label htmlFor='quantityUnit'>Unit</label>
                    <input
                        type='text'
                        name='quantityUnit'
                        id='quantityUnit'
                        value={ state.quantityUnit}
                        onChange={ handleChange }
                    />
                    <label htmlFor='tags'>Tags</label>
                    <input
                        type='text'
                        name='tags'
                        id='tags'
                        value={ state.tags}
                        onChange={ handleChange }
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-block' type='submit'>
                        Add Price
                    </button>
                </div>
            </form>
        </section>
    )
}

export default PriceForm