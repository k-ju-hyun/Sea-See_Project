import './BreadcrumbElement.css'
import React from 'react'

import Breadcrumb from 'react-bootstrap/Breadcrumb';

const UpdateStoreBreadcrumbElement = () => {
  return (
    <Breadcrumb className='breadcrumbAll'>
        <Breadcrumb.Item href="/" className='customLinkActive'>홈</Breadcrumb.Item>
        <Breadcrumb.Item className='customLink'>커뮤니티</Breadcrumb.Item>
        <Breadcrumb.Item href="/CommunityStore" className='customLinkActive'>해수욕장 주변 맛집</Breadcrumb.Item>
        <Breadcrumb.Item className='customLinkNow'>수정하기</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default UpdateStoreBreadcrumbElement