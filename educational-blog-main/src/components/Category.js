import React from 'react'
import {MDBCard,MDBListGroup,MDBListGroupItem} from "mdb-react-ui-kit";

const category = ({handleCategory,options}) => {
  return (
    <MDBCard style={{width:"!8rem",marginTop:"20px"}}>
        <h4>Categories</h4>
        <MDBListGroup flush>
            {options.map((item,index)=> (
                <MDBListGroupItem
                    key={index}
                    style={{cursor:"pointer"}}
                    onclick={() => handleCategory(item)}
                >
                    {item}
                </MDBListGroupItem>
                ))}
        </MDBListGroup>
    </MDBCard>
    
  )
}

export default category