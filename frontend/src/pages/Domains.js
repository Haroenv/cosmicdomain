import React, {useRef} from "react";
import {
   InstantSearch,
   HierarchicalMenu,
   RefinementList,
   SortBy,
   Pagination,
   ClearRefinements,
   Highlight,
   Hits,
   connectRange,
   HitsPerPage,
   Panel,
   Configure,
   NumericMenu,
   SearchBox,
   Snippet
} from "react-instantsearch-dom";
import Menu from "../components/shared/Menu";
import algoliasearch from "algoliasearch/lite";
import {
   ClearFiltersMobile,
   NoResults,
   ResultsNumberMobile,
   // PriceSlider,
   SaveFiltersMobile
} from "../components/widgets";
// import RangeSlider from "../components/widgets/CustomRangeSlider";
// import PropTypes from "prop-types";

// import RangeSlider from "../components/widgets/RangeSlider";

import withURLSync from "../URLSync";
import {formatNumber} from "../utils";
import {Container, Row, Col} from "reactstrap";

const searchClient = algoliasearch("WYN0L8GBZX", "e4f307c4ea4782cbb93a5f12efdce800");

// const CustomRangeSlider = connectRange(RangeSlider);

const Hit = ({hit}) => (
   <article className='hit'>
      <div className='hit-image-container'>
         <img src={"http://127.0.0.1:8000/media/" + hit.thumbnail_image} alt={hit.name} className='hit-image' />
      </div>

      <div className='hit-info-container'>
         <p className='hit-Industry'>{hit.industry}</p>
         <Highlight attribute='name' className='sm-title' hit={hit} />
         <p className='hit-description'>
            <Snippet attribute='description' tagName='mark' hit={hit} />
         </p>

         <footer>
            <p>
               <span className='hit-em'>$</span> {formatNumber(hit.price)}{" "}
            </p>
         </footer>
      </div>
   </article>
);

