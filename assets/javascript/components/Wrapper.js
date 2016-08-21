import React, { Component } from 'react';
import Footer from "./Footer";
import Header from "./Header";
import DirectoryStructure from "./DirectoryStructure";

export default class Wrapper extends React.Component {

  render() {
    return (
      <div>
          <Header />
          <DirectoryStructure />
          <Footer />
      </div>
    );
  }
}
