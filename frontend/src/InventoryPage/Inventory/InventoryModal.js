import React, { useEffect, useRef, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InventoryModal({item, closeModal, openModal}) {
    const [startDate, setStartDate] = useState(new Date());
    const handleDateChange = (date) => {
        setStartDate(date)
        // Update date to the database
    }
    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: openModal ? 'block' : 'none',
        zIndex: 999,
    };
    const modalRef = useRef()
    useEffect(()=>{
        let handler = e => {
            if (!modalRef.current.contains(e.target)) {
                closeModal()
            }
        }

        document.addEventListener("mousedown", handler)
    })
  return (
        <div style={modalStyle} ref={modalRef}>
                    {openModal && (
                        <div>
                            <div>Calories: {item.nutrition.nutrients[0].amount} {item.nutrition.nutrients[0].unit}</div>
                            <div>
                                Add expiry date: <DatePicker selected={startDate} onChange={handleDateChange} />
                            </div>
                        </div>
                    )}
        </div>
  )
}

export default InventoryModal