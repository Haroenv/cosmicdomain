import React from "react";

state = {
    domains: []
 }

 componentDidMount() {
    let domainUrl = `${getDomains}`;
    fetch(domainUrl)
      .then(data => data.json())
      .then(data => {
          this.setState({
             domains: data
          })
      })

      console.log(domains)
  }

  let listdomains = this.state.domains.map((domain, name) => {
    return(
      <div key={name}>
        <h4>{post.name.rendered}</h4>
        <p dangerouslySetInnerHTML={{__html: domain.content.rendered}}/>
      </div>
    )
  })