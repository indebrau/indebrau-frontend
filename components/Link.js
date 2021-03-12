import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';
import { forwardRef } from 'react';

const NextComposed = forwardRef((props, ref) => {
  const { as, href, prefetch, ...other } = props;
  return (
    <NextLink href={href} prefetch={prefetch} as={as} innerRef={ref}>
      <a {...other} />
    </NextLink>
  );
});

NextComposed.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  prefetch: PropTypes.bool,
};
NextComposed.displayName = 'NextComposed'; // ESLint cries otherwise

// A styled version of the Next.js Link component
const Link = forwardRef((props, ref) => {
  const {
    activeClassName,
    router,
    className: classNameProps,
    naked,
    ...other
  } = props;

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName,
  });

  if (naked) {
    return <NextComposed className={className} ref={ref} {...other} />;
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={ref}
      style={{ textDecoration: 'none' }}
      color="inherit"
      {...other}
    />
  );
});

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

Link.defaultProps = {
  activeClassName: 'active',
};

export default withRouter(Link);