const Domains = props => {
   const containerRef = useRef(null);
   const headerRef = useRef(null);

   function openFilters() {
      document.body.classList.add("filtering");
      window.scrollTo(0, 0);
      window.addEventListener("keyup", onKeyUp);
      window.addEventListener("click", onClick);
   }

   function closeFilters() {
      document.body.classList.remove("filtering");
      containerRef.current.scrollIntoView();
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("click", onClick);
   }

   function onKeyUp(event) {
      if (event.key !== "Escape") {
         return;
      }

      closeFilters();
   }

   function onClick(event) {
      if (event.target !== headerRef.current) {
         return;
      }

      closeFilters();
   }

   return (
      <InstantSearch
         searchClient={searchClient}
         indexName='dev_NAME'
         // searchState={props.searchState}
         // createURL={props.createURL}
         // onSearchStateChange={props.onSearchStateChange}
      >
         <header className='header bg-standard' ref={headerRef}>
            <Container>
               <Row>
                  <Col sm='12'>
                     <Menu />
                     <div className='header-box text-center'>
                        <p className='header-title'>Stop looking for an item — find it.</p>

                        <SearchBox
                           translations={{
                              placeholder: "Domain, industry, extension, …"
                           }}
                           submit={
                              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 18 18'>
                                 <g fill='none' fillRule='evenodd' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.67' transform='translate(1 1)'>
                                    <circle cx='7.11' cy='7.11' r='7.11' />
                                    <path d='M16 16l-3.87-3.87' />
                                 </g>
                              </svg>
                           }
                        />
                     </div>
                  </Col>
               </Row>
            </Container>
         </header>

         <Configure attributesToSnippet={["description:10"]} snippetEllipsisText='…' removeWordsIfNoResults='allOptional' />

         <main
            className='container'
            ref={containerRef}
            style={{
               display: "flex",
               margin: "0 auto",
               maxWidth: "1300px",
               padding: "2rem 1rem"
            }}
         >
            <div className='container-wrapper'>
               <section className='container-filters' onKeyUp={onKeyUp}>
                  <div className='container-header'>
                     <h2>Filters</h2>

                     <div className='clear-filters' data-layout='desktop'>
                        <ClearRefinements
                           translations={{
                              reset: (
                                 <>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11'>
                                       <g fill='none' fillRule='evenodd' opacity='.4'>
                                          <path d='M0 0h11v11H0z' />
                                          <path
                                             fill='#000'
                                             fillRule='nonzero'
                                             d='M8.26 2.75a3.896 3.896 0 1 0 1.102 3.262l.007-.056a.49.49 0 0 1 .485-.456c.253 0 .451.206.437.457 0 0 .012-.109-.006.061a4.813 4.813 0 1 1-1.348-3.887v-.987a.458.458 0 1 1 .917.002v2.062a.459.459 0 0 1-.459.459H7.334a.458.458 0 1 1-.002-.917h.928z'
                                          />
                                       </g>
                                    </svg>
                                    Clear filters
                                 </>
                              )
                           }}
                        />
                     </div>

                     <div className='clear-filters' data-layout='mobile'>
                        <ResultsNumberMobile />
                     </div>
                  </div>

                  <div className='container-body'>
                     <Panel header='Industry'>
                        <HierarchicalMenu attributes={["industry"]} />
                     </Panel>

                     <Panel header='Price'>
                        {/* <PriceSlider attribute='price' /> */}
                        <NumericMenu
                           attribute='price'
                           items={[
                              {label: "<= $10", end: 10},
                              {label: "$10 - $100", start: 10, end: 100},
                              {label: "$3000 - $10000", start: 3000, end: 10000},
                              {label: ">= $500", start: 500}
                           ]}
                        />
                     </Panel>
                  </div>
               </section>

               <footer className='container-filters-footer' data-layout='mobile'>
                  <div className='container-filters-footer-button-wrapper'>
                     <ClearFiltersMobile containerRef={containerRef} />
                  </div>

                  <div className='container-filters-footer-button-wrapper'>
                     <SaveFiltersMobile onClick={closeFilters} />
                  </div>
               </footer>
            </div>

            <section className='container-results'>
               <header className='container-header container-options'>
                  <SortBy
                     className='container-option'
                     defaultRefinement='dev_NAME'
                     items={[
                        {
                           label: "Sort by featured",
                           value: "dev_NAME"
                        },
                        {
                           label: "Price ascending",
                           value: "dev_NAME_price_asc"
                        },
                        {
                           label: "Price descending",
                           value: "dev_NAME_price_desc"
                        }
                     ]}
                  />

                  <HitsPerPage
                     className='container-option'
                     items={[
                        {
                           label: "16 hits per page",
                           value: 16
                        },
                        {
                           label: "32 hits per page",
                           value: 32
                        },
                        {
                           label: "64 hits per page",
                           value: 64
                        }
                     ]}
                     defaultRefinement={16}
                  />
               </header>

               <Hits hitComponent={Hit} />
               <NoResults />

               <footer className='container-footer'>
                  <Pagination
                     padding={2}
                     showFirst={false}
                     showLast={false}
                     translations={{
                        previous: (
                           <svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'>
                              <g fill='none' fillRule='evenodd' stroke='#000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.143'>
                                 <path d='M9 5H1M5 9L1 5l4-4' />
                              </g>
                           </svg>
                        ),
                        next: (
                           <svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'>
                              <g fill='none' fillRule='evenodd' stroke='#000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.143'>
                                 <path d='M1 5h8M5 9l4-4-4-4' />
                              </g>
                           </svg>
                        )
                     }}
                  />
               </footer>
            </section>
         </main>

         <aside data-layout='mobile'>
            <button className='filters-button' data-action='open-overlay' onClick={openFilters}>
               <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 14'>
                  <path d='M15 1H1l5.6 6.3v4.37L9.4 13V7.3z' stroke='#fff' strokeWidth='1.29' fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round' />
               </svg>
               Filters
            </button>
         </aside>
      </InstantSearch>
   );
};

export default withURLSync(Domains);
