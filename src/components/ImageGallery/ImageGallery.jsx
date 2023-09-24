import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Loader from '../Loader/Loader';
import NewsApiService from 'api/pixabayAPI';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import css from './ImageGallery.module.css';

const newsApiService = new NewsApiService();
const perPage = newsApiService.perPage;

const ImageGallery = ({ searchQuery }) => {
  const [dataQuery, setDataQuery] = useState(null);
  const [status, setStatus] = useState('idle');
  // const [showBtnMore, setShowBtnMore] = useState(false);
  const [totalHits, setTotalHits] = useState(1);

  const totalPage = Math.ceil(totalHits / perPage);
  const currentPage = newsApiService.page;

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const fetchData = async () => {
      newsApiService.query = searchQuery;
      newsApiService.resetPageToDefault();
      setStatus('pending');
      // setShowBtnMore(false);
      try {
        const data = await newsApiService.fetchSearch();
        if (parseInt(data.totalHits) === 0) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setTotalHits(data.total);
        setDataQuery(data.hits);
        setStatus('resolve');
        toast(`Hooray! We found ${data.totalHits} images.`);
        // if (data.totalHits > perPage) setShowBtnMore(true);
      } catch (error) {
        toast.error(`${error}`);
        console.log(error);
        setStatus('rejected');
      }
    };

    fetchData();
  }, [searchQuery]);

  const fetchLoadMore = async () => {
    newsApiService.incrementPage();
    const data = await newsApiService.fetchSearch();
    setStatus('pending');
    try {
      console.log('data', data);

      // if (updatedScore >= data.totalHits) {
      //   setShowBtnMore(false);
      //   toast("We're sorry, but you've reached the end of search results.");
      //   return;
      // }
      setDataQuery(prevState => [...prevState, ...data.hits]);
      setStatus('resolve');
    } catch (error) {
      toast.error(`${error}`);
      console.log(error);
    }
  };

  return (
    <div className="container">
      {status === 'resolve' && (
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
      {status === 'pending' && <Loader />}
      {totalPage !== currentPage && <Button fetchLoadMore={fetchLoadMore} />}
    </div>
  );
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
