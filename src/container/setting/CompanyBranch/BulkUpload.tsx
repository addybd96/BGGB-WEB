import * as React from 'react';
import XLSX from 'xlsx'
import { UncontrolledTooltip } from 'reactstrap'

import Header from '../../../component/common/Header'
import Sidebar from '../../../component/common/Sidebar';

import { addCompanyBranch } from '../../../action/CompanyBranchAction';
import { isValidDateFormat } from '../../../utils'
import ProgressLoader from '../../../component/common/ProgressLoader';
import { setInterval } from 'timers';
import CONSTANT from '../../../constant'


const sampleFile = require('../../../assets/excel/office_sample.xlsx');

class UploadEmployee extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            employees: [],
            showLoader: false,
            isExcelValid: false,
            totalCount: 0,
            progressCount: 0
        }
    }

    public render() {
        const { showLoader, employees, totalCount, progressCount } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="card">
                                <div className="card-header">
                                    Branch/Office upload
                                </div>
                                <div className="card-body">
                                    <input className="form-control p-1" type="file" onChange={this.handleFileOpen} />
                                    <small><a download={true} href={sampleFile}>Click here to download a sample file</a></small>
                                </div>
                            </div>
                            {
                                employees.length > 0 &&
                                <div className="card mt-3">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-lg-10 pt-1">
                                                <b>Preview Employee</b>
                                            </div>
                                            <div className="table-responsive mt-3">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Sol ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Region</th>
                                                            <th scope="col">Branch Category</th>
                                                            <th scope="col">Address</th>
                                                            <th scope="col">Email ID</th>
                                                            <th scope="col">Mobile No.</th>
                                                            <th scope="col">Contact No.</th>
                                                            <th scope="col">CCA %</th>
                                                            <th scope="col">HRA Officers</th>
                                                            <th scope="col">HRA Employee</th>
                                                            <th scope="col">Type</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.renderEmployeeTable()}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-lg-12 pull-right mt-1 mb-2 pr-0 pl-0">
                                                <div className="col-lg-2 pull-right">
                                                    <button className="col-lg-12 btn primary-control float-right" onClick={this.onUploadEmployee}>Upload</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {
                    showLoader && <ProgressLoader totalCount={totalCount} progressCount={progressCount} />
                }
            </React.Fragment>
        )
    }

    handleFileOpen = (e: any) => {
        var context = this;
        var files = e.target.files, f = files[0];
        var reader = new FileReader();
        reader.onload = function (e: any) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            var json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
            // console.log("json  => ", json);
            context.setState({ employees: json, totalCount: json.length }, () => {
                //context.onUpload({});
            })
        };
        reader.readAsArrayBuffer(f);
    }

    renderEmployeeTable = () => {
        return this.state.employees.map((item: any, index: number) => {
            return (<tr key={index}>
                {item['solId'] == '' || item['solId'] == undefined ? <td id={`solId_${index}`} className="table-danger">{item['solId']} <UncontrolledTooltip target={`solId_${index}`}>Check SOL ID!</UncontrolledTooltip></td> : <td>{item['solId']}</td>}
                {item['name'] == '' || item['name'] == undefined ? <td id={`name_${index}`} className="table-danger">{item['name']} <UncontrolledTooltip target={`name_${index}`}>Check name!</UncontrolledTooltip></td> : <td>{item['name']}</td>}
                {item['region'] == '' || item['region'] == undefined ? <td id={`region_${index}`} className="table-danger">{item['region']} <UncontrolledTooltip target={`region_${index}`}>Check region!</UncontrolledTooltip></td> : <td>{item['region']}</td>}
                {item['branchCategory'] == '' || item['branchCategory'] == undefined ? <td id={`branchCategory_${index}`} className="table-danger">{item['branchCategory']} <UncontrolledTooltip target={`branchCategory_${index}`}>Check region!</UncontrolledTooltip></td> : <td>{item['branchCategory']}</td>}
                {item['address'] == '' || item['address'] == undefined ? <td id={`address_${index}`} className="table-danger">{item['address']} <UncontrolledTooltip target={`address_${index}`}>Check address!</UncontrolledTooltip></td> : <td>{item['address']}</td>}
                {item['emailId'] == '' || item['emailId'] == undefined ? <td id={`emailId_${index}`} className="table-danger">{item['emailId']} <UncontrolledTooltip target={`emailId_${index}`}>Check email!</UncontrolledTooltip></td> : <td>{item['emailId']}</td>}
                {item['mobileNo'] == '' || item['mobileNo'] == undefined ? <td id={`mobileNo_${index}`} className="table-danger">{item['mobileNo']} <UncontrolledTooltip target={`mobileNo_${index}`}>Check mobile number!</UncontrolledTooltip></td> : <td>{item['mobileNo']}</td>}
                {item['contactNo'] == '' || item['contactNo'] == undefined ? <td id={`contactNo_${index}`} className="table-danger">{item['contactNo']} <UncontrolledTooltip target={`contactNo_${index}`}>Check contact number!</UncontrolledTooltip></td> : <td>{item['contactNo']}</td>}
                {item['cca'] == '' || item['cca'] == undefined ? <td id={`cca_${index}`} className="table-danger">{item['cca']} <UncontrolledTooltip target={`cca_${index}`}>Check CCA!</UncontrolledTooltip></td> : <td>{item['cca']}</td>}
                {item['hraOff'] == '' || item['hraOff'] == undefined ? <td id={`hraOff_${index}`} className="table-danger">{item['hraOff']} <UncontrolledTooltip target={`hraOff_${index}`}>Check officer HRA!</UncontrolledTooltip></td> : <td>{item['hraOff']}</td>}
                {item['hraEmp'] == '' || item['hraEmp'] == undefined ? <td id={`hraEmp_${index}`} className="table-danger">{item['hraEmp']} <UncontrolledTooltip target={`hraEmp_${index}`}>Check employee HRA!</UncontrolledTooltip></td> : <td>{item['hraEmp']}</td>}
                {item['type'] == '' || item['type'] == undefined ? <td id={`type_${index}`} className="table-danger">{item['type']} <UncontrolledTooltip target={`type_${index}`}>Check employee HRA!</UncontrolledTooltip></td> : <td>{item['type']}</td>}
                {item['isArchive'] === '' || item['isArchive'] === undefined ? <td id={`isArchive_${index}`} className="table-danger">{item['isArchive']} <UncontrolledTooltip target={`isArchive_${index}`}>Check isArchive!</UncontrolledTooltip></td> : <td>{item['isArchive'] === false ? "False" : "True"}</td>}
            </tr>)
        })
    }

    onValidateExcelData = () => {
        let valid = true;

        for (var item of this.state.employees) {

            if (item['solId'] == '' || item['solId'] == undefined) {
                valid = false;
                break;
            }

            if (item['name'] == '' || item['name'] == undefined) {
                valid = false;
                break;
            }

            if (item['region'] == '' || item['region'] == undefined) {
                valid = false;
                break;
            }

            if (item['address'] == '' || item['address'] == undefined) {
                valid = false;
                break;
            }

            if (item['emailId'] == '' || item['emailId'] == undefined) {
                valid = false;
                break;
            }

            if (item['mobileNo'] === '' || item['mobileNo'] == undefined) {
                valid = false;
                break;
            }

            if (item['contactNo'] === '' || item['contactNo'] == undefined) {
                valid = false;
                break;
            }
            if (item['cca'] === '' || item['cca'] == undefined) {
                valid = false;
                break;
            }


            // if (item['branchCategory'] == '' || item['branchCategory'] == undefined) {
            //     valid = false;
            //     break;
            // }

            if (item['hraOff'] === '' || item['hraOff'] == undefined) {
                valid = false;
                break;
            }

            if (item['hraEmp'] === '' || item['hraEmp'] == undefined) {
                valid = false;
                break;
            }

            if (item['type'] === '' || item['type'] == undefined) {
                valid = false;
                break;
            }

            if (item['isArchive'] === '' || item['isArchive'] === undefined) {
                valid = false;
                break;
            }

        }
        // console.log('is valid =', valid);
        return valid;
    }

    onUploadEmployee = async () => {
        const { employees } = this.state;
        const isValid = this.onValidateExcelData();
        // console.log("isValid  => ", isValid);

        if (isValid) {
            this.setState({ showLoader: true });
            const xl = employees.map((item: any) => {
                return {
                    soul: item['solId'],
                    name: item['name'],
                    locationId: item['region'],
                    address: item['address'],
                    email: item['emailId'],
                    mobile: item['mobileNo'],
                    contact: item['contactNo'],
                    cca: item['cca'],
                    branchCategoryId: item['branchCategory'],
                    hraOfficers: item['hraOff'],
                    hraClerical: item['hraEmp'],
                    officeTypeId: item['type'],
                    isArchive: item['isArchive']
                }
            });
            // console.log("xll mod ", xl);
            this.callAPI(xl);
        } else {
            alert('Please fix the issues with excel before uploading.');
        }

    }

    sleep = (ms: any) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    callAPI = async (employees: any) => {
        let self = this;
        let countPro = 0;

        for await (const data of employees) {
            // console.log("DATA  => ", data);
            try {
                countPro += 1;
                self.setState({ progressCount: countPro });

                await self.sleep(1);

                var status = true;

                let response = await addCompanyBranch(data)
                if (response.status == false) {
                    if (response.error.solid) {
                        alert(`Sol ID ${response.error.solid} already exists`);
                        status = false
                    }
                    else {
                        alert(`${response.error.detail}`);
                        status = false
                    }
                }

                if (!status) {
                    self.setState({ showLoader: false, progressCount: 0 })
                    break;
                }


                if (countPro === employees.length) {
                    self.setState({ showLoader: false, employees: [] });
                    //alert(`Employees were added successfully`);
                    this.props.history.push(CONSTANT.url.settingsOption.companyBranchList)
                }
            } catch (error) {
                console.log(error);
                countPro += 1;
                if (countPro === employees.length) {
                    self.setState({ showLoader: false, employees: [] });
                    alert(`Branches/Offices were added successfully`);
                }
            }
        }
    }

}

export default UploadEmployee;