import React, {Component} from 'react';
import renderHTML from 'react-render-html';
import User from './User';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/actions';

class Post extends Component{

componentWillMount(){
  const {fetchUser} = this.props.actions
  const {author} = this.props.post
  fetchUser(author)
}

  render() {
    const {title, content, date} = this.props.post
    let publish = date.split("T", 2);
    return(
      <div>
        <h1>{title.rendered}</h1>
        {renderHTML(content.rendered)}
        <p>Publish Date: {publish['0']} & Time: {publish['1']}</p>
        {this.props.user.isLoading ? <h2>Fetching Author...</h2> : <User {...this.props.user}/> }
      </div>
    );
  }
}

function mapStateToProps(state){
  const{receiveUser} = state;
  return{
    user: receiveUser
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
)(Post);
