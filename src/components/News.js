import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(0);
    setLoading(true);
    const { country, category, pageSize, apiKey } = props;
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      setLoading(true);
      const response = await fetch(url);
      props.setProgress(30);
      const data = await response.json();
      props.setProgress(70);
      setArticles(data.articles || []);
      setTotalResults(data.totalResults || 0);
      setLoading(false);
      props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} -NewsPulse`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const { country, category, pageSize, apiKey } = props;
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage+1}&pageSize=${pageSize}`;
      setPage(nextPage+1)
      const response = await fetch(url);
      const data = await response.json();
      setArticles(articles.concat(data.articles || []));
      setTotalResults(data.totalResults || 0);
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '30px 0px', marginTop: '90px' }}>
       NewsPulse - Top Headlines from {capitalizeFirstLetter(props.category)}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title || ""}
                  description={element.description || ""}
                  imageUrl={element.urlToImage}
                  url={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'us',
  pageSize: 3,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired
};

export default News;
