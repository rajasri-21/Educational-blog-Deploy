import React, {useState,useEffect} from 'react'
import axios from "axios";
import{MDBRow,MDBCol,MDBContainer,MDBTypography} from "mdb-react-ui-kit";
import {toast} from "react-toastify";
import Blogs from '../components/Blogs';
import Search from '../components/Search';
import Category from '../components/Category';


const Home = () => {
  const [data, setData]=useState([]);
  const {searchState, setSearchValue}=useState("");
  const options = ["Travel","Fashion","Fitness","Sports","Food","Tech"];


  useEffect(()=>{
    loadBlogsData();
  },[]);

  const loadBlogsData=async()=>{
    const response=await axios.get("http://localhost:3001/blogs");
    if (response.status === 200){
      setData(response.data);
    }else{
      toast.error("Something went wrong");
    }
  };

  console.log("data",data);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you wanted delete that blog?")) {
      const response = await axios.delete(`http://localhost:3001/blogs/${id}`);
      if (response.status === 200){
        toast.success("Blog Deleted Successfully");
        loadBlogsData();
      } else{
       toast.error("Something went wrong");
      }
    }
  };

  
  const excerpt =(str)=>{
    if (str.length >50){
      str= str.substring(0, 50)+" ... ";
    }
    return str;

  };

  const onInputChange =(e) =>{
    setSearchValue(e.targe.value);
  }
  const handleSearch = async (e) =>{
    e.preventDefault();
    const response=await axios.get(``)

  }
    return (
       <>

       {/* <Search searchValue={searchValue} onInputChange={} handleSearch={}/> */}
       <MDBRow>
            {data.length == 0 && (
              <MDBTypography className="text-center mb-0" tag="h2">
                  No blog found
              </MDBTypography>
            )}
            <MDBCol>
              <MDBContainer>
                <MDBRow>
                  {data && data.map((item,index) => (
                    <Blogs
                    key={index}
                    {...item}
                    excerpt={excerpt}
                    handleDelete={handleDelete}
                    />
                  ))}
                </MDBRow>
              </MDBContainer>
            </MDBCol>
       <MDBCol size="3">
          <Category options={options}/>
       </MDBCol>
       </MDBRow>
       </>
  )
}

export default Home;