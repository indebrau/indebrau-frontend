import SignUp from '../components/SignUp';
import Nav from '../components/Nav';
import { CurrentUser } from '../components/User';
import Home from '../components/Home';

const SignUpPage = () => (
  <div>
    <Nav />
    <CurrentUser>
      {({ data }) => {
        const me = data ? data.me : null;
        return (
          <>
            {!me && <SignUp />}
            {me && <Home />}
          </>
        );
      }}
    </CurrentUser>
  </div>
);

export default SignUpPage;
