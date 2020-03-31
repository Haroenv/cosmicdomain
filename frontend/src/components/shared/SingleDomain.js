import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const SingleDomain = props => {
   const [domain, setDomain] = useState([]);

   console.log("domain", domain);
   useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/${props.match.params.slug}`).then(res => {
         setDomain(res.data);
         console.log("Response Data: ", res.data);
      });
   }, []);

   console.log("Data: ", domain);

   return (
      <div className='text-center'>
         <h1>{domain.name}</h1>
         <p>{domain.price}</p>
      </div>
   );
};

export default SingleDomain;
