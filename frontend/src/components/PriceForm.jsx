import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPrice } from '../features/prices/priceSlice'

function PriceForm() {
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        dispatch(createPrice({text}))
        setText('')
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Price</label>
                    <input type="text" name='text' id='text' value={text} onChange={(e) => setText(e.target.value)}/>
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