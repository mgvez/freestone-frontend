import React, { Component } from 'react';

/* component styles */
import styles from './styles';

export class TopImage extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <section className={`${styles}`} ref="parallax">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
              
                <h1 className="title">
                  Redux Easy Boilerplate
                </h1>
             
            
                <p>
                  Start your project easy and fast with modern tools
                </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
