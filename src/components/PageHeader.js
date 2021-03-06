import React from 'react'
import get from 'lodash/get'
import PropTypes from 'prop-types'

import { Link } from 'gatsby'
import Image from './Image'
import './PageHeader.css'

const PageHeader = ({
  title,
  subtitle,
  content,
  smallContent,
  buttons,
  backgroundImage,
  large,
  className = ''
}) => {
  if (large) className += ' PageHeader-large'
  return (
    <div className={`PageHeader relative ${className}`}>
      {backgroundImage && (
        <Image
          background
          resolutions="large"
          src={backgroundImage}
          alt={title}
          size="cover"
        />
      )}
      <div className="container relative">
        {title && (
          <h1 className="PageHeader--Title">
            {title}
            {subtitle && (
              <span className="PageHeader--Subtitle">{subtitle}</span>
            )}
          </h1>
        )}
        {content && <p className="PageHeader--Text">{content}</p>}
        {smallContent && (
          <div className="PageHeader--TextSmall">{smallContent}</div>
        )}
        {buttons && (
          <div className="PageHeader--Buttons">
            {buttons.map((button, index) =>
              !!get(button, 'action') ? (
                <button
                  key={index}
                  onClick={button.action}
                  className={`Button ${button.type && `Button-${button.type}`}`}
                >
                  {button.text}{' '}
                </button>
              ) : (
                <Link
                  key={index}
                  to={button.to}
                  className={`Button ${button.type && `Button-${button.type}`}`}
                >
                  {button.text}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  content: PropTypes.string,
  smallContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      type: PropTypes.oneOf(['primary', 'secondary']),
      to: PropTypes.string
    })
  )
}

export default PageHeader
