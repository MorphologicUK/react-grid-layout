'use strict';
var React = require('react/addons');
var _ = require('lodash');
var ReactGridLayout = require('react-grid-layout');

var BasicLayout = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    onLayoutChange: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      className: "layout",
      items: 20,
      rowHeight: 30,
      cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}
    };
  },

  getInitialState() {
    var layout = this.generateLayout();
    return {
      layout: layout,
      initialLayout: layout
    };
  },

  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (<div key={i}><span className="text">{i}</span></div>);
    });
  },

  generateLayout() {
    var p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      var y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1;
      return {x: i * 2 % 12, y: Math.floor(i / 6) * y, w: 2, h: y, i: i};
    });
  },

  onLayoutChange: function(layout) {
    this.props.onLayoutChange(layout);
    this.setState({layout: layout});
  },

  render() {
    return (
      <ReactGridLayout initialLayout={this.state.initialLayout} onLayoutChange={this.onLayoutChange}
          {...this.props}>
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
});

module.exports = BasicLayout;

if (require.main === module) {
  require('../test-hook.jsx')(module.exports);
}