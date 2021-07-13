import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'
import faPhotoUpload from '../../../images/photoUpload.png'
import { NotificationManager } from 'react-notifications'

const EditProduct = ({show,onHide,product,onUpdate}) => {

    
    const [productPhotos,setProductPhotos] = useState([])
    const [selectedFiles,setSelectedFiles] = useState([]);
    const [selectedFilesName,setSelectedFilesName] = useState([]);
    const [updateFormPhotos,setUpdateFormPhotos] = useState(false);
    const fileInput = useRef(null);

    const handleFileInputClick = event => {
      fileInput.current.click();
    };

    useEffect(()=>{
        
        axios.get("http://localhost:5000/api/productphotos/"+product.ProductId)
        .then(res=>{
            setProductPhotos(res.data)
        }
    )},[product.ProductId,updateFormPhotos])

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.put('http://localhost:5000/api/product/'+ product.ProductId, {
            ProductId: product.ProductId,
            ProductName: event.target.ProductName.value,
            ProductCategory: event.target.ProductCategory.value,
            ProductState: event.target.ProductState.value,
            ProductPhoto: product.ProductPhoto,
            ProductDescription: event.target.ProductDescription.value,
            ProductLocation: event.target.ProductLocation.value,
            ProductComment: event.target.ProductComment.value,
            DonatorId:product.DonatorId
          })
          .then(()=>{
            for (let index = 0; index < selectedFilesName.length; index++) {
              axios.post('http://localhost:5000/api/ProductPhotos',{
                Product: product.ProductId,
                ProductPhotoPath: selectedFilesName[index].name
              }
        )}})
          .then(()=> {
              onUpdate();
          })
          .then((res) => {
            NotificationManager.success(
            'Product edited succesfully!',
            '',
            2000,
            )
        },
          (error) => {
              NotificationManager.error(
              'Error while editing the product!',
              '',
              1000,
              )
          },
        )
        
    }
    
      const handlePhotoSubmit = (e) => {
        e.preventDefault()
        if(e.target.files){
          const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
          setSelectedFiles((prevImages)=>prevImages.concat(fileArray));
          var fileArrayN = Array.from(e.target.files)
          setSelectedFilesName((prevImages)=>prevImages.concat(fileArrayN))
          for (let index = 0; index < e.target.files.length; index++) {
              const formdata = new FormData();
              formdata.append('image',e.target.files[index], e.target.files[index].name)
              try{
                axios.post('http://localhost:5000/api/product/SaveFile/Product', formdata)
              }catch(e){
                console.log(e)
              }
            }
          }
        }

    const handleDeleteImage = (photoId) =>{
        axios.delete('http://localhost:5000/api/productPhotos/'+photoId)
        .then(()=>{
            setUpdateFormPhotos(!updateFormPhotos);
        })
        .then((res) => {
            NotificationManager.success(
            'Product Photo deleted succesfully!',
            '',
            1000,
            )
        },
        (error) => {
            NotificationManager.error(
            'Error while deleting the product photo!',
            '',
            1000,
            )
        },
        )
    }


    const handleDeleteSelectedImage = (selectedImage) =>{
        var index = selectedFiles.indexOf(selectedImage)
        delete selectedFiles[index]
    }

    
    return (
        <div>
            <Modal 
            show={show} 
            className="modal fade ">
            <div className="modal-dialog">
                <div className="modal-content ">
                    <Form 
                    onSubmit={handleSubmit}
                    >
                        <div className="modal-header">						
                            <h3 className="modal-title">Edit Product</h3>
                    </div>
                        <div className="modal-body" style={{width:"390px"}}>					
                            <FormGroup className="form-group">
                                <label>Product Name</label>
                                <input 
                                defaultValue={product.ProductName}
                                name="ProductName"
                                type="text" 
                                className="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Product Category</label>
                                <input 
                                defaultValue={product.ProductCategory}
                                name="ProductCategory"
                                type="text" 
                                className="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Product State</label>
                                <input 
                                defaultValue={product.ProductState}
                                name="ProductState"
                                type="text" 
                                className="form-control" 
                                required/>
                            </FormGroup>
                            <Form.Group className="form-group">
                            <div className="img-prod-label" >
                            <Form.Label >Product Images</Form.Label></div>
                            <div className="d-flex flex-wrap">
                                <button
                                type="button"
                                onClick={handleFileInputClick}
                                className="imgUploadBtn imgUploadBtn-dash-edit"
                                >
                                <img src={faPhotoUpload} alt="" className="add-photo-icon add-photo-icon-dash" />
                                </button>
                                {productPhotos.map(productPhoto=>(
                                    <div className="position-relative">
                                        <img src={`http://localhost:5000/photos/ProductPhotos/${productPhoto.ProductPhotoPath}`} 
                                        alt="" 
                                        className="editProd-img-preview" 
                                        />
                                        <span 
                                        className="delProduct-photo"
                                        onClick={() => handleDeleteImage(productPhoto.PhotoId)}
                                        >
                                            <i className="fas fa-times delPhoto-icon-dash"></i>
                                        </span>
                                    </div>
                                ))}
                                {selectedFiles.map(selectedFile=>(
                                    <div className="position-relative">
                                    <img src={selectedFile} 
                                    alt="" 
                                    className="editProd-img-preview" 
                                    />
                                    <span 
                                    className="delProduct-photo"
                                    onClick={() => handleDeleteSelectedImage(selectedFile)}
                                    >
                                        <i className="fas fa-times delPhoto-icon-dash"></i>
                                    </span>
                                    </div>
                                ))}
                                <Form.File
                                name="ProductPhoto" 
                                multiple
                                style={{display:"none"}}  
                                hidden
                                className ="d-flex"
                                id="exampleFormControlFile1"
                                onChange={handlePhotoSubmit}
                                ref={fileInput}
                                />
                                </div>
                            </Form.Group >
                           
                            <FormGroup className="form-group">
                                <label>Product Description</label>
                                <input 
                                defaultValue={product.ProductDescription}
                                name="ProductDescription"
                                type="text" 
                                className="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Location</label>
                                <input
                                defaultValue={product.ProductLocation}
                                name="ProductLocation" 
                                className="form-control" 
                                required
                                ></input>
                            </FormGroup>					
                            <FormGroup className="form-group">
                                <label>Product Comment</label>
                                <input
                                defaultValue={product.ProductComment}
                                name="ProductComment" 
                                className="form-control" 
                                required
                                ></input>
                            </FormGroup>					
                        </div>
                        <Modal.Footer className="modal-footer">
                            <Button 
                            onClick={onHide}
                            variant="light"
                            >
                            Cancel
                            </Button>
                            <Button 
                            variant="info"
                            type="submit"
                            >
                            Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default EditProduct
