import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Modal } from './Modal';
import { ButtonToTop } from './ButtonToTop';

import '../styles/General.scss';
import { createPages } from "./pagesCreator";
import { Preloader } from './Preloader';


const General = () => {
  const [cards, setCards] = useState([]);
  const [responseStatus, setResponseStatus] = useState(null);


  const [pagination, setPagination] = useState(1); // 1 - dynamic pagination, 2 - regular pagination

  const [currentPageDinamic, setCurrentPageDinamic] = useState(1);
  const [currentPageStatic, setCurrentPageStatic] = useState(1);

  const [fetching, setFetching] = useState(true);
  const [pagesCount, setPagesCount] = useState(true);
  const [modal, setModal] = useState({
    mode: false,
    id: null,
  });

  const pages = [];

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


  let code = cards.map((info) => {
    return (
      <div
        key={info.id}
        onClick={() => setModal({ ...modal, mode: true, id: info.id })}
        className='general__item'
      >
        <img className='general__item-img' src={info.image} alt='character avatar' />
        <span className='general__item-text'>{info.name}</span>
      </div>

    )
  });

  const changePagination = () => {

    if (pagination === 1) {
      setCards([]);
      setFetching(true);
      setPagination(2);
    } else {
      setCards([]);
      setPagination(1);
      setCurrentPageStatic(1);
      setCurrentPageDinamic(1);
      setFetching(true);
    }
  }

  return (
    <main className='general wrapper'>
      <button className='general__button-change' onClick={changePagination}>change pagination</button>
      {
        (pagination === 2) ?
          <div className='general__pagination'>
            <a className='page' onClick={() => {

              if (currentPageStatic > 1) {
                setCurrentPageStatic(prevState => prevState - 1)
                setCards([]);
                setFetching(true);
              }
            }} href=".#">«</a>
            {pages.map((page, index) => {
              return (
                <span
                  key={index}
                  className={`page ${currentPageStatic === page ? 'active' : ''}`}
                  onClick={() => {

                    setCurrentPageStatic(page);
                    setCards([]);
                    setFetching(true);



                  }}>{page}
                </span>
              )
            })}
            <a className='page' onClick={() => {
              if (currentPageStatic < 42) {
                setCurrentPageStatic(prevState => prevState + 1)
                setCards([]);
                setFetching(true);
              }

            }} href=".#">»</a>

          </div>

          : null

      }
      {(responseStatus !== 200) ? <Preloader /> :
        <div className='general__container' >
          <ButtonToTop />
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