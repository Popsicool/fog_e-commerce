import React, {useContext, useState} from 'react'
import { ItemContext } from '../App'

export const EditCrop = () => {
  const allCrop = useContext(ItemContext).crop
    const [crop, setCrop] = useState(allCrop[0])
    const [showCrop, setShow] = useState(false)
    const [name, setName] = useState(crop.name)
    const [type, setType] = useState(crop.type)
    const [quantity, setQuantity] = useState(crop.quantity)
    const [price, setPrice] = useState(crop.price)
    const [info, setInfo] = useState(crop.info)
    const [image, setImage] = useState(null)

    const changeCrop = (crop) => {
            const selected = allCrop.filter(b => {
            return b.id === crop
        })
        setCrop(selected[0])
        setName(selected[0].name); setType(selected[0].type); setQuantity(selected[0].quantity)
        setPrice(selected[0].price); setInfo(selected[0].info)
        setShow(true)
    }
    const submitForm = (e) => {
        console.log(image)
    }
  return (
    <div className='container'>
        {!showCrop ?
        <div className='row'>
            {allCrop.map(crop => (
                <button
                onClick={() => changeCrop(crop.id)}
                className='col-md-3 bg-warning m-2' key={crop.id}>
                    <h3 className='text-dark'>{crop.name}</h3>
                    <p>Edit</p>
                </button>
            ))}
        </div> :
        <div>
            <div className='text-right'>
                <button type='button' onClick={() => setShow(false)} className="btn-close text-danger text-right bg-danger"></button>
            </div>
            <h3 className='text-dark'>Edit</h3>
            <form onSubmit={submitForm} >
                <div className="row mb-4">
                    <div className="col">
                    <div className="form-outline">
                        <label className="form-label">Name</label>
                        <input
                            className="form-control"
                            type="text"
                            required
                            value={name}
                            onChange = {(e) => {
                                setName(e.target.value)
                            }}
                            ></input>
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-outline">
                        <label className="form-label">Type</label>
                        <select
                            className="form-control"
                            value={type}
                            required
                            onChange = {(e) => setType(e.target.value)}
                            >
                                <option  value="maize">Maize</option>
                                <option selected value="cassava">Cassava</option>
                                <option value="yam">Yam</option>
                                <option value="rice">Rice</option>
                                <option value="Others">Others</option>
                            </select>
                    </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                    <div className="form-outline">
                        <label className="form-label" >Quantity</label>
                        <input
                            className="form-control"
                            type="number"
                            required
                            value={quantity}
                            onChange = {(e) => {
                                setQuantity(e.target.value)
                            }}
                            ></input>
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-outline">
                        <label className="form-label">Price</label>
                        <input
                            className="form-control"
                            type="number"
                            required
                            value={price}
                            onChange = {(e) => {
                                setPrice(e.target.value)
                            }}
                            ></input>
                    </div>
                    </div>
                </div>

            <div className="form-outline mb-4">
                <label className="form-label">Information</label>
                <textarea className="form-control" id="form6Example7" rows="4"
                        required
                        value={info}
                        onChange = {(e) => {
                            setInfo(e.target.value)
                        }}
                        ></textarea>
            </div>
            <div className="form-outline mb-4">
                <label className="form-label">Image</label>
                <input
                className="form-control"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                >
                </input>

            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">Edit Item</button>
            <button type="button" className="btn btn-danger btn-block mb-4 ml-4">Delete Item</button>
                    </form>
        </div>}
    </div>
  )
}