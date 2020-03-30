import React, {useEffect, useState} from "react";
//get the Link
import {Link} from "react-router-dom";

// for the fetch request
import axios from "axios";

const DomainsList = props => {
   const [domains, setDomains] = useState([]);
   console.log(domains);
   useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/`).then(res => {
         setDomains(res.data);
      });
   }, []);
   return (
      <div>
         Home:
         {domains.map(domain => {
            return <Link to={domain.slug}>{domain.name}</Link>;
         })}
      </div>
   );
};

export default DomainsList;
