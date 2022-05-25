import React from 'react'

export default function Strip() {
    let objCss = {
        minHeight:"350px",
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundImage:`url(https://idme-marketplace.s3.amazonaws.com/iqC6PqKBefGKkiW5jc5KzA6B)`
      }
      return (
        <div style={objCss} className='container-fluid strip'>
        <div className="container d-flex justify-content-center align-items-center text-light">
          <h1 className=''>Welcome to TICKET SCALPING</h1>
        </div>
      </div>
    )
}
