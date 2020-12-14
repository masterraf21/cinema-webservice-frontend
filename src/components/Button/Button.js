import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.scss'
import cx from 'classnames'

const Button = ({ onClick, textColor, bgColor, className, title }) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor
      }}
      name='btn'
      className={cx(className, styles.container)}
      onClick={() => onClick()}
    >
      {title}
    </div>
  )
}

Button.defaultProps = {}

Button.propTypes = {
  onClick: PropTypes.func,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string
}

export default Button
