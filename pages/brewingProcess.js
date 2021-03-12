import { Component } from 'react';
import PropTypes from 'prop-types';
import { CurrentUser } from '../components/User';
import Home from '../components/Home';
import Nav from '../components/Nav';
import BrewingProcess from '../components/BrewingProcess';

class BrewingProcessPage extends Component {
  static async getInitialProps({ query }) {
    return {
      brewingProcessId: query.brewingProcessId,
    };
  }

  render() {
    return (
      <div>
        <Nav />
        <CurrentUser>
          {({ data }) => {
            const me = data ? data.me : null;
            var hasRights;
            if (this.props.brewingProcessId && me) {
              // 2. admin ?
              if (me.permissions.includes('ADMIN')) {
                hasRights = true;
              } else {
                // does user participate?
                me.participatingBrewingProcesses.map((brewingProcess) => {
                  if (brewingProcess.id == this.props.brewingProcessId) {
                    hasRights = true;
                  }
                });
              }
            }
            if (!hasRights) {
              return <Home />;
            } else {
              return (
                <BrewingProcess
                  brewingProcessId={this.props.brewingProcessId}
                />
              );
            }
          }}
        </CurrentUser>
      </div>
    );
  }
}

BrewingProcessPage.propTypes = {
  brewingProcessId: PropTypes.string,
};

export default BrewingProcessPage;
