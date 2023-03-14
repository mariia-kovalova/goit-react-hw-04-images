import PropTypes from 'prop-types';
import { Img, Wrap } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  item: { webformatURL, tags },
  onSelect,
}) => {
  return (
    <Wrap onClick={onSelect}>
      <Img src={webformatURL} alt={tags} />
    </Wrap>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};
