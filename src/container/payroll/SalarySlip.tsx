import moment from 'moment';
import * as React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import CONSTANT from '../../constant';

import Loader from '../../component/common/Loader'
import { savePDF } from '@progress/kendo-react-pdf';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import { getSalarySlip } from '../../action/PayrollCycleAction';
import { align } from '@progress/kendo-drawing/dist/npm/alignment';

class ComponentName extends React.Component<any, any> {
    table: HTMLElement | any;

    constructor(props: any) {
        super(props);
        this.state = {
            slip: undefined,
            lop: undefined,
            showLoader: false,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        this.onLoad()

    }

    public render() {
        const { slip, lop, date, showLoader } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">

                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="example-config float-right">
                                        <button className="btn btn-secondary" onClick={this.exportPDF}>Export PDF</button>
                                    </div>
                                </div>

                                <div className="card-body payslip-body">
                                    {slip === undefined &&
                                        <div id="payslip" className="text-center"><h5>Loading...</h5> </div>
                                    }
                                    {slip !== undefined && slip === null &&
                                        <div id="payslip" className="text-center"><h5>No records found</h5> </div>
                                    }
                                    {slip &&
                                        <div id="payslip" ref={(table) => { this.table = table; }}>
                                            <div>
                                                <div className="left-panel1">
                                                    <img src={require('../../assets/images/logo/logo.png')}
                                                        style={{ height: "90px", float: "left", marginRight: '20px' }} />
                                                </div>
                                                <div id="title" style={{textAlign:"center"}}>Baroda Gujarat Gramin Bank<p>Pay Slip</p></div>
                                            </div>
                                            <div className="content1">
                                                <div className="left-panel1">
                                                    <div id="employee">
                                                        <div id="name"> {slip.name}	</div>
                                                        <div id="email"> {slip.email}</div>
                                                    </div>
                                                    <div className="details1">
                                                        <div className="entry1">
                                                            <div className="label1">Employee Code</div>
                                                            <div className="value1">{slip.employeeId}</div>
                                                        </div>


                                                        <div className="entry1">
                                                            <div className="label1">Bank Name</div>
                                                            <div className="value1">Baroda Gujarat Gramin Bank</div>
                                                        </div>

                                                        <div className="entry1">
                                                            <div className="label1">Designation</div>
                                                            <div className="value1">{slip.designation}</div>
                                                        </div>
                                                        <div className="entry1">
                                                            <div className="label1">Pan Card NO.</div>
                                                            <div className="value1">{slip.documentNumber}</div>
                                                        </div>

                                                        <div className="entry1">
                                                            <div className="label1">Pay Cycle</div>
                                                            <div className="value1">{moment(slip.date).startOf('month').format('MMM Do')} - {moment(slip.date).endOf('month').format('MMM Do YYYY')}</div>
                                                        </div>
                                                        <div className="entry1">
                                                            <div className="label1">{lop.length > 0 ? 'Total Days - LOP' : "Total Days"}</div>
                                                            <div className="value1">{lop.length > 0 ? parseInt(moment(slip.date).endOf('month').format('D')) - parseInt(lop.length) : moment(slip.date).endOf('month').format('D')} Days</div>
                                                        </div>

                                                        <div className="right-panel1">
                                                            <div className="details1">
                                                                {lop.length > 0 &&
                                                                    <div className="salary1">
                                                                        <div className="entry1">
                                                                            <div className="label1">LOP</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1"></div>
                                                                        </div>
                                                                        {lop.length > 0 && lop.map((lp: any) => {
                                                                            return (
                                                                                <div className="withholding_tax1">
                                                                                    <div className="entry1">
                                                                                        <div className="label1"><div>Month</div><div>Amount</div><div>Leave Type</div></div>
                                                                                        <div className="amount1"><div>{moment(lp.date).format('MMM Do YYYY')}</div><div>{lp.net}</div><div>{lp.leaveType}</div></div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                        }
                                                                    </div>
                                                                }
                                                                <br />
                                                                <div className="salary1">
                                                                    <div className="entry1">
                                                                        <div className="label1">Salary Component</div>
                                                                        <div className="detail1"></div>
                                                                        <div className="rate1"></div>
                                                                        <div className="amount1"></div>
                                                                    </div>


                                                                    <div className="nti1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Allowance</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Basic</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.basic}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">PQP</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.pqp}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">SP. Pay</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.sppay}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">D.A</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.da}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">HRA</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.hra}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">CCA</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.cca}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">SP. Allowance </div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.spAllow}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Handicap Allowance </div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.officAmount}</div>
                                                                         </div>
                                                                     </div>
 
                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Conveyance Allowance </div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.convAmount}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Washing Allowance  </div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.washingAmount}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Cycle Allowance  </div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.cycleAmount}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Arrears / D.A ARR.  </div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.errAmount}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Subsistence </div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.subsistenceAmount}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Gross Salary</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.totalAllow}</div>
                                                                        </div>
                                                                    </div>


                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1"></div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1"></div>
                                                                        </div>
                                                                    </div>
                                                                    <br />
                                                                    <div className="nti1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Deduction</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>

                                                                        </div>
                                                                    </div>
                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">PROV. FUND</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.prov}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">NPS</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.nps}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">L.I.C </div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.lifeInsurance}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">PROF. Tax</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.profTax}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Welfare Association</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.societyAmount}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Festival Adv.</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.festivalAd}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1"> Group Insu.</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.gpAmount}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Income Tax</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.inctAmount}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Welfare Fund</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.welfareAmount}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1"> Union Fee</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.unionAmount}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1"> Housing Loan</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.hsAmount}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Vehicle Loan</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.vehAmount}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Consumer Loan</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.conAmount}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Covid Loan</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.covidAmount}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Other Deduction</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.otherDeduction}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="withholding_tax1">
                                                                        <div className="entry1">
                                                                            <div className="label1">Total</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.totalDeduc}</div>
                                                                        </div>
                                                                    </div>


                                                                    <div className="net_pay1">
                                                                        <div className="entry1">
                                                                            <div className="label1">NET PAY</div>
                                                                            <div className="detail1"></div>
                                                                            <div className="rate1"></div>
                                                                            <div className="amount1">{slip.net}</div>
                                                                        </div>
                                                                    </div>
                                                                   


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                {showLoader && <Loader />}
            </React.Fragment >
        )
    }

    exportPDF = () => {
        const elelmetn: HTMLElement | any = ReactDOM.findDOMNode(this.table)
        savePDF(elelmetn, {
            repeatHeaders: false,
            paperSize: 'A4',
            margin: '0cm',
            date: new Date(),
            fileName: `${this.state.slip ? this.state.slip.employeeId : ''}-salary-slip`,
            scale: 0.7
        });
    }


    onLoad = () => {
        const q: any = queryString.parse(this.props.location.search);
        this.setState({ showLoader: true })
        getSalarySlip(q.id, q.date).then((res: any) => {
            this.setState({ showLoader: false })
            if (res)
                this.setState({ slip: res.result.slip, lop: res.result.lop });
        })
    }

}

export default ComponentName;


