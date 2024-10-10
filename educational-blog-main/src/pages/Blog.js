// import React, { useState, useEffect } from 'react'
// import {
//     MDBIcon,
//     MDBContainer,
//     MDBRow,
//     MDBCol,
//     MDBCard,
//     MDBCardText,
//     MDBCardTitle,
//     MDBCardBody,
//     MDBCardImage,
//     MDBTypography,
// }from "mdb-react-ui-kit"
// import {useParams, Link} from "react-router-dom";
// import axios from "axios";
// import {toast} from "react-toastify";

// const Blog = () => {
//     const [blog, setBlog]=useState();
//     const {id}= useParams();

//     useEffect(() => {
//     if(id) {
//       getSingleBlog();
//     }
//   },[id])

//   const getSingleBlog = async () => {
//     const response = await axios.get(`http://localhost:3001/blogs/${id}`)
//     if(response.status === 200){
//       setBlog(response.data);
//     }else {
//       toast.error("Something went wrong");
//     }
//   };
//   const { id: blogId } = useParams();  // Renaming id to blogId
//   console.log("Fetched ID from useParams:", blogId);

//   const styleInfo = {
//     display: "incline",
//     marginLeft:"5px",
//     float: "right",
//     marginTop: "7px"
//   }
//   return (
//     <MDBContainer style={{border: "1px solid #d1ebe8" }}>
//       <Link to="/">
//         <strong style={{float: "left", color: "black"}} className="mt-3">
//           Go Back
//         </strong>
//       </Link>
//       <MDBTypography>{blog && blog.title}</MDBTypography>
//     </MDBContainer>

//   )
// }

// export default Blog;

import React from 'react'

const Blog = () => {
  return (
    <div>Blog</div>
  )
}

export default Blog