import * as React from 'react';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/employee-master/ProgressBar';
import Loader from '../../component/common/Loader';
import Shimmer from '../../component/common/Shimmer';
import CONSTANT from './../../constant';
import AddBank from './../../component/employee-master/AddBank';
import { getCookie } from '../../utils';
import { getBankDetail, updateBankDetail ,getSectionDetail, updateSectionFreezeDetail} from './../../action/EmployeeAction';
import { clearUnwanted } from '../../utils';

class EmployeeBankDetail extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userId: props.match.params.id,
            showLoader: false,
            detail: undefined,
            isSystemUser: getCookie('isu'),
            freezed: true,
            sectionId: 5
        }
    }

    componentDidMount() {
        this.loadList();
    }

    public render() {
        const { userId, detail, showLoader, isSystemUser, freezed } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="col-lg-12  mt-2 mb-3">
                                <ProgressBar userId={userId} />
                            </div>
                            {
                                detail === undefined && <Shimmer />
                            }
                            {
                                detail !== undefined && <AddBank
                                    userId={userId}
                                    detail={detail}
                                    onSubmit={this.onSubmit}
                                    isu={isSystemUser}
                                    freezed={freezed}
                                    toggleFreezed={this.toggleFreezed}
                                />
                            }
                        </div>
                    </div>
                </div>
                {
                    showLoader && <Loader />
                }
            </React.Fragment>
        )
    }

    loadList = () => {
        const { userId,sectionId } = this.state;
        this.setState({ showLoader: true });
        getBankDetail(userId).then((res: any) => {
            this.setState({ showLoader: false, detail: res.result });
            getSectionDetail(userId, sectionId).then((sec: any) => {
                if(sec.result)
                {
                    this.setState({freezed: sec.result.freezed})
                }                
            })
        })
    }

    toggleFreezed = (freezed: any) => {
        this.setState({showLoader: true})
        let payload = {
            userId: this.props.match.params.id,
            sectionId: this.state.sectionId,
            freezed
        }
        updateSectionFreezeDetail(payload).then((res:any)=> {
            this.loadList()
        })
    }

    onSubmit = (model: any) => {
        this.setState({ showLoader: true });
        updateBankDetail(model).then((res: any) => {
            this.setState({ showLoader: false });
            alert('Changes were saved successfully');
            this.props.history.push(CONSTANT.url.editEmployeeDocument.replace(':id', this.state.userId))
        }, (error: any) => {
            alert(error.message);
        });
    }

}

export default EmployeeBankDetail;
