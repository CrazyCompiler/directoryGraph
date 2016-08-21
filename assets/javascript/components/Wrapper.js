import React, { Component } from 'react';
import Footer from "./Footer";
import Header from "./Header";

export default class Wrapper extends React.Component {

  render() {
    return (
      <div>
          <Header />
          <Footer />
      </div>
    );
  }
}
