import './BreadcrumbElement.css'
import React from 'react'

import Breadcrumb from 'react-bootstrap/Breadcrumb';

const CommunityPhotoBreadcrumbElement = () => {
  return (
    <Breadcrumb className='breadcrumbAll'>
        <Breadcrumb.Item href="/" className='customLinkActive'>홈</Breadcrumb.Item>
        <Breadcrumb.Item className='customLink'>커뮤니티</Breadcrumb.Item>
        <Breadcrumb.Item className='customLinkNow'>해수욕장 포토스팟</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default CommunityPhotoBreadcrumbElement