import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Loader from '../Loader/Loader';
import NewsApiService from 'api/pixabayAPI';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import css from './ImageGallery.module.css';

const newsApiService = new NewsApiService();
const perPage = newsApiService.perPage;
// let score = perPage;

export class ImageGallery extends Component {
  state = {
    dataQuery: null,
    status: 'idle',
    score: perPage,
    showBtnMore: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      newsApiService.query = this.props.searchQuery;
      newsApiService.resetPageToDefault();
      this.setState({ status: 'pending', score: perPage, showBtnMore: false });

      try {
        const data = await newsApiService.fetchSearch();

        if (parseInt(data.totalHits) <= 0) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        this.setState({
          dataQuery: data.hits,
          status: 'resolve',
        });

        toast(`Hooray! We found ${data.totalHits} images.`);
        if (data.totalHits > perPage)
          this.setState({
            showBtnMore: true,
          });
      } catch (error) {
        toast.error(`${error}`);
        console.log(error);
        this.setState({
          status: 'rejected',
        });
      }
    }
  }

  async fetchLoadMore() {
    newsApiService.incrementPage();
    const data = await newsApiService.fetchSearch();
    this.setState({
      status: 'pending',
    });
    try {
      this.setState(prevState => {
        const updatedScore = prevState.score + data.hits.length;
        let showBtnMore = true;

        if (updatedScore >= data.totalHits) {
          showBtnMore = false;
          toast("We're sorry, but you've reached the end of search results.");
        }

        return {
          dataQuery: [...prevState.dataQuery, ...data.hits],
          score: updatedScore,
          showBtnMore,
          status: 'resolve',
        };
      });
    } catch (error) {
      toast.error(`${error}`);
      console.log(error);
    }
  }

  render() {
    const { dataQuery, status, showBtnMore } = this.state;

    return (
      <div className="container">
        {status === 'resolve' && (
          <ul className={css.imageGallery}>
            {dataQuery.map(data => (
              <ImageGalleryItem key={data.id} imagePreview={data} />
            ))}
          </ul>
        )}
        {status === 'pending' && <Loader />}
        {showBtnMore && <Button fetchLoadMore={() => this.fetchLoadMore()} />}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
