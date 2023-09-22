import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  onToggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const {
      imagePreview: { webformatURL, largeImageURL, tags },
    } = this.props;
    return (
      <>
        <li className={css.imageGalleryItem} onClick={this.onToggleModal}>
          <img
            src={webformatURL}
            alt={tags}
            className={css['imageGalleryItem-image']}
            loading="lazy"
          />
        </li>
        {this.state.showModal && (
          <Modal tag={tags} img={largeImageURL} onToggle={this.onToggleModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  imagePreview: PropTypes.object.isRequired,
};

export default ImageGalleryItem;
