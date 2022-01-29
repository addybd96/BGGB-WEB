import * as React from 'react';

import CONSTANT from '../../constant';
import AddLeaves from '../../component/FastivalAdvance/Add'
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import { addFastivalAdvance, applyFestivalAdvance, getEmployeeSalaryDetails } from '../../action/FastivalAdvanceAction';

class AddLeave extends React.Component<any, any> {
    
    constructor(props: any) {
        super(props);
        this.state={
            emplyeeSalaryDetails:null
        }
    }

    componentDidMount(){
        this.loadData()
    }
    public render() {
        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />
                            <AddLeaves
                                onSubmit={this.onSubmit}
                                onCancel={this.onCancel}
                                salaryData={this.state.emplyeeSalaryDetails}
                            />
                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }

    onSubmit = (model: any) => {
        applyFestivalAdvance(model).then((res: any) => {
            if (res.result) {
                this.props.history.push(CONSTANT.url.fasitvalAddListEmp)
            }
            if(res.status === false)
                alert(res.error.message)
        }).catch((err: any) => {
            alert(err)
        });
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.fasitvalAddListEmp)
    }

    loadData=()=>{
        getEmployeeSalaryDetails().then((res: any) => {
            this.setState({
                emplyeeSalaryDetails:res.result
            })
            
        }).catch((err: any) => {
            alert(err)
        });
    }
}

export default AddLeave;
