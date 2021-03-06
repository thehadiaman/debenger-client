import React from 'react'
import {Pagination as Pagin} from "semantic-ui-react";


const Pagination = ({totalPages, activePage, handlePagination}) => {
    return(<div style={{textAlign: 'center'}}>
        <Pagin
            onPageChange={handlePagination}
            boundaryRange={0}
            defaultActivePage={activePage}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={2}
            totalPages={totalPages}
        />
    </div>)
}

export default Pagination