import React from 'react';
import PropTypes from 'prop-types';
import { HiCog } from 'react-icons/hi';

function CogIcon({ size }) {
	let classNames = '';

	if (size === 'sm') classNames = 'w-6 h-6';
	if (size == 'md') classNames = 'w-8 h-8';
	if (size === 'lg') classNames = 'w-12 h-12';

	return <HiCog className={`${classNames} text-gray-600`} />;
}

CogIcon.defaultProps = {
	size: 'md',
};

CogIcon.propTypes = {
	size: PropTypes.string,
};

export default CogIcon;
