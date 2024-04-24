import './BreadcrumbElement.css'
import React from 'react'

import Breadcrumb from 'react-bootstrap/Breadcrumb';

const IntroduceBreadcrumbElement = () => {
  return (
    <Breadcrumb className='breadcrumbAll'>
        <Breadcrumb.Item href="/" className='customLinkActive'>홈</Breadcrumb.Item>
        <Breadcrumb.Item className='customLinkNow'>소개</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default IntroduceBreadcrumbElement