import * as React from 'react';
import Spinner from './../../assets/images/spinner.png';
import { Progress } from 'reactstrap';

const ProgressLoader = (props: any) => {
    function percentage(partialValue: any, totalValue: any) {
        let res = (100 * partialValue) / totalValue;
        console.log("res per", res);
        return res;
    }
    const percentageCalc = percentage(props.progressCount, props.totalCount);
    // console.log("partialValue", props.count);
    // console.log("totalValue", props.totalCount);
    console.log("percentageCalc", percentageCalc);
    return (
        <div className='loader-container'>
            <Progress className="text-center" value={percentageCalc}>{`${props.progressCount}/${props.totalCount}`}</Progress>
            {/* <img alt="Loading..." className='loader' src={Spinner} /> */}
        </div>
    );
}

export default ProgressLoader;