import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const HeadComponent = ({ children, title, description }) => (
  <Head>
    <title key="title">{title}</title>
    <meta key="description" name="description" content={description} />
    {children}
  </Head>
);

HeadComponent.defaultProps = {
  title: 'Asteyo',
  description: 'Scheduler and task management for short term projects.',
  children: null,
};

HeadComponent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default HeadComponent;
