import React, {Component} from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import '../../public/css/shop.pcss';

class Index extends Component {
  render() {
    return (
      <div className="cont">
        <Header/>
        <div className="shop">
          这是商城
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Index;
