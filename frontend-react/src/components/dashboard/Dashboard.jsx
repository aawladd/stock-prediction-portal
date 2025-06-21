import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner } from '@fortawesome/free-solid-svg-icons'

import { use, useEffect, useState } from 'react'
import axiosInstance from '../../axiosinstance'

const Dashboard = () => {
    const [ticker, setTicker] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [plot, setPlot] = useState()
    const [ma100, setMA100] = useState()
    const [ma200, setMA200] = useState()
    const [prediction, setPrediciton] = useState()
    const [mse, setMSE] = useState()
    const [rmse, setRMSE] = useState()
    const [r2, setR2] = useState()

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('/protected-view/')
                
            }catch(error) {
                console.error('Error fetching data:', error);   
            }
        }
        fetchProtectedData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const respone = await axiosInstance.post('/predict/', {
                ticker: ticker
                
            });
            console.log(respone.data)

            const backendRoot = import.meta.env.VITE_BACKEND_ROOT 
            const plotUrl = `${backendRoot}${respone.data.plot_img}`
            const ma100Url = `${backendRoot}${respone.data.plot_100_dma}`
            const ma200Url = `${backendRoot}${respone.data.plot_200_dma}`
            const predictionUrl = `${backendRoot}${respone.data.plot_prediction}`
    
            setPlot(plotUrl)
            setMA100(ma100Url)
            setMA200(ma200Url)
            setPrediciton(predictionUrl)

            setMSE(respone.data.mse)
            setRMSE(respone.data.rmse)
            setR2(respone.data.r2)
            
            if (respone.data.error){
                setError(respone.data.error)
            }
            else{
                setError()
            }
        }catch(error){
            console.error('There was and error making the API request', error)
        }
        finally{
            setLoading(false)
        }
    }
  return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 mx-auto'>
                    <form onSubmit={handleSubmit}>
                        <input type="text" className='form-control' placeholder='Enter Stock Ticker'
                        onChange={(e) => setTicker(e.target.value)} required />
                        <small>{error && <div className='text-danger'>{error}</div>}</small>
                        <button type='subimt' className='btn btn-outline-warning mt-3'>{loading? <span><FontAwesomeIcon icon={faSpinner} spin/>Please wait...</span>: 'See Prediction'}</button>
                     </form>
                </div>

                {/* Print Prediciotn plots */}
                {prediction && (
                <div className='prediction mt-5'>
                    <div className='p-3'>
                        {plot && (
                            <img src={plot} style={{maxWidth:'100%'}} />
                        )}
                    </div>

                    <div  className='p-3'>
                        {ma100 && (
                            <img src={ma100} style={{maxWidth:'100%'}} />
                        )}
                    </div>

                    <div  className='p-3'>
                        {ma200 && (
                            <img src={ma200} style={{maxWidth:'100%'}} />
                        )}
                    </div>

                    <div  className='p-3'>
                        {prediction && (
                            <img src={prediction} style={{maxWidth:'100%'}} />
                        )}
                    </div>
                    <div className="text-light p-3">
                        <h4>Model Evaluation</h4>
                        <p>Mean Squared Error (MSE): {mse}</p>
                        <p>Root Mean Squared Error R(MSE): {rmse}</p>
                        <p>R Squared Error (R2): {r2}</p>
                    </div>
                </div>
                )}

            </div>
        </div>
  )
}

export default Dashboard