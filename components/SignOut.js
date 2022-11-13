import { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import { Button } from '@material-ui/core';
import {
  CURRENT_USER_QUERY,
  SIGN_OUT_MUTATION,
} from '../lib/queriesAndMutations';

class Signout extends Component {
  render() {
    return (
      <Mutation
        mutation={SIGN_OUT_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signout) => <Button onClick={signout}>Sign Out</Button>}
      </Mutation>
    );
  }
}
export default Signout;
