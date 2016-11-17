import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="ol-md-8 col-md-offset-2">
            <div>My Saved Questions</div>

          </div>;
  }
});
