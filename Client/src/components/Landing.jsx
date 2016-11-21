import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {NewQuestionContainer} from './NewQuestion'
import MyQuestionsHeader from './MyQuestionsHeader'
import Login from './Login'
import QuestionList from './QuestionList'


export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="container-fluid">
            <NewQuestionContainer/>
            <MyQuestionsHeader/>
            <Login/>
            <QuestionList/>
          </div>;
  }
});
