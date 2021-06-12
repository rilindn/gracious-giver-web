import React from 'react';
import Header from './../Header/Header';
import Sidebar from './../Sidebar/Sidebar';
import { Footer } from './../footer/Footer';
import PostProdForm from './PostProdForm'
import { Switch, Route } from "react-router-dom";


export const PostProduct = ({loggedInUser}) => {
    return (
     <div>
        <Header/>
        <Sidebar />
        <Switch>
          <Route path=""  />
          <Route path="" />
          <Route path="" />
        </Switch>
        <div className="pt-3 prod-form-wrapper mx-auto">
            <h2  style ={{fontFamily:'Hanalei Fill'}} className="new-post-t">New Post</h2>    
            <div className ="txt-post-product mx-auto ">
            <h4 style ={{fontFamily:'Hanalei Fill'}} className="new-post-p">Posting Guideliness</h4>
            <h6 className="new-post-j">Just remember that every item posted should be free, legal and family-friendly.</h6>
                <h6 className="new-post-n">No services, promotions or advertising.</h6>
                </div> 
        <PostProdForm loggedInUser={loggedInUser}/>
    </div>
    <Footer/>
    </div>
  )
}

export default PostProduct