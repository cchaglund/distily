/* eslint-disable no-undef */

import React from 'react';
import styled from '@emotion/styled';
import deleteHelper from '../helpers/delete';
import Button from '../components/Button';
import FadeWrapper from '../HOC/FadeWrapper';

const DeleteModal = ({ type, id, title, confirmClick, cancelClick}) => {
  const Modal = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    color: black;
    background-color: rgba(100, 100, 100, 0.4);
    cursor: default;
  `;

  const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: white;
    min-width: 15rem;
    height: 10rem;
    border-radius: 0.1rem;
  `;

  const BtnContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
  `;

  const confirmDeletion = () => {
    deleteHelper({
      type: type,
      id: id
    });
    confirmClick();
  };

  return(
    <FadeWrapper>
      <Modal onClick={ () => cancelClick() }>
        <Div>
          <p>Delete '{ title }'?</p>
          <BtnContainer>
            <Button
              clicked={ () => confirmDeletion()}
              text={'Delete'} 
              btnClass={'warning'} />
            <Button
              clicked={ () => cancelClick()}
              text={'Cancel'} 
              btnClass={'action'} />
          </BtnContainer>
        </Div>
      </Modal>
    </FadeWrapper>
  );
};

export default DeleteModal;