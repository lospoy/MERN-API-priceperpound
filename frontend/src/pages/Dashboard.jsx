import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PriceForm from '../components/PriceForm'
import PriceItem from '../components/PriceItem'
import Spinner from '../components/Spinner'
import { getPrices, reset } from '../features/prices/priceSlice'

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { prices, isLoading, isError, message } = useSelector(
        (state) => state.prices
    )

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/login')
        }

        dispatch(getPrices())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>Welcome {user && user.name}</h1>
                <p>Prices Dashboard</p>
            </section>

            <PriceForm />

            <section className="content">
                {prices.length > 0 ? (
                    <div className="prices">
                        {prices.map((price) => (
                            <PriceItem key={price._id} price={price} />
                        ))}
                    </div>
                ) : (
                    <h3>You have not set any prices</h3>
                )}
            </section>
        </>
    )
}

export default Dashboard