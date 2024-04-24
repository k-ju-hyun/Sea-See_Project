import './BreadcrumbElement.css'
import React from 'react'

import Breadcrumb from 'react-bootstrap/Breadcrumb';

const SearchBreadcrumbElement = () => {
  return (
    <Breadcrumb className='breadcrumbAll'>
        <Breadcrumb.Item href="/" className='customLinkActive'>홈</Breadcrumb.Item>
        <Breadcrumb.Item className='customLinkNow'>해수욕장 신호등</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default SearchBreadcrumbElement