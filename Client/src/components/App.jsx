import React from 'react';
import {List} from 'immutable';

const pair = List.of('Trainspotting', '28 Days Later');

export default React.createClass({
  render: function() {
    return this.props.children
  },

  componentWillReceiveProps : function(nextProps) {
    this.setState({
        children: nextProps.children
    });
  }
});
