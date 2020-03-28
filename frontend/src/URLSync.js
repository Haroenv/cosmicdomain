import React, { Component } from "react";
import qs from "qs";
import Domains from "./pages/Domains";

const updateAfter = 700;

const routeStateDefaultValues = {
  query: "",
  page: "1",
  industry: "",
  price: "",
  sortBy: "dev_NAME",
  hitsPerPage: "20"
};

const encodedIndustries = {
  Cameras: "Cameras & Camcorders",
  Cars: "Car Electronics & GPS",
  Phones: "Cell Phones",
  TV: "TV & Home Theater"
};

const decodedIndustries = Object.keys(encodedIndustries).reduce((acc, key) => {
  const newKey = encodedIndustries[key];
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
function getIndustrySlug(industry) {
  const encodedName = decodedIndustries[industry] || industry;

  return encodedName
    .replace(/ > /g, "/")
    .split(" ")
    .map(encodeURIComponent)
    .join("+");
}

// Returns a name from the industry slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getIndustryName(slug) {
  const decodedSlug = encodedIndustries[slug] || slug;

  return decodedSlug
    .split("+")
    .map(decodeURIComponent)
    .join(" ")
    .replace(/\//g, " > ");
}

const searchStateToURL = searchState => {
  const routeState = {
    query: searchState.query,
    page: String(searchState.page),
    industry:
      searchState.hierarchicalMenu &&
      searchState.hierarchicalMenu["industry.lvl0"],
    price:
      searchState.range &&
      searchState.range.price &&
      `${searchState.range.price.min || ""}:${searchState.range.price.max ||
        ""}`,
    sortBy: searchState.sortBy,
    hitsPerPage:
      (searchState.hitsPerPage && String(searchState.hitsPerPage)) || undefined
  };

  const { protocol, hostname, port = "", pathname, hash } = window.location;
  const portWithPrefix = port === "" ? "" : `:${port}`;
  const urlParts = window.location.href.match(/^(.*?)\/search/);
  const baseUrl =
    (urlParts && urlParts[0]) ||
    `${protocol}//${hostname}${portWithPrefix}${pathname}search`;

  const industryPath = routeState.industry
    ? `${getIndustrySlug(routeState.industry)}/`
    : "";
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

  if (
    routeState.sortBy &&
    routeState.sortBy !== routeStateDefaultValues.sortBy
  ) {
    queryParameters.sortBy = routeState.sortBy;
  }
  if (
    routeState.hitsPerPage &&
    routeState.hitsPerPage !== routeStateDefaultValues.hitsPerPage
  ) {
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
  const industry = getIndustryName(
    (pathnameMatches && pathnameMatches[1]) || ""
  );
  const queryParameters = qs.parse(location.search.slice(1));
  const { query = "", page = 1, price, hitsPerPage, sortBy } = queryParameters;
  // `qs` does not return an array when there's a single value.
  //   const allBrands = Array.isArray(brands) ? brands : [brands].filter(Boolean);

  const searchState = { range: {} };

  if (query) {
    searchState.query = decodeURIComponent(query);
  }
  if (page) {
    searchState.page = page;
  }
  if (industry) {
    searchState.hierarchicalMenu = {
      "industry.lvl0": industry
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

const withURLSync = Domains =>
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

    onPopState = ({ state }) =>
      this.setState({
        searchState: state || {}
      });

    onSearchStateChange = searchState => {
      clearTimeout(this.debouncedSetState);

      this.debouncedSetState = setTimeout(() => {
        window.history.pushState(
          searchState,
          null,
          searchStateToURL(searchState)
        );
      }, updateAfter);

      this.setState({ searchState });
    };

    render() {
      const { searchState } = this.state;

      return (
        <Domains
          {...this.props}
          searchState={searchState}
          onSearchStateChange={this.onSearchStateChange}
          createURL={searchStateToURL}
        />
      );
    }
  };

export default withURLSync;
