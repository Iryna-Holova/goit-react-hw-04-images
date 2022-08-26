import { useState, useEffect } from "react";
import { animateScroll as scroll } from 'react-scroll'

import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loading from "components/Loader/Loader";
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import RejectMessage from "./RejectMessage/RejectMessage";
import fetchPictures from "services/fetchPictures";

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState('idle');
  const [modalURL, setModalURL] = useState(null);

  useEffect(() => {
    const loadPictures = () => {
      setStatus('pending');

      fetchPictures(searchQuery, page)
        .then(hits => {
          if (!hits.length) {
            setStatus('rejected')
          } else {
            setPictures(prevPictures => [...prevPictures, ...hits]);
            setStatus('resolved');
          }
        })
        .catch(() => setStatus('rejected'))
    }
    if (searchQuery) {
      loadPictures();
    }
  }, [searchQuery, page]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setPictures([]);
  }

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
    scroll.scrollMore(277);
  }

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery pictures={pictures} onOpenModal={setModalURL} />
      {(status === 'idle') && <div className="Message">Please enter search query</div>}
      {(status === 'resolved') && <Button onLoadMore={incrementPage} />}
      {(status === 'pending') && <Loading />}
      {(status === 'rejected') && <RejectMessage />}
      {(modalURL && <Modal onClose={setModalURL}><img className="Modal-image" src={modalURL} alt='' /></Modal>)}
    </div>
  )
}