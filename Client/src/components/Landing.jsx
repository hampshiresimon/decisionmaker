import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import NewQuestion from './NewQuestion'
import MyQuestionsHeader from './MyQuestionsHeader'
import Login from './Login'
import QuestionList from './QuestionList'


export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="container-fluid">
            <NewQuestion/>
            <MyQuestionsHeader/>
            <Login/>
            <QuestionList/>
          </div>;
  }
});
