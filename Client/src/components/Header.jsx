import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../core/actionCreator';
import {AccountContainer} from './Account';
import {AccountDisplayContainer} from './AccountDisplay';
import {List, Map} from 'immutable';
import * as Constants from '../core/constants'
var shallowCompare = require('react-addons-shallow-compare');

class Header extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  getAccountDisplay() {
    if( this.props.account.get('loginStatus') == Constants.LOGIN_STATE_LOGGED_IN) {
      return <AccountDisplayContainer account={this.props.account} />
    } else {
      return <AccountContainer account={this.props.account} />
    }
  }

  render() {

    return <div className='header-container'>
      <div className='header-menu'>
        {this.getAccountDisplay()}
      </div>
      <div id='myCarousel' className='carousel slide header-carousel' data-ride='carousel' data-interval='7000'>
          <ol className='carousel-indicators'>
            <li data-target='#myCarousel' data-slide-to='0' className='active'></li>
            <li data-target='#myCarousel' data-slide-to='1' className=''></li>
            <li data-target='#myCarousel' data-slide-to='2' className=''></li>
            <li data-target='#myCarousel' data-slide-to='3' className=''></li>
          </ol>
          <div className='carousel-inner'>
            <div className='item active'>
              <img src='http://placehold.it/900x250/5677fc/5677fc' className='carousel-image' alt=''/>
              <div className='container'>
                <div className='carousel-caption'>
                  <div className='carouselHeader'>Making Decisions</div>
                  <p className='carouselBody'>Isn't always easy...</p>
                </div>
              </div>
            </div>
            <div className='item'>
              <img src='http://placehold.it/900x250/673ab7/673ab7' className='carousel-image' alt=''/>
              <div className='container'>
                <div className='carousel-caption'>
                  <div className='carouselHeader'>Modern Living</div>
                  <p className='carouselBody'>Can be bewildering</p>
                </div>
              </div>
            </div>
            <div className='item'>
              <img src='http://placehold.it/900x250/9c27b0/9c27b0' className='carousel-image' alt=''/>
              <div className='container'>
                <div className='carousel-caption'>
                  <div className='carouselHeader'>Be Sure</div>
                  <p className='carouselBody'>Of your decisions</p>
                </div>
              </div>
            </div>
            <div className='item'>
              <img src='http://placehold.it/900x250/E91E63/E91E63' className='carousel-image' alt=''/>
              <div className='container'>
                <div className='carousel-caption'>
                  <div className='carouselHeader'>We're Here</div>
                  <p className='carouselBody'>On your journey</p>
                </div>
              </div>
            </div>
          </div>

          <a href='#myCarousel' className='left carousel-control' data-slide='prev'><span className='glyphicon glyphicon-chevron-left'></span></a>
          <a href='#myCarousel' className='right carousel-control' data-slide='next'><span className='glyphicon glyphicon-chevron-right'></span></a>

        </div>
        </div>
  }
}

Header.propTypes = {
  account : React.PropTypes.instanceOf(Map)
}

function mapStateToProps(state) {
  return {

  }
}

const HeaderContainer = connect(
  mapStateToProps,
  actionCreators
)(Header)

export { Header, HeaderContainer }
