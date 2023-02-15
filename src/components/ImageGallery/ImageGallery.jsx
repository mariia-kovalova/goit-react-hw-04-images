import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ items, onSelect }) => {
  useEffect(() => {
    if (items.length < 13) return;
    scroll();
  }, [items]);

  function scroll() {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }

  return (
    <GalleryList className="gallery">
      {items.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          srcUrl={webformatURL}
          largeImageURL={largeImageURL}
          description={tags}
          onSelect={() => onSelect(largeImageURL)}
        />
      ))}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};
