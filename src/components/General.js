import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Preloader } from './Preloader';
import Card from './Card';
import { Modal } from './Modal';

import { buttonScrollCreator } from '../utils/buttonScrollCreator';
import { createPages } from '../utils/pagesCreator';

import '../styles/components/General.scss';


const General = () => {
  const [pagination, setPagination] = useState(1); // 1 - dynamic pagination, 2 - regular pagination
  const [currentPageDinamic, setCurrentPageDinamic] = useState(1);
  const [currentPageStatic, setCurrentPageStatic] = useState(1);
  const [cards, setCards] = useState([]);
  const [pagesCount, setPagesCount] = useState(true);
  const [responseStatus, setResponseStatus] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [modal, setModal] = useState({
    mode: false,
    id: null,
  });

  const pages = [];

  buttonScrollCreator();
  createPages(pages, pagesCount, currentPageStatic);

  useEffect(() => {
    if (fetching) {
      axios.get(`https://rickandmortyapi.com/api/character/?page=${(pagination === 2) ? currentPageStatic : currentPageDinamic}`)
        .then(response => {

          if (pagination === 1) {
            setCards([...cards, ...response.data.results]);
            setCurrentPageDinamic(prevState => prevState + 1);
          }

          if (pagination === 2) {
            setCards([...response.data.results]);
          }

          setPagesCount(response.data.info.pages);
          setResponseStatus(response.status);
        })

        .finally(() => setFetching(false));
    }
  }, [fetching, cards, currentPageDinamic, currentPageStatic, pagination]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return function () {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  const scrollHandler = (e) => {
    if (pagination === 1 && e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true);
    }
  }

  const changePagination = () => {
    setCards([]);
    setFetching(true);

    if (pagination === 1) {
      setPagination(2);
    } else {
      setPagination(1);
      setCurrentPageStatic(1);
      setCurrentPageDinamic(1);
    }
  }

  const changePage = (e) => {
    let id = e.target.id;

    if (currentPageStatic > 1 && currentPageStatic < 42) {

      if (id === 'left') {
        setCurrentPageStatic(prevState => prevState - 1);
      } else if (id === 'right') {
        setCurrentPageStatic(prevState => prevState + 1);
      } 

      setCards([]);
      setFetching(true);
    }
  }

  let code = cards.map((info) => {
    return (
      <div
        key={info.id}
        onClick={() => setModal({ ...modal, mode: true, id: info.id })}
        className='general__item'
      >
        <Card info={info} />
      </div>
    )
  });

  return (
    <main className='general wrapper'>
      <button className='general__button-change' onClick={changePagination}>change pagination</button>
      <a href='#top' className='general__button-to-top' id='btn-top'>Top</a>
      {
        (pagination === 2) ?
          <div className='general__pagination'>
            <a className='page' id='left' onClick={changePage} href='.#'>«</a>
            {
              pages.map((page, index) => {
                return (
                  <span
                    key={index}
                    className={`page ${currentPageStatic === page ? 'active' : ''}`}
                    onClick={()=>{
                      setCurrentPageStatic(page);
                      setCards([]);
                      setFetching(true);
                    }}
                  >
                    {page}
                  </span>
                )
              })
            }
            <a className='page' id='right' onClick={changePage} href='.#'>»</a>
          </div>
          : null
      }
      {
        (responseStatus !== 200) ? <Preloader /> :
        <div className='general__container' >
          <Modal
            isOpened={true}
            onModalClose={(e) => {
              if (e.target === e.currentTarget) {
                setModal({ ...modal, mode: false, id: null })
              }
            }}
            card={cards.find(element => element.id === modal.id)}
          />
          {code}
        </div>
      }
    </main>
  );
};

export default React.memo(General);