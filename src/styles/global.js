import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #fff;
    color: #FFF;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
  .modal-style{       
          background: #F0F0F5;
          color: #000000;
          border-radius:8px ;
          width: 736px;
          padding: 0 2rem 2rem;
          margin: auto;
          border-radius: 0.5rem;
          display: flex;
        }


.modal-style-overlay{
      display: flex;
      justify-items: center;
      align-items: center;
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.75);
 
}
.button-close-modal{
    position: relative;
    margin-right: 0;
    padding: 1rem 1rem ;
    float: right;
    margin-top: 1rem;
    margin-right: 0px;
}


`;
