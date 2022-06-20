import React from 'react'
import { Helmet } from 'react-helmet';

const Meta = ({title,keyword,description}) => {
  return (
   <>
        <Helmet>
           <title>{title}</title>
           <meta name='description' content={description}></meta>
           <meta name='keywords' content={keyword}></meta>
        </Helmet>
   </>
  )
}

Meta.defaultProps={
    title:'Welcome to Proshop',
    description:'we sell the best product for cheap',
    keyword:'electronics,buy cheap electronics'
}

export default Meta

