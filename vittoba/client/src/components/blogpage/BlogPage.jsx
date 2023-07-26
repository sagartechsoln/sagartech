import React from 'react'
import Breadcrumb from '../breadcrumb/Breadcrumb'
import Ourblogs from './Ourblogs'
import "./blogs.css"

const BlogPage = () => {
    return (
        <>
            <Breadcrumb title="Blogs" />
            <Ourblogs />
        </>
    )
}

export default BlogPage