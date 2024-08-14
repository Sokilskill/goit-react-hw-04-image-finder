import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Loader from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import css from './ImageGallery.module.css';
import { fetchSearch } from 'api/pixabayAPI';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ImageGallery = ({ searchQuery }) => {
  const [dataQuery, setDataQuery] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!searchQuery) return;
    setStatus(Status.PENDING);

    const fetch = async () => {
      try {
        const data = await fetchSearch({
          query: searchQuery,
          currentPage: 1,
        });

        if (parseInt(data.totalHits) === 0) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        setTotalHits(data.total);
        setDataQuery(data.hits);
        setPage(1);
        setStatus(Status.RESOLVED);
        toast(`Hooray! We found ${data.totalHits} images.`);
      } catch (error) {
        toast.error(`${error}`);
        console.log(error);
        setStatus(Status.REJECTED);
      }
    };

    fetch();
  }, [searchQuery]);

  useEffect(() => {
    if (page === 1) return;

    const fetchMoreData = async () => {
      setStatus(Status.PENDING);

      try {
        const data = await fetchSearch({
          query: searchQuery,
          currentPage: page,
        });

        setDataQuery(prevState => [...prevState, ...data.hits]);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setStatus(Status.REJECTED);
        toast.error(`${error.message}`);
      }
    };

    fetchMoreData();
  }, [page, searchQuery]);

  const fetchLoadMore = async () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className="container">
      {dataQuery.length !== 0 && (
        <>
          <p>
            Search on the site
            <b style={{ fontWeight: 'bold' }}>"{searchQuery}"</b>
          </p>
          <ul className={css.imageGallery}>
            {dataQuery.map(data => (
              <ImageGalleryItem key={data.id} imagePreview={data} />
            ))}
          </ul>
        </>
      )}
      {status === Status.PENDING && <Loader />}

      {totalHits !== dataQuery.length && (
        <Button fetchLoadMore={fetchLoadMore} children="Load More" />
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
