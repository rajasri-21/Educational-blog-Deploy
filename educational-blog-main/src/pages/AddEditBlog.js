import React , { useEffect, useState } from 'react'
import {MDBValidation, MDBInput , MDBBtn} from "mdb-react-ui-kit";
import {useNavigate,useParams} from "react-router-dom"
import axios from "axios";
import {toast} from "react-toastify";


// c

const initialState = {
    title : "",
    description: "",
    category :"",
    imageUrl: "",
}
const options = ["Travel","Fashion","Fitness","Sports","Food","Tech"];

const AddEditBlog = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [categoryErrMsg, setCategoryErrMsg] = useState(null);
    const [editMode,setEditMode]=useState(false);
    const {title, description , category, imageUrl}= formValue;

    const navigate= useNavigate();
    const {id} = useParams();

    useEffect(() => {
      if(id) {
        setEditMode(true);
        getSingleBlog(id);
      } 
      else{
        setEditMode(false);
        setFormValue({...initialState});
      }
    },[id]);

    const getSingleBlog = async (id) => {
        const singleBlog = await axios.get(`http://localhost:3001/blogs/${id}`);
        if (singleBlog.status === 200) {
           setFormValue({...singleBlog.data});
        } else {
          toast.error("Something went wrong");
        }
        
    }

    const getDate =() =>{
        let today=new Date();
        let dd = String(today.getDate()).padStart(2,"0");
        let mm=String(today.getMonth()+1).padStart(2,"0");
        let yyyy= today.getFullYear();

        today=mm+"/"+dd+"/"+yyyy;
        return today;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!category){
            setCategoryErrMsg("Please select a category");
        }
        const imageVAlidation = !editMode ? imageUrl :true;
        if (title && description && imageUrl && category) {
            const currentDate = getDate();
            if (!editMode){
                const  updatedBlogData= {...formValue, date:currentDate};
                const response = await axios.post(
                   "http://localhost:3001/blogs",  // Use port 3001 if json-server is running on this port
                   updatedBlogData
            );
            if(response.status === 201) {
                toast.success("Blog Created Successfully")
            }else{
                toast.error("Something went wrong");
            }
        } else {
          const response = await axios.put(
            `http://localhost:3001/blogs/${id}`,  // Use port 3001 if json-server is running on this port
            formValue
          );
          if(response.status === 200) {
             toast.success("Blog Updated Successfully")
          } else{
              toast.error("Something went wrong");
          }
            
        }
        setFormValue({title:"", description: "", category:"", imageUrl:""})
        navigate("/");
        }
    };

    const onInputChange=(e) =>{
        let {name , value}= e.target;
        setFormValue({...formValue, [name]: value});
    };

    const onUploadImage=(file) => {
        console.log("file", file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset","s3cleehi")
        axios
          .post("http://api.cloudinary.com/v1_1/dlhxdqsgm/image/upload",formData)
          .then((resp) => {
             toast.info("Image Uploaded successfully");
             setFormValue({...formValue,imageUrl:resp.data.url});
        })
        .catch((err) =>{
            toast.error("Something went wrong");
        });

    };

    const onCategoryChange=(e) => {
        setCategoryErrMsg(null);
        setFormValue({...formValue, category: e.target.value});
    };
    return (
        <MDBValidation 
          className="row g-3" 
          style={{marginTop: "100px"}} 
          noValidate 
          onSubmit={handleSubmit}
        >
          <p className="fs-2 fw-bold"> {editMode ? "Update Blog" : "Add Blog"}</p>
          <div
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "400px",
              alignContent: "center",
            }}
          >
            <MDBInput
            value={title || ""}
            name="title"
            type="text"
            onChange={onInputChange}
            required
            label="Title"
            validation="Please provide a title"
            invalid
            />
            <br />
            <MDBInput
            value={description || ""}
            name="description"
            type="text"
            onChange={onInputChange}
            required
            label="Description"
            validation="Please provide a description"
            textarea
            rows={4}
            invalid
            />
            <br />
            {!editMode && (
                <>
                    <MDBInput
                      type="file"
                      onChange={(e) => onUploadImage(e.target.files[0])}
                      required
                      label="Title"
                      validation="Please provide a title"
                      invalid
                    />
                    <br />
                </>
            )}
            
            <select
             className="categoryDropdown"
             onChange={onCategoryChange} 
             value={category}
            >

              <option>Please select category</option>
              {options.map((option, index) => (
                <option value={option || ""} key={index}>
                      {option}
                      </option>
               ))}
            </select>
            {categoryErrMsg && (
                <div className="categoryErrorMsg">{categoryErrMsg}</div>
            )}
            <br />
            <br />
            
            <MDBBtn type="submit" style={{marginRight: "10px"}}>
              {editMode? "Update" : "Add"}
            </MDBBtn>
            <MDBBtn color="danger" style={{marginRight: "10px"}}
             onClick={() => navigate("/")}
            >
                Go Back
            </MDBBtn>
        </div>
    </MDBValidation>
  )
}

export default AddEditBlog;