import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const SingleDomain = props => {
   const [domain, setDomain] = useState([]);

   console.log("domain", domain);
   useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/${props.match.params.slug}`).then(res => {
         setDomain(res.data);
      });
   }, []);

   return (
      <div>
         Domain:
         {domain.map(dom => {
            return (
               <>
                  <h1>{dom.name}</h1>
                  <p>eye color: {dom.price}</p>
               </>
            );
         })}
         <Link to='/home'>back to home</Link>
      </div>
   );
};

export default SingleDomain;
