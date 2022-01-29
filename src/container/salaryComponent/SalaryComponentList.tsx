import * as React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Header from "../../component/common/Header";
import Sidebar from "../../component/common/Sidebar";
import CONSTANT from "../../constant";
import { addSalaryComponents, getSalaryAllowanceList } from "../../action/salaryAllowanceAction";
import Loader from "../../component/common/Loader";
import { getCookie } from "./../../utils";
import { salaryComponentGet } from "../../action/PayrollCycleAction";

class ComponentName extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: undefined,
      showLoader: false,
      userType: getCookie(CONSTANT.cookie.userDetail).userType,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = CONSTANT.title.locationList;

    this.loadList();
  }
  

  public render() {
    const {
      list,
      showLoader    } = this.state;

    return (
      <React.Fragment>
        <Header />
        <div className="fluid-container px-0">
          <div className="row">
            <Sidebar />
            <div className="col-lg-11">
              <div className="row mt-3">
                <div className="col-lg-12">
                  <h5 className="heading-h1">Salary Component</h5>
                </div>
              </div>

              <div className="card mt-3">
                <div className="card-header">
                  <div className="float-left">
                    <b>Salary Component List </b>
                  </div>
                
                   
                  <div className="float-right">
                    <Link
                      to={CONSTANT.url.settingsOption.salaryAddComponent}
                    >
                      <i className="fa fa-plus"></i>
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Employee Name</th>
                          <th scope="col">Employee Code</th>
                          <th scope="col">Component Name</th>
                          <th scope="col">Amount</th>
                          {/* <th scope="col">Date</th> */}
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {list === undefined && (
                          <tr>
                            <td className="text-center" colSpan={5}>
                              Loading...
                            </td>
                          </tr>
                        )}
                        {list &&
                       
                          list.length === 0 && (
                            <tr>
                              <td className="text-center" colSpan={5}>
                                No records found
                              </td>
                            </tr>
                          )}
                        {list &&
                          list !== undefined &&
                          list
                            .map((l: any, i: any) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    {l.name}
                                    <br />
                                  </td>
                                  <td>
                                      {l.employeeId}
                                  </td>
                                  <td>
                                    {l.componentName}
                                    <br />
                                  </td>
                                  <td>
                                    {l.amount}
                                    <br />
                                  </td>
                                 
                                  {/* <th scope="col">
                                    <Link to={detailPageURL}>
                                      <i className="fas fa-edit"></i>
                                    </Link>
                                  </th> */}
                                </tr>
                              );
                            })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showLoader && <Loader />}
      </React.Fragment>
    );
  }

  loadList = () => {
    salaryComponentGet().then((res: any) => {

      if (res.length>0) this.setState({ list: res });
    });
  };
}

export default ComponentName;
