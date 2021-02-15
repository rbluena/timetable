import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineMenu } from 'react-icons/hi';

function MenuIcon({ size }) {
	let classNames = '';

	if (size === 'sm') classNames = 'w-6 h-6';
	if (size == 'md') classNames = 'w-8 h-8';
	if (size === 'lg') classNames = 'w-12 h-12';

	return <HiOutlineMenu className={`${classNames} text-black`} />;
}

MenuIcon.defaultProps = {
	size: 'md',
};

MenuIcon.propTypes = {
	size: PropTypes.string,
};

export default MenuIcon;
