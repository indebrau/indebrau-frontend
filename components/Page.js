import { Component } from 'react';
import PropTypes from 'prop-types';
import Meta from './Meta';

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        {this.props.children}
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.object.isRequired,
};
export default Page;
