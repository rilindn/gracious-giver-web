import axios from "axios";
import React from "react"
import { NotificationManager } from 'react-notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

const Request = ({request,loggedInUser}) => {


    const handleBookmark = async () =>{
        try{
        await axios.get('http://localhost:5000/api/bookmark/bookmarked/'+loggedInUser.UserId+"/"+request.RequestId)
        .then((res)=>{
          if(res.data===false){
            axios.post(`http://localhost:5000/api/Bookmark/`,{
                ProductId:request.RequestId,
                UserId:loggedInUser.UserId,
            })
            NotificationManager.success(
              'Product has been bookmarked succefsully!',
              "",
              2000
            )
        }
        else{
          NotificationManager.error(
          'Product already bookmarked!',
          "",
          2000
        )
          }
        })
      }catch(e){
        console.log(e)
        NotificationManager.error(
          'Problems while bookmarking the product!',
          "",
          1000
        )
      }
  }
    return (
        <div className="request">
            <a href={`/reqDetails/${request.RequesttId}`} >
              <div className="home-prodd">
              <FontAwesomeIcon class="bo-prod" onClick={handleBookmark} icon={faBookmark}/>
              <div className="reques">
                  <h1 >{request.RequestDescription}</h1>
                  </div>
                    <div className="itemText">
                
                      <h5 className="prodTitle" style={{color:"black"}}>
                       <span className="requestFree">NEEDED
                         </span> 
                              {request.RequestName}
                          </h5>
                          <p className="prodLocation"
                          style={{color:"black"}}>{request.State}, {request.City}</p> 
                       </div>
                    </div>
                  </a>
        </div>
    )
}

export default Request
