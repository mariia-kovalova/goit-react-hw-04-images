import { useEffect, useRef, useState } from 'react';
import { getPhotos } from 'api';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';
import { Container, End, Trigger } from './App.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState('');
  const trigger = useRef(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    if (query === '') return;
    getItems({ query, page });
    async function getItems({ query, page }) {
      try {
        setIsLoading(true);
        const { hits: moreItems, totalHits: total } = await getPhotos({
          query,
          page,
        });
        if (total === 0) throw Error(`"${query}" pictures were not found.`);
        setItems(items => [...items, ...moreItems]);
        setTotal(total);
      } catch (error) {
        setError(error);
        console.dir(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [page, query]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (trigger.current) observer.observe(trigger.current);

    function handleObserver(entries) {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage(prev => prev + 1);
      }
    }
  });

  function handleSubmit(newQuery) {
    if (newQuery === query) return;
    setItems([]);
    setTotal(0);
    setQuery(newQuery);
    setPage(1);
  }

  function handleModalClose() {
    setUrl('');
  }

  const showGallary = total > 0 && !error;
  const hasMore =
    !isLoading && !error && items.length > 0 && page < Math.ceil(total / 12);
  const end =
    !isLoading && !error && items.length > 0 && !(page < Math.ceil(total / 12));
  const showModal = url.length > 0;

  return (
    <>
      <Container>
        <Searchbar onSubmit={handleSubmit} />
        {showGallary && <ImageGallery items={items} onSelect={setUrl} />}
        {hasMore && <Trigger ref={trigger} />}
        {isLoading && <Loader />}
        {error && <End>Oops, something went wrong! {error.message}</End>}
        {end && <End>End of content</End>}
        {showModal && (
          <Modal onCloseModal={handleModalClose}>
            <img src={url} alt="modal window" />
          </Modal>
        )}
      </Container>
      <ToastContainer autoClose={2500} />
    </>
  );
};
