import React, { useState } from 'react'
import { Products } from '../components/Products'
import { useContext } from 'react'
import { CartContext, ItemContext } from '../App'
import { ToastContainer, toast } from 'react-toastify';

export const Shop = () => {

    const inform = () => toast.success("Item added to cart", {
    position:"top-right"
  })
    const [showModal, setModalShow] = useState(false)
    const [name, setName]= useState("")
    const [price, setPrice]= useState("")
    const [amount, setAmount] = useState("")
    const [quantity, setQuantity] = useState("")
    const [info, setInfo] = useState("")
    const [item, setItem] = useState(null)

    const updateModel = (props) => {
        setModalShow(true)
        setName(props.name)
        setPrice(props.price)
        setAmount(props.amount)
        setItem(props)
        setInfo(props.info)
    }
    const hideModel = () => {
        setQuantity("")
        setModalShow(false)
    }
    const cart = useContext(CartContext)
    const bird = useContext(ItemContext).bird
    const crop = useContext(ItemContext).crop
    const equip = useContext(ItemContext).equip
    const updateCart = (e) => {
        e.preventDefault()
        setModalShow(false)
        cart.updateCart(item)
        setName("")
        setPrice("")
        setAmount("")
        setQuantity("")
        setItem(null)
        inform()
    }
  return (
    <div className='container-fluid'>
        <ToastContainer/>
        {showModal && <>
      <div className='modal-container'>
        <div className='mud'>
            <button type='button' onClick={hideModel} className="btn-close text-danger text-right bg-danger bco"></button>
            <form onSubmit={updateCart}>

              <h5 className="modal-title">{name}</h5>
              <hr className="hr"></hr>
                {/* <p>{name}</p> */}

                <div className="modal-body">
                  <p>{info}</p>
                <hr className="hr"></hr>
                <div className='row'>
                  <p className='col-md-4'>Unit price :<p>N {price}</p></p>
                {quantity > 0 &&<><p className='col-md-4'>Quantity: <p>{quantity}</p></p> <p className='col-md-4'>Amount: <p>{amount}</p></p></>}

                </div>

                <input
                type="number"
                value = {quantity}
                onChange = {(e) => {
                    quantity < 0 ? setQuantity(0) : setQuantity(e.target.value)
                    setItem({...item, "quantity": parseInt(e.target.value)})
                    setAmount(price * e.target.value)
                }}
                >
                </input>
                <hr className="hr"></hr>
                <div className="justify-content-center mt-5 align-item-center d-flex gap-1">
                        <button type="button" className="btn btn-secondary"  onClick={hideModel}>Close</button>
                        {quantity > 0 && <button type="submit" className="btn btn-primary">Add to cart</button>
                }
                </div>

                </div>
            </form>

        </div>
      </div>
      </>}
      <p>Your sure plug for all agricultural services</p>
      <div>
        <div className='row'>
          <div className="p-5 text-center bg-warning">
            <h4 className="mb-1">Animal Section</h4></div>
          <div className="p-4">
              <Products prod={bird} updateModel ={updateModel}/>
          </div>
        </div>
        <div className='row'>
          <div className="p-5 text-center bg-warning">
            <h4 className="mb-1">Crops</h4>
          </div>
          <div className='p-4'>
            <Products prod={crop} updateModel ={updateModel}/>
          </div>
        </div>
        <div className='row'>
          <div className="p-5 text-center bg-warning">
            <h4 className="mb-1">Inputs</h4>
          </div>
          <div className='p-4'>
            <Products prod={equip} updateModel ={updateModel}/>
          </div>
        </div>
      </div>
    </div>

  )
}
