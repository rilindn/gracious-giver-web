import Header from '../Header/Header'
import Footer from '../footer/Footer'
import React from "react";
import Chair from '../../images/chair.jpg'
const FormPage = () => {
    return (
       /* <div class="container p-4 my-4 border">
          <div class="row">
           <div class="col-sm-6 ">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem magnam sequi repellat enim fugiat temporibus. Sint non totam facere aperiam labore. Quod nisi incidunt quis impedit, mollitia rem sapiente consequatur.</p>
              </div>
           <div class="col-sm-6 ">
             <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt odio hic quas impedit iusto omnis rerum fugiat fuga dignissimos quos, veniam animi totam deleniti? Voluptates debitis beatae ea eius ab!</p>
             </div>


             <section class="mb-5">*/

             <div class="">
                 <Header></Header>
             <div className="col-12" >
             <div class="container p-3 my-3 border" id="prdetail">
              
               <div class="row">
                 <div class="col-md-6 mb-4 mb-md-0" >
             
                   <div id="mdb-lightbox-ui"></div>
             
                   <div class="mdb-lightbox">
             
                     <div class="row product-gallery mx-1">
             
                       <div class="col-12 mb-0">
                         <figure id="figure01" class="view overlay rounded z-depth-1 main-img">
                         <img src={Chair} class="img-fluid z-depth-1" ></img>
                         
                         </figure>
                         <figure  id="figure01" class="view overlay rounded z-depth-1"   >
                         
                         </figure>
                         <figure id="figure01" class="view overlay rounded z-depth-1" >
                        
                         </figure>
                         <figure  id="figure01" class="view overlay rounded z-depth-1" >
                         
                         </figure>
                       </div>
                       <div class="col-12" >
                         <div class="row " >
                           <div class="col-3" >
                             <div class="view overlay rounded z-depth-1 gallery-item" >
                             <img src={Chair} class="img-fluid z-depth-1" ></img>
                             </div>
                           </div>
                           <div class="col-3" >
                             <div class="view overlay rounded z-depth-1 gallery-item">
                             <img src={Chair} class="img-fluid z-depth-1" ></img>
                             </div>
                           </div>
                           <div class="col-3">
                             <div class="view overlay rounded z-depth-1 gallery-item">
                             <img src={Chair} class="img-fluid z-depth-1" ></img>
                               <div class="mask rgba-white-slight"></div>
                             </div>
                           </div>
                           <div class="col-3">
                             <div class="view overlay rounded z-depth-1 gallery-item">
                               
                               <div class="mask rgba-white-slight"></div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
             
                   </div>
             
                 </div>
                 <div id="prDetail" class="col-md-6 prDetail">
             
                   <h5>Chair</h5>
                   <p class="mb-2 text-muted text-uppercase small">second hand</p>
                   
                   <p><span class="mr-1"><strong>value </strong> indefinite</span></p>
                   <p class="pt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sint quos at ut. Debitis voluptas, a temporibus labore nulla, enim unde et autem nam, numquam molestiae ab natus architecto minima! Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, sapiente illo. Sit
                     error voluptas repellat rerum quidem, soluta enim perferendis voluptates laboriosam. Distinctio,
                     officia quis dolore quos sapiente tempore alias.</p>
                   <div class="table-responsive">
                     <table class="table table-sm table-borderless mb-0">
                       <tbody>
                         <tr>
                           <th class="pl-0 w-25" scope="row"><strong>Category</strong></th>
                           <td>Household furniture</td>
                         </tr>
                         <tr>
                           <th class="pl-0 w-25" scope="row"><strong>Color</strong></th>
                           <td>Gray</td>
                         </tr>
                         <tr>
                           <th class="pl-0 w-25" scope="row"><strong>Delivery</strong></th>
                           <td>Kosovo, Europe</td>
                         </tr>
                       </tbody>
                     </table>
                   </div>
                   
                           
                   
                   
                   <button type="button" class="btn btn-primary btn-md mr-1 mb-2">Request </button>
                 </div>
               
               </div>
               
             </div>
             
            
             </div>
             <Footer></Footer>
             </div>

      )
   };
export default FormPage;