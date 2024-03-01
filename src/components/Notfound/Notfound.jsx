import React from 'react'
import { Link } from 'react-router-dom'
import image from '../../assets/img/github.png'

export default function Notfound() {
  return (
    <div className='d-flex flex-column gap-5 align-items-center text-center mt-5'>
      <h1>404</h1>
      <div className='text-muted'>
        <p className='fw-bold'>File not found</p>
        <p>The site configured at this address does not contain the requested file.</p>
        <p>If this is your site, make sure that the filename case matches the URL as well as any</p>
        <p>For root URLs (like http://example.com/) you must provide an index.html file.</p>
        <p><Link to={'https://docs.github.com/en/pages'} className='text-decoration-none'>Read the full documentation</Link> for more information about using <span className='fw-bold'>GitHub Pages</span></p>
        <div className='d-flex gap-3 justify-content-center mb-4'>
         <Link to={'https://www.githubstatus.com/'} className='text-muted decoration'>GitHub Status</Link>
         <Link to={'https://twitter.com/githubstatus'} className='text-muted decoration'>@githubstatus</Link>
        </div>
        <img src={image} alt="" />
      </div>
    </div>
  )
}
