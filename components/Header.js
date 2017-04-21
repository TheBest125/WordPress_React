import React from 'react';
import fetch from 'isomorphic-fetch';
import * as Actions from '../actions/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

class Header extends React.Component{
  constructor(props){
    super(props);
    props.actions.fetchMenu('primary');
  }
  render() {

    let PrimaryMenu;
    if(this.props.receiveMenu.menu !== undefined){
      PrimaryMenu =
      <ul>
        {this.props.receiveMenu.menu.map((menuItem) =>
          <li key={menuItem.object_id}>
          <Link to={'/wpReactTheme/'+menuItem.object+'/'+menuItem.object_id}>{menuItem.title}</Link>
          </li>)}
      </ul>
    }

    return (
      <div>
        <h2>Primary Menu</h2>
        <hr />
        {PrimaryMenu}
        </div>
    );
  }
}

function mapStateToProps(state){
  const { receiveMenu } = state;
  return{
    receiveMenu
  }
}

function mapDispatchToProps(dispatch){
	return{
		actions: bindActionCreators(Actions, dispatch)
	}
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
