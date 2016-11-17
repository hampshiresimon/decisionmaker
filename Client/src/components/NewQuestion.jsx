import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');


class NewQuestion extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      questionText: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({questionText: event.target.value});
  }

  handleSubmit(event) {
    alert('A question was submitted: ' + this.state.questionText);
    event.preventDefault();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return <div className="ol-md-8 col-md-offset-2">
      <form onSubmit={this.handleSubmit}>
            <div>Question:</div>
            <div>
              <textarea value={this.state.questionText} onChange={this.handleChange}/>
              <input type="submit" value="GO" />
            </div>
          </form>
          </div>
  }
}

export default NewQuestion
