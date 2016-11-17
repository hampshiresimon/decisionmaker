import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="ol-md-8 col-md-offset-2">
            <div><u>This is my first question - should I do this or that?</u></div>
            <div><i><b>Best Answer</b> - I should definitely do this</i></div>
          </div>;
  }
});
