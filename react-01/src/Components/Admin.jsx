import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const Admin = (props) => {
 let navigate=useNavigate();
  let [products, setProducts] = useState([])
  

  useEffect(() => {
    Axios.get("http://127.0.0.1:5000/api/products").then((res) => {
      setProducts(res.data)
    }).catch(() => { })
  }, [])

  let deleteProduct = (id) => {
    Axios.delete(`http://127.0.0.1:5000/api/products/${id}`)
      .then((resp) => {
        navigate(0)
      }).catch(() => { })
  };
  return (
    <>
      <div className="container mt-5">
        <pre>{JSON.stringify(products)}</pre>
        <div className="row">
          <div className="col-8">
            <table className='table table-dark mt-5'>
              <thead >
                <tr>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Product Qty</th>
                  <th>Total Qty</th>
                  <th>Image</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.length > 0 ? <>
                    {
                      products.map((product) => {
                        return <tr key={product._id}>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.qty}</td>
                          <td>{(product.qty) * (product.price)}</td>
                          <td>{product.image}</td>
                          <td><Link to="/CreateProduct" /* onDoubleClick={props.method.bind(this,product._id)} */ className='btn btn-success'>Edit</Link ><Link  className='btn btn-danger' onClick={deleteProduct.bind(this, product._id)}>Delete</Link ></td>
                        </tr>
                      })
                    }
                  </> : <><h1>No Products are created</h1></>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin