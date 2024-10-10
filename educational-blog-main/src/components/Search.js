import React from 'react'
import {MDBBtn} from "mdb-react-ui-kit"

const Search = ({handleSearch, searchValue,onInputChange}) => {
  return (
    <div className="searchForm">
        <form className="d-flex" on-submit={handleSearch}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Blog..."
              value={searchValue}
              onChange={onInputChange}
            />
            <MDBBtn type="submit">Search</MDBBtn>
        </form>
    </div>
   )
}

export default Search;