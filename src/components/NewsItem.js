const NewsItem = (props) => {

  let { title, description, imageUrl, url, author, date, source } = props;
  return (
    <div className='my-3'>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className='badge rounded-pill bg-danger'> {source} </span>
        </div>
        <img src={imageUrl && imageUrl !== "null" && imageUrl !== "" ? imageUrl : "https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg"}
          className="card-img-top" alt="News" onError={(e) => { e.target.onerror = null; e.target.src = "https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg"; }} />
        <div className="card-body">
          <h5 className="card-title"> {title} </h5>
          <p className="card-text"> {description}...</p>
          <p rel='noreferrer'> <small className="text-muted"> By {!author ? "Unknown" : author} on {new Date(date).toGMTString()} </small></p>
          <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more...</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
  