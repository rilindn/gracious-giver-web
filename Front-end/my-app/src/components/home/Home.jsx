/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Form, Spinner, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Footer } from '../footer/Footer'
import Header from '../Header/Header'
import Product from './Product'
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import Request from './Request'
import { useMemo } from 'react'
import { Search } from './../dashboard/DataTable/Search'
import { Button } from 'react-bootstrap'

const Home = ({ loggedInUser }) => {
  const [products, setProducts] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [showProducts, setShowProducts] = useState(true)
  const [showRequests, setShowRequests] = useState(false)
  const [searchP, setSearchP] = useState('')
  const [searchC, setSearchC] = useState('')
  const [searchCity, setSearchCity] = useState('')
  const [searchState, setSearchState] = useState('')
  const [categories, setCategories] = useState([])
  const [cities, setCities] = useState([])
  const [states, setStates] = useState([])

  useEffect(() => {
    getproducts()
    getRequests()
    getCategories()
    getCities()
    getStates()
  }, [])

  const getproducts = async () => {
    try {
      await axios.get(`http://localhost:5000/api/product`).then((res) => {
        console.log(res.data)
        setProducts(res.data)
      })
      setLoading(true)
    } catch (e) {
      console.log(e)
    }
  }
  const getCategories = async () => {
    try {
      await axios
        .get('http://localhost:5000/api/productcategory')
        .then((res) => {
          setCategories(res.data)
        })
    } catch (e) {
      console.log(e)
    }
  }
  const getRequests = async () => {
    try {
      await axios.get(`http://localhost:5000/api/request`).then((res) => {
        console.log('reqqust')
        console.log(res.data)
        setRequests(res.data)
      })
      setLoading(true)
    } catch (e) {
      console.log(e)
    }
  }

  const getCities = async () => {
    try {
      await axios.get(`http://localhost:5000/api/city`).then((res) => {
        console.log(res.data)
        setCities(res.data)
      })
    } catch (e) {
      console.log(e)
    }
  }
  const getStates = async () => {
    try {
      await axios.get(`http://localhost:5000/api/shteti`).then((res) => {
        console.log(res.data)
        setStates(res.data)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const productsData = useMemo(() => {
    let computedProducts = products

    if (searchC || searchP || searchState || searchCity) {
      computedProducts = computedProducts.filter(
        (product) =>
          product.ProductName.toLowerCase().includes(searchP.toLowerCase()) &&
          product.ProductCategory.toLowerCase().includes(searchC.toLowerCase()) &&
          product.State.toLowerCase().includes(searchState.toLowerCase()) &&
          product.City.toLowerCase().includes(searchCity.toLowerCase()),
      )
    }
    return computedProducts
  }, [products, searchP, searchC, searchState, searchCity])

  const requestsData = useMemo(() => {
    let computedRequests = requests

    if (searchC || searchP || searchState || searchCity) {
      computedRequests = computedRequests.filter(
        (request) =>
          request.RequestName.toLowerCase().includes(searchP.toLowerCase()) &&
          request.RequestCategory.toLowerCase().includes(searchC.toLowerCase()) &&
          request.State.toLowerCase().includes(searchState.toLowerCase()) &&
          request.City.toLowerCase().includes(searchCity.toLowerCase()),
      )
    }
    return computedRequests
  }, [requests, searchP, searchC, searchState, searchCity])

  return (
    <div>
      <Header loggedInUser={loggedInUser} search={true} />
      <Sidebar loggedInUser={loggedInUser} />
      <Switch>
        <Route path="" />
        <Route path="" />
        <Route path="" />
        <Route path="" />
      </Switch>
      <div className="search-form-wrapper">
        <h1>
          What <b>FREE</b> stuff are you looking for?
        </h1>
        <Form
          className="d-flex"
          onSubmit={(e) => {
            e.preventDefault()
            setSearchP(e.target.ProductName.value)
            setSearchC(e.target.ProductCategory.value)
            setSearchState(e.target.State.value)
            setSearchCity(e.target.City.value)
            console.log(productsData)
          }}
        >
          <Form.Control
            name="ProductCategory"
            className="search-form-input"
            as="select"
            custom
          >
            <option value="">All Categories</option>
            {categories.map((categorie) => (
              <option value={categorie.ProductCategoryName}>
                {categorie.ProductCategoryName}
              </option>
            ))}
          </Form.Control>
          <Form.Control
            className="search-form-input"
            name="ProductName"
            placeholder="Keyword"
          ></Form.Control>

          <Form.Control
            name="State"
            className="search-form-input"
            as="select"
            custom
          >
            <option value="">State</option>
            {states.map((state) => (
              <option value={state.Emri}>{state.Emri}</option>
            ))}
          </Form.Control>
          <Form.Control
            name="City"
            className="search-form-input"
            as="select"
            custom
          >
            <option value="">City</option>
            {cities.map((city) => (
              <option value={city.CityName}>{city.CityName}</option>
            ))}
          </Form.Control>
          <Button className="search-form-input" type="submit">
            Search
          </Button>
        </Form>
      </div>
      <div className="pt-5">
        <h5 style={{ fontFamily: 'Lato, Helvetica, Arial, sans-serif' }}>
          Give away or find FREE second hand stuff
        </h5>
        <ToggleButtonGroup
          type="checkbox"
          defaultValue={[1, 3]}
          className="mb-3"
        >
          <ToggleButton
            onClick={() => {
              setShowProducts(true)
              setShowRequests(true)
            }}
            className="border-right m-1"
            style={{ width: '140px' }}
            value={1}
          >
            All
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              setShowProducts(true)
            }}
            className="m-1"
            style={{ width: '140px' }}
            value={2}
          >
            Free
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              setShowProducts(false)
            }}
            className="border-right m-1"
            style={{ width: '140px' }}
            value={3}
          >
            Needed
          </ToggleButton>
        </ToggleButtonGroup>

        <div className="productsALL" style={{ minHeight: '40vh' }}>
          <div className="rowProd">
            {loading ? (
              showProducts ? (
                productsData.map((product) => (
                  <Product
                    key={product.ProductId}
                    product={product}
                    loggedInUser={loggedInUser}
                  />
                ))
              ) : (
                requestsData.map((request) => (
                  <Request
                    key={request.RequestId}
                    request={request}
                    loggedInUser={loggedInUser}
                  />
                ))
              )
            ) : (
              <Spinner animation="border" className="m-5" />
            )}
          </div>
        </div>
        {/* <div className="d-flex justify-content-center">
                <Pagination
                total={products.length}
                />
            </div> */}
      </div>
      <Footer />
    </div>
  )
}

export default Home
