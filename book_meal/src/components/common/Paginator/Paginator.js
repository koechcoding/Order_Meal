import React from "react";
import PropTypes from "prop-types";
import { Button } from 'reactstrap';

const Paginator = ({ pageInfo = {}, onNext, onPrev}) =>(
    <div>
    <p className="text-center pt-0 mt-0 text-bottom">Showing page {pageInfo.currentPage} of {pageInfo.pageCount}</p>
    <div className="pt-1">
        <Button 
            disabled={!pageInfo.hasNext} 
            onClick={() => onNext(pageInfo.nextPage)} 
            className="btn btn-secondary float-right btn-next">Next </Button>
        <Button 
            disabled={!pageInfo.hasPrev} 
            onClick={() => onPrev(pageInfo.prevPage)} 
            className="btn btn-secondary btn-prev"> Previous</Button>
    </div>
</div>
);

Paginator.propTypes = {
    pageInfo: PropTypes.object,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
}

export default Paginator;