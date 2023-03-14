import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ items, onSelect }) => (
  <GalleryList className="gallery">
    {items.map(item => (
      <li key={item.id}>
        <ImageGalleryItem
          item={item}
          onSelect={() => onSelect(item.largeImageURL)}
        />
      </li>
    ))}
  </GalleryList>
);

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ),
  onSelect: PropTypes.func.isRequired,
};
