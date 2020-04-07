import React, {Component} from "react";
import qs from "qs";

const updateAfter = 700;

const routeStateDefaultValues = {
   query: "",
   page: "1",
   industry: "",
   price: "",
   sortBy: "instant_search",
   hitsPerPage: "20"
};

const encodedCategories = {
   Cameras: "Cameras & Camcorders",
   Cars: "Car Electronics & GPS",
   Phones: "Cell Phones",
   TV: "TV & Home Theater"
};

const decodedCategories = Object.keys(encodedCategories).reduce((acc, key) => {
   const newKey = encodedCategories[key];
   const newValue = key;

   return {
      ...acc,
      [newKey]: newValue
   };
}, {});

// Returns a slug from the industry name.
// Spaces are replaced by "+" to make
// the URL easier to read and other
// characters are encoded.
function getCategorySlug(name) {
   const encodedName = decodedCategories[name] || name;

   return encodedName
      .replace(/ > /g, "/")
      .split(" ")
      .map(encodeURIComponent)
      .join("-");
}

// Returns a name from the industry slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug) {
   const decodedSlug = encodedCategories[slug] || slug;

   return decodedSlug
      .split("-")
      .map(decodeURIComponent)
      .join(" ")
      .replace(/\//g, " > ");
}

const searchStateToURL = searchState => {
   const price = searchState.range &&
      searchState.range.price &&
      `${searchState.range.price.min || ''}:${searchState.range.price.max || ''}`

   const routeState = {
      query: searchState.query,
      page: String(searchState.page),
      industry:
        searchState.hierarchicalMenu && searchState.hierarchicalMenu['industry'],
      price:
        price !== ':' ? price : undefined,
      sortBy: searchState.sortBy,
      hitsPerPage:
        (searchState.hitsPerPage && String(searchState.hitsPerPage)) || undefined,
    };

   const {protocol, hostname, port = "", pathname, hash} = window.location;
   const portWithPrefix = port === "" ? "" : `:${port}`;
   const urlParts = window.location.href.match(/^(.*?)\/search/);
   const baseUrl = (urlParts && urlParts[0]) || `${protocol}//${hostname}${portWithPrefix}${pathname}${pathname[pathname.length -1] === '/' ? '' : '/'}search`;

   const industryPath = routeState.industry ? `${getCategorySlug(routeState.industry)}/` : "";
   const queryParameters = {};

   if (routeState.query && routeState.query !== routeStateDefaultValues.query) {
      queryParameters.query = encodeURIComponent(routeState.query);
   }
   if (routeState.page && routeState.page !== routeStateDefaultValues.page) {
      queryParameters.page = routeState.page;
   }

   if (routeState.price && routeState.price !== routeStateDefaultValues.price) {
      queryParameters.price = routeState.price;
   }

   if (routeState.sortBy && routeState.sortBy !== routeStateDefaultValues.sortBy) {
      queryParameters.sortBy = routeState.sortBy;
   }
   if (routeState.hitsPerPage && routeState.hitsPerPage !== routeStateDefaultValues.hitsPerPage) {
      queryParameters.hitsPerPage = routeState.hitsPerPage;
   }

   const queryString = qs.stringify(queryParameters, {
      addQueryPrefix: true,
      arrayFormat: "repeat"
   });

   return `${baseUrl}/${industryPath}${queryString}${hash}`;
};

const urlToSearchState = location => {
   const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);
   const industry = getCategoryName((pathnameMatches && pathnameMatches[1]) || "");
   const queryParameters = qs.parse(location.search.slice(1));
   const {query = "", page = 1, price, hitsPerPage, sortBy} = queryParameters;
   // `qs` does not return an array when there's a single value.

   const searchState = {range: {}};

   if (query) {
      searchState.query = decodeURIComponent(query);
   }
   if (page) {
      searchState.page = page;
   }
   if (industry) {
      searchState.hierarchicalMenu = {
         industry: industry
      };
   }

   if (price) {
      const [min, max = undefined] = price.split(":");
      searchState.range.price = {
         min: min || undefined,
         max: max || undefined
      };
   }

   if (sortBy) {
      searchState.sortBy = sortBy;
   }

   if (hitsPerPage) {
      searchState.hitsPerPage = hitsPerPage;
   }

   return searchState;
};

const withURLSync = App =>
   class WithURLSync extends Component {
      state = {
         searchState: urlToSearchState(window.location)
      };

      componentDidMount() {
         window.addEventListener("popstate", this.onPopState);
      }

      componentWillUnmount() {
         clearTimeout(this.debouncedSetState);
         window.removeEventListener("popstate", this.onPopState);
      }

      onPopState = ({state}) =>
         this.setState({
            searchState: state || {}
         });

      onSearchStateChange = searchState => {
         clearTimeout(this.debouncedSetState);

         this.debouncedSetState = setTimeout(() => {
            window.history.pushState(searchState, null, searchStateToURL(searchState));
         }, updateAfter);

         this.setState({searchState});
      };

      render() {
         const {searchState} = this.state;

         console.log("URL sync is here");

         return <App {...this.props} searchState={searchState} onSearchStateChange={this.onSearchStateChange} createURL={searchStateToURL} />;
      }
   };

export default withURLSync;
