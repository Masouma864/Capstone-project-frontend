/* eslint-disable */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReservation } from '../../redux/apiCalls'
import { useNavigate } from 'react-router-dom'
import './styles/addreservation.css'

const AddReservation = () => {
    const [city, setCity] = useState('')
    // const [, setCity] = useState('')
    const [endDate, setEnddate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [motorcycles, setMotorcycle] = useState('')
    const [dateErr, setDateErr] = useState(null)
    const [cityErr, setCityErr] = useState(null)
    const [motorErr, setMotorErr] = useState(null)
    const vehicle = useSelector((state) => state.vehicles)
    const { currentUser } = useSelector((state) => state.user)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const date = Date.now()
    const newDate = new Date(date)
    const day = newDate.getDate()
    const month = newDate.getMonth() + 1
    let newMonth;
    if (month < 10) {
        newMonth = `0${month}`
    }
    const year = newDate.getFullYear()
    const formatDate = `${year}-${newMonth}-${day}`

    const addReserv = (e) => {
        e.preventDefault()
        if (city === '') {
            setCityErr('City should be set')
            return false
        }
        else {
            setCityErr(null)
        }
        if (startDate != formatDate) {
            // console.log(true)
            setDateErr('Start date cannot be in the past')
            return false
        }
        else {
            setDateErr(null)
        }
        if (startDate >= endDate) {
            setDateErr('End date should be after than start date')
            return false
        }
        else {
            setDateErr(null)
        }
        if (motorcycles === '') {
            setMotorErr('Select a motorcycle that you wish to reserve')
            return false
        }
        else {
            setMotorErr(null)
        }
        addReservation(dispatch, currentUser.data.id, { city, users_id: currentUser.data.id, motorcycles_id: motorcycles, start_date: startDate, end_date: endDate })
        navigate('/reservations')
    }

    return (
        <div className="LoginDiv">
            <form className='LoginForm'>
                <select onChange={(e) => setMotorcycle(e.target.value)} name="" id="">
                    {vehicle.vehicles.map((vehicle) => {
                        console.log(motorcycles)
                        return (
                            <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
                        )
                    })}
                </select>
                <input type="text" placeholder='Enter city' onChange={(e) => setCity(e.target.value)} />
                <input type="date" placeholder='Enter city' onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" placeholder='Enter city' onChange={(e) => setEnddate(e.target.value)} />
                <button type="submit" onClick={addReserv}>button</button>
                {
                    <span>
                        {dateErr && <span>{dateErr}</span>}
                        {cityErr && <span>{cityErr}</span>}
                        {motorErr && <span>{motorErr}</span>}
                    </span>
                }
            </form>
        </div>
    )
}

export default AddReservation