import React, { Component } from 'react';
export class NewsItem extends Component {
  render() {
    let { title, description, ImgUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className="card">
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>      
            <span className=" badge rounded-pill bg-danger" >
              {source}
            </span>
            </div>

           <img src={!ImgUrl?"https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2020/09/Frame-47.png":ImgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...  </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} updated on {new Date(date).toGMTString()}</small></p>

            <a href={newsUrl} target="_blank" className="btn btn-dark">Get the full update</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
