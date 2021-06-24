import React, { useEffect, useState } from 'react'
import { Pagination, Spinner, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Footer } from '../footer/Footer';
import Header from '../Header/Header';
import Bookmark from './Bookmark';
import axios from 'axios';
import {Switch, Route } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import { NotificationManager } from 'react-notifications'

const BookmarkPage = () => {

    const [bookmarks, setBookmarks] = useState([]);
    const [loading,setLoading] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState([])

    useEffect(() => {
      ;(async () => {
        await axios
          .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
          .then((res) => {
            setLoggedInUser(res.data)
            axios.get(`http://localhost:5000/api/Bookmark/id/`+res.data.UserId)
            .then(resu=>{
            console.log(resu.data)
            setBookmarks(resu.data)
        })
        setLoading(true);
          })
      })()
    }, [])

    const getBookmarks = async () =>{
        await axios.get(`http://localhost:5000/api/Bookmark/id/`+loggedInUser.UserId)
        .then(resu=>{
            console.log(resu.data)
            setBookmarks(resu.data)
        })
        .then(()=>{
            NotificationManager.error(
                'Error while bookmarking the product!',
                '',
                1000,
                )
        })
  }


    return (
        <div>
            <Header loggedInUser={loggedInUser} />
        <Sidebar />
            <div className="pt-5">
            <h3>Bookmarked Products</h3>
            <div className="productsALL">
                <div className="rowProd" >
                    {loading ? 
                    bookmarks.map(bookmark=>(
                           <Bookmark
                            key={bookmark.BookmarkId}
                            bookmark={bookmark}
                            loggedInUser={loggedInUser}
                            updated={() => getBookmarks()}
                            />
                    )) :  <Spinner animation="border" className="m-5"/>
                       }    
                </div>
            </div>
            </div>
        <Footer/>
        </div>
    )
}

export default BookmarkPage
