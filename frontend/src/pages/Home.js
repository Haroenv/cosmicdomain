import React, {Fragment} from "react";
import {Button, Container, Row, Col} from "reactstrap";
import Menu from "../components/shared/Menu";
import {InstantSearch, connectAutoComplete} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch("WYN0L8GBZX", "e4f307c4ea4782cbb93a5f12efdce800");

const Autocomplete = ({hits, currentRefinement, refine}) => (
   <ul>
      <li className='input-group mt-3'>
         <input
            type='search'
            placeholder={currentRefinement}
            className='form-control'
            // placeholder='Search by keyword, e.g. tech, beauty'
            onChange={event => refine(event.currentTarget.value)}
         />
      </li>
      <div className='result-box'>
         {hits.map(hit => (
            <li key={hit.objectID} className='result'>
               <div className='img-box'></div>
               <div className='info-box'>
                  <h5>{hit.name}</h5>
                  <p>{hit.price}</p>
               </div>
            </li>
         ))}
      </div>
   </ul>
);

const CustomAutocomplete = connectAutoComplete(Autocomplete);

class Home extends React.Component {
   render() {
      return (
         <Fragment>
            <header className='header bg-standard'>
               <Container>
                  <Menu />
                  <Row>
                     <Col sm='12'>
                        <div className='header-box'>
                           <h1>
                              Easiest way to find your cosmic domain<br></br> for your business.
                           </h1>

                           <InstantSearch searchClient={searchClient} indexName='dev_NAME'>
                              <CustomAutocomplete defaultRefinement='Search by keyword, e.g. tech, beauty' />
                           </InstantSearch>
                        </div>
                     </Col>
                  </Row>
               </Container>
            </header>
            <section className='section products'>
               <Container>
                  <Row>
                     <Col sm='12'>
                        <h1 className='text-center'>Featured Domains</h1>
                     </Col>
                  </Row>
                  <Row className='mt-5'>
                     <Col sm='12'>
                        <Row className='product no-gutters'>
                           <Col md='2'>
                              <div className='img-box'>
                                 <img src={require("../assets/images/products/cupiding.png")} />
                              </div>
                           </Col>
                           <Col md='8'>
                              <div className='info-box'>
                                 <h5>cupiding.com</h5>
                                 <h6>E-commerce</h6>
                              </div>
                           </Col>
                           <Col md='2'>
                              <div className='btn-box text-center'>
                                 <button className='btn btn-green'>Buy now</button>
                                 <a href='#'>Details</a>
                              </div>
                           </Col>
                        </Row>
                        <Row className='product no-gutters'>
                           <Col md='2'>
                              <div className='img-box'>
                                 <img src={require("../assets/images/products/findava.png")} />
                              </div>
                           </Col>
                           <Col md='8'>
                              <div className='info-box'>
                                 <h5>findava.com</h5>
                                 <h6>Finance</h6>
                              </div>
                           </Col>
                           <Col md='2'>
                              <div className='btn-box text-center'>
                                 <button className='btn btn-green'>Buy now</button>
                                 <a href='#'>Details</a>
                              </div>
                           </Col>
                        </Row>
                        <Row className='product no-gutters'>
                           <Col md='2'>
                              <div className='img-box'>
                                 <img src={require("../assets/images/products/resideno.png")} />
                              </div>
                           </Col>
                           <Col md='8'>
                              <div className='info-box'>
                                 <h5>resideno.com</h5>
                                 <h6>Real Estate</h6>
                              </div>
                           </Col>
                           <Col md='2'>
                              <div className='btn-box text-center'>
                                 <button className='btn btn-green'>Buy now</button>
                                 <a href='#'>Details</a>
                              </div>
                           </Col>
                        </Row>
                        <Row className='product no-gutters'>
                           <Col md='2'>
                              <div className='img-box'>
                                 <img src={require("../assets/images/products/securobit.png")} />
                              </div>
                           </Col>
                           <Col md='8'>
                              <div className='info-box'>
                                 <h5>securobit.com</h5>
                                 <h6>Security</h6>
                              </div>
                           </Col>
                           <Col md='2'>
                              <div className='btn-box text-center'>
                                 <button className='btn btn-green'>Buy now</button>
                                 <a href='#'>Details</a>
                              </div>
                           </Col>
                        </Row>
                        <Row className='product no-gutters'>
                           <Col md='2'>
                              <div className='img-box'>
                                 <img src={require("../assets/images/products/walrs.png")} />
                              </div>
                           </Col>
                           <Col md='8'>
                              <div className='info-box'>
                                 <h5>walrs.com</h5>
                                 <h6>Social Network</h6>
                              </div>
                           </Col>
                           <Col md='2'>
                              <div className='btn-box text-center'>
                                 <button className='btn btn-green'>Buy now</button>
                                 <a href='#'>Details</a>
                              </div>
                           </Col>
                        </Row>
                        <Row className='product no-gutters'>
                           <Col md='2'>
                              <div className='img-box'>
                                 <img src={require("../assets/images/products/zeflect.png")} />
                              </div>
                           </Col>
                           <Col md='8'>
                              <div className='info-box'>
                                 <h5>zeflect.com</h5>
                                 <h6>Startup</h6>
                              </div>
                           </Col>
                           <Col md='2'>
                              <div className='btn-box text-center'>
                                 <button className='btn btn-green'>Buy now</button>
                                 <a href='#'>Details</a>
                              </div>
                           </Col>
                        </Row>
                     </Col>
                  </Row>
               </Container>
               <div className='left-figure'>
                  <img src={require("../assets/images/1.png")} />
               </div>
            </section>
            <section className='section bg-grey'>
               <Container>
                  <Row>
                     <Col sm='12'>
                        <h1 className='text-center'>How It Works</h1>
                     </Col>
                  </Row>
                  <Row className='pb-5 mt-5'>
                     <Col md='4'>
                        <div className='work text-center'>
                           <img src={require("../assets/images/search.svg")} />
                           <h4>Search for your great domain</h4>
                           <p>In cosmic domain you can find an awesome domain name witch is great fit for your business.</p>
                           <a href='#'>Learn More</a>
                        </div>
                     </Col>
                     <Col md='4'>
                        <div className='work text-center'>
                           <img src={require("../assets/images/launch.svg")} />
                           <h4>Search for your great domain</h4>
                           <p>In cosmic domain you can find an awesome domain name witch is great fit for your business.</p>
                           <a href='#'>Learn More</a>
                        </div>
                     </Col>
                     <Col md='4'>
                        <div className='work text-center'>
                           <img src={require("../assets/images/continue.svg")} />
                           <h4>Search for your great domain</h4>
                           <p>In cosmic domain you can find an awesome domain name witch is great fit for your business.</p>
                           <a href='#'>Learn More</a>
                        </div>
                     </Col>
                  </Row>
                  <Row className='vert-center mt-5'>
                     <Col md='6'>
                        <h2>Reimagined for Game Developers</h2>
                        <p>
                           Are you a developer struggling with unfamiliar toolchain and limits of smart contracts? Planetarium is a new blockchain core specializing in
                           decentralized games. We have built a .NET-based blockchain that allows developers to code complex blockchain logic and interactive gameplay together in a
                           single Unity project. Think of Node.js, but for multi-platform online games.
                        </p>
                        <p>
                           Are you nervous about your sales relying solely on in-app purchases and publisher investments? Develop games with Planetarium to secure development costs
                           with token sales and benefit from the new revenue model with the permanent world that you created.
                        </p>
                     </Col>
                     <Col md='6'>
                        <img src={require("../assets/images/banner-1.svg")} className='md-width' />
                     </Col>
                  </Row>
                  <Row className='vert-center mt-5'>
                     <Col md='6'>
                        <img src={require("../assets/images/banner-2.svg")} className='md-width' />
                     </Col>
                     <Col md='6'>
                        <h2>Reimagined for Game Developers</h2>
                        <p>
                           Are you a developer struggling with unfamiliar toolchain and limits of smart contracts? Planetarium is a new blockchain core specializing in
                           decentralized games. We have built a .NET-based blockchain that allows developers to code complex blockchain logic and interactive gameplay together in a
                           single Unity project. Think of Node.js, but for multi-platform online games.
                        </p>
                        <p>
                           Are you nervous about your sales relying solely on in-app purchases and publisher investments? Develop games with Planetarium to secure development costs
                           with token sales and benefit from the new revenue model with the permanent world that you created.
                        </p>
                     </Col>
                  </Row>
                  <Row className='vert-center mt-5'>
                     <Col md='6'>
                        <h2>Reimagined for Game Developers</h2>
                        <p>
                           Are you a developer struggling with unfamiliar toolchain and limits of smart contracts? Planetarium is a new blockchain core specializing in
                           decentralized games. We have built a .NET-based blockchain that allows developers to code complex blockchain logic and interactive gameplay together in a
                           single Unity project. Think of Node.js, but for multi-platform online games.
                        </p>
                        <p>
                           Are you nervous about your sales relying solely on in-app purchases and publisher investments? Develop games with Planetarium to secure development costs
                           with token sales and benefit from the new revenue model with the permanent world that you created.
                        </p>
                     </Col>
                     <Col md='6'>
                        <img src={require("../assets/images/banner-3.svg")} className='md-width' />
                     </Col>
                  </Row>
               </Container>
            </section>
            <footer className='footer'>
               <Container>
                  <Row></Row>
               </Container>
            </footer>
         </Fragment>
      );
   }
}

export default Home;
