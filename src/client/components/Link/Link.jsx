import Link from 'next/link';
import PropTypes from 'prop-types';

const ALink = ({ children, href, variant, type, className }) => {
  if (variant === 'primary' && type === 'button') {
    className +=
      ' px-4 bg-primary-500 text-white h-10 text-sm font-bold rounded-sm hover:bg-primary-400';
  }

  return (
    <Link href={href}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={`p-2 ${className}`}>{children}</a>
    </Link>
  );
};

ALink.defaultProps = {
  variant: 'primary',
  className: '',
  type: '',
};

ALink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  variant: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default ALink;
