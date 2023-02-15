import { useEffect, useState } from 'react';
import { getPhotos } from 'utils';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal/Modal';
import { Container, End } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (query === '') return;
    getItems();
    async function getItems() {
      try {
        setIsLoading(true);
        const { hits: moreItems, totalHits: total } = await getPhotos(
          query,
          page
        );
        setItems(items => [...items, ...moreItems]);
        setTotal(total);
        if (total === 0) notify(query);
      } catch (error) {
        setError(error);
        errorInfo(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [page, query]);

  function handleSubmit(newQuery) {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setItems([]);
    setError(null);
  }

  function loadMore() {
    setPage(page => page + 1);
  }

  function notify(message) {
    toast.warning(`Oops, "${message}" pictures were not found.`);
  }

  function errorInfo(message) {
    toast.error(`Oops, something went wrong: ${message}`);
  }

  const showLoadMore = page < Math.ceil(total / 12) && items.length > 0;
  const end = !(page < Math.ceil(total / 12)) && items.length > 0;
  const showModal = url.length > 0;

  return (
    <>
      <Container>
        <Searchbar onSubmit={handleSubmit} />

        <ImageGallery items={items} onSelect={setUrl} />
        {isLoading && <Loader />}
        {showLoadMore && (
          <Button onClick={loadMore} type="button">
            Load more
          </Button>
        )}
        {end && <End>End of content</End>}
        {error && <End>Error</End>}
        {showModal && (
          <Modal onCloseModal={setUrl('')}>
            <img src={url} alt="modal window" />
          </Modal>
        )}
      </Container>
      <ToastContainer autoClose={2500} />
    </>
  );
};
