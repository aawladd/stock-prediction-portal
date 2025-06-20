import {useContext} from 'react'
import Button from './Button'
import Header from './Header'
import Footer from './Footer'
import {useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Main = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <>
      <div className='container'>
        <div className='p-5 text-center bg-light-dark rounded'>
          <h1 className='text-light'>Stock Precition Portal</h1>
          <p className='text-light lead'> This stock prediciton application utilizes machine learning techniques, specially employing Keras and LSTM model, integrated with the Django framework. It forecasts future strock prices by analysizng 100-day and 200-day moving averages, essentail indicators widely used by stock analysst to inform trading and investment decisions</p>
          
          {isLoggedIn? (
            <Button text='Explore Now' class='btn-outline-warning' url='/dashboard'/>
            ) : (
              <Button text='Explore Now' class='btn-outline-warning' url='/login'/>
            )}
          
        </div>
      </div>
    </>
  )
}

export default Main