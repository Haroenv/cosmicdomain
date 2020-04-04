import React, {useEffect, useState, Fragment} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "reactstrap";
import Menu from "./Menu";

const SingleDomain = props => {
   const [domain, setDomain] = useState([]);

   useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/${props.match.params.slug}`).then(res => {
         setDomain(res.data);
         console.log("Response Data: ", res.data);
      });
   }, []);

   return (
      <Fragment>
         <section className='menu-box'>
            <Container>
               <Row>
                  <Col sm='12'>
                     <Menu />
                  </Col>
               </Row>
            </Container>
         </section>
         <section className='section'>
            <Container>
               <Row>
                  <Col md='6'>
                     <img src={domain.thumbnail_image} alt={domain.name} />
                  </Col>
                  <Col md='6'>
                     <h1>{domain.name}</h1>
                     <p>{domain.price}</p>
                     <ul>
                        <li>
                           <a href='#'>{domain.tag}</a>
                        </li>
                     </ul>
                  </Col>
               </Row>
            </Container>
         </section>
      </Fragment>
   );
};

export default SingleDomain;
