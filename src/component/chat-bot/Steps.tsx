import React from "react";
import { Link } from "react-router-dom";
import CONSTANT from "./../../constant";
import { getCategory, getSubCategory, addTicket } from "./../../action/HelpdeskActions";
const BotIcon = require("./../../assets/svg/bot.svg");

class HelpDeskCategory extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: true,
      result: undefined,
      trigger: false
    };
  }

  componentWillMount() {
    getCategory().then((res: any) => {
      //   const options = res.result.map((i: any) => {
      //     return { value: i.name, label: i.name, trigger: "helpdesk desc" };
      //   });
      this.setState({ result: res.result });
    });
  }

  render() {
    const { result } = this.state;
    return (
      <div>
        {result === undefined ? (
          <div>Loading...</div>
        ) : (
          <div className="rsc-os">
            <ul className="rsc-os-options">
              {result.map((item: any, index: number) => {
                return (
                  <li className="rsc-os-option">
                    <button
                      key={index}
                      data-id={item.id}
                      onClick={this.onCategoryClick}
                      className="hilesr rsc-os-option-element"
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }

  onCategoryClick = (e: any) => {
    const categoryId = e.target.dataset.id;
    sessionStorage.setItem('helpdesk_category', categoryId);
    this.props.triggerNextStep({
      trigger: "helpdesk sub-cat options",
      value: categoryId
    });
  };
}

class HelpDeskSubCategory extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      result: undefined,
      trigger: false
    };
  }

  componentWillMount() {
    console.log("message1", this.props);
    getSubCategory(this.props.previousStep.value).then((res: any) => {
      //   const options = res.result.map((i: any) => {
      //     return { value: i.name, label: i.name, trigger: "helpdesk desc" };
      //   });
      this.setState({ result: res.result });
    });
  }

  render() {
    const { result } = this.state;
    return (
      <div>
        {result === undefined ? (
          <div>Loading...</div>
        ) : (
          <div className="rsc-os">
            <ul className="rsc-os-options">{result.map((item: any, index: number) => {
                return (
                  <li className="rsc-os-option "  
                  style= {{
                  marginBottom : "2px",
                  fontSize: "12px",
                  fontFamily: "Muli"}} >
                    <button
                      key={index}
                      data-id={item.id}
                      onClick={this.onCategoryClick}
                      className="hilesr rsc-os-option-element"
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}</ul>
          </div>
        )}
      </div>
    );
  }

  onCategoryClick = (e: any) => {
    const categoryId = e.target.dataset.id;
    sessionStorage.setItem('helpdesk_subCategory', categoryId);
    console.log("HRD",sessionStorage.getItem('helpdesk_category'))
    const botEvent = this.props.triggerNextStep({
      trigger: "helpdesk subject",
      value:categoryId
    });
  };
}

class HelpDeskTicketResponse extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      result: undefined,
      trigger: false,
      //nextTriggered: false
    };
  }

  componentWillMount() {
    let ticketResponse = sessionStorage.getItem("ticketResponse");
    ticketResponse = "Your Helpdesk ticket has been generated, yout ticket ID is "+ticketResponse+". You can check the status in the below link." ;
    this.setState({ticketResponse})
  }

  render() {
    const { result } = this.state;
    return (
      <div className="rsc-os">
            {this.state.ticketResponse}
      </div>
    );
  }


  //nextTriggered = false

  // componentDidMount(){
    

  //   if(!this.nextTriggered)
  //   {
  //     const botEvent = this.props.triggerNextStep({
  //       trigger: "ticket status link"
  //     });
  //     this.nextTriggered = true;
  //   }
    
  // }
}


const defaultSteps =  [
  {
    id: "Greet",
    message: "Hello, Welcome to HR Helpdesk. How May I help you???",
    trigger: "FirstOptions"
  },
  {
    id: "FirstOptions",
    message: "Please select what you are looking for",
    trigger: "Displaying options all"
  },
  // {
  //    id: "Waiting user input for name",
  //    user: true,
  //    trigger: "Asking options to eat"
  // },
  // {
  //    id: "Asking options to eat",
  //    message: "Hi {previousValue}, Please click on what you want to eat!",
  //    trigger: "Displaying options to eat"
  // },
  {
    id: "Displaying options all",
    options: [
      {
        value: "payroll",
        label: "Payroll",
        trigger: "payroll"
      },
      {
        value: "leaves",
        label: "Leaves",
        trigger: "leaves"
      },
      {
        value: "attendance",
        label: "Attendance",
        trigger: "attendance"
      },
      {
        value: "reimbursement",
        label: "Reimbursement",
        trigger: "reimbursement"
      },
      {
        value: "company policies support",
        label: "Company Policies Support",
        trigger: "company policies support"
      },
      {
        value: "raise helpdesk ticket",
        label: "Raise Helpdesk Ticket",
        trigger: "raise helpdesk ticket"
      },
      {
        value: "helpdesk ticket status",
        label: "Helpdesk Ticket Status",
        trigger: "helpdesk ticket status"
      },
      {
        value: "technical support",
        label: "Technical Support",
        trigger: "technical support"
      },
      {
        value: "others",
        label: "Others",
        trigger: "other"
      }
    ]
  },
  {
    id: "helpdesk ticket status",
    message: "Please enter your ticket ID.",
    trigger: "helpdesk ticket id"
  },
  {
    id: "helpdesk ticket id",
    user: true,
    trigger: "ticket status"
  },
  {
    id: "ticket status",
    message:
      "Your Ticket has been assigned to IT Dept. They'll be working to resolve it.You can view your previous Helpdesk Ticket satus in the below link.",
    trigger: "ticket status link"
  },
  {
    id: "raise helpdesk ticket",
    message: "Please Select from {previousValue}",
    trigger: "helpdesk ticket options"
  },
  {
    id: "helpdesk ticket options",
    component: <HelpDeskCategory />,
    waitAction: true
  },
  {
    id: "helpdesk sub-cat",
    message: "You've selected {previousValue}",
    trigger: "helpdesk sub-cat options"
  },
  {
    id: "helpdesk sub-cat options",
    component: <HelpDeskSubCategory />,
    waitAction: true,
    trigger:"helpdesk subject"
  },
  {
    id: "helpdesk subject",
    message: "Please write the subject",
    trigger: "wait for subject"
  },
  {
    id: "wait for subject",
    user: true,
    placeholder:"Write the subject",
    validator: (value: any) => {
      // if (isNaN(value)) {
      //   return 'field should be a number';
      // }

    sessionStorage.setItem('helpdesk_subject', value);
      
      if (value.length === 0) {
        return "field cannot be empty";
      }
      return true;
    },
    trigger:"helpdesk desc" 

    // trigger: () => {
    //   props.eventHandler("helpdesk_subject");
    //   return "helpdesk desc" 
    // }
  },
  {
    id: "helpdesk desc",
    message: "Please write the description",
    trigger: "wait for desc"
  },
  {
    id: "wait for desc",
    user: true,
    placeholder:"Write the description",
    validator: (value: any) => {
      // if (isNaN(value)) {
      //   return 'field should be a number';
      // }
      let subj = sessionStorage.getItem('helpdesk_subject');
      let cat = sessionStorage.getItem('helpdesk_category');
      let subCat = sessionStorage.getItem('helpdesk_subCategory');

      let payload = {
        subject: subj,
        categoryId: cat,
        subCategoryId: subCat,
        description: value,
      }


      addTicket(payload).then((res:any)=> {
        let ticketResponse = res.result.id;
        console.log("ticketResponse",ticketResponse);
        sessionStorage.setItem("ticketResponse",ticketResponse);
      })

      if (value.length === 0) {
        return "field cannot be empty";
      }
      return true;
    },
    trigger: "ticket generation"
  },
  {
    id: "ticket generation",
    component: <HelpDeskTicketResponse />,
    //avatar: {BotIcon},
    trigger: "ticket status link"
  },
  {
    id: "ticket status link",
    component: (
      <div>
        <Link to={CONSTANT.url.leaveHistory}>Helpdesk Status</Link>
      </div>
    ),
    trigger: "ask again"
  },
  {
    id: "payroll",
    message: "Please Select from {previousValue}",
    trigger: "payroll options"
  },
  {
    id: "payroll options",
    options: [
      {
        value: "salary slip",
        label: "Salary Slip",
        trigger: "salary slip"
      },
      {
        value: "salary break up",
        label: "Salary Break Up",
        trigger: "salary break up"
      },
      {
        value: "salary cycle",
        label: "Salary Cycle",
        trigger: "salary cycle"
      },
      {
        value: "salary deduction",
        label: "Salary Deduction",
        trigger: "salary deduction"
      }
    ]
  },

  {
    id: "salary slip",
    component: <div> Last month salary slip </div>,
    trigger: "ask again"
  },
  {
    id: "salary break up",
    component: (
      <div style={{ width: "100%" }}>
        <h6>Salary Breakdown</h6>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>Nishul</td>
            </tr>
            <tr>
              <td>Basic Pay</td>
              <td>30000</td>
            </tr>
            <tr>
              <td>EPF</td>
              <td>3500</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>33500</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    trigger: "ask again"
  },
  {
    id: "salary cycle",
    message: "salary cycle is from 21st to 20th",
    trigger: "ask again"
  },
  {
    id: "salary deduction",
    message: "For which month salary deduction you are enquiring about",
    trigger: "ask again"
  },

  {
    id: "leaves",
    message: "Please select from {previousValue}",
    trigger: "leaves_option"
  },

  {
    id: "leaves_option",
    options: [
      {
        value: "leave status",
        label: "Leave Status",
        trigger: "leave status"
      },
      {
        value: "leave request",
        label: "Leave Request",
        trigger: "leave request"
      }
    ]
  },

  {
    id: "leave status",
    message: "Please click the below link to check your leave request status",
    trigger: "leave status link"
  },

  {
    id: "leave status link",
    component: (
      <div>
        <Link to={CONSTANT.url.leaveHistory}>Leave Status</Link>
      </div>
    ),
    trigger: "ask again"
  },

  {
    id: "leave request",
    message: "Please apply for leave request on the below link",
    trigger: "leave request link"
  },
  {
    id: "leave request link",
    component: (
      <div>
        <Link to={CONSTANT.url.applyLeave}>Leave Request</Link>
      </div>
    ),
    trigger: "ask again"
  },

  {
    id: "company policies support",
    message: "Please select from {previousValue}",
    trigger: "company_policies_option"
  },

  {
    id: "company_policies_option",
    options: [
      {
        value: "travel policy",
        label: "Travel Policy",
        trigger: "travel policy"
      },
      {
        value: "leave policy",
        label: "Leave Policy",
        trigger: "leave policy"
      },
      {
        value: "medical policy",
        label: "Medical Policy",
        trigger: "medical policy"
      },
      {
        value: "ECC policy",
        label: "Employee Code of Conduct Policy",
        trigger: "ECC policy"
      }
    ]
  },

  {
    id: "travel policy",
    message: "Please click the below link to check {previousValue}",
    trigger: "travel policy link"
  },

  {
    id: "travel policy link",
    component: (
      <div>
        <a href="">Travel Policy</a>
      </div>
    ),
    trigger: "ask again"
  },

  {
    id: "leave policy",
    message: "Please click the below link to check {previousValue}",
    trigger: "leave policy link"
  },

  {
    id: "leave policy link",
    component: (
      <div>
        <a href="">Leave Policy</a>
      </div>
    ),
    trigger: "ask again"
  },
  {
    id: "medical policy",
    message: "Please click the below link to check {previousValue}",
    trigger: "medical policy link"
  },

  {
    id: "medical policy link",
    component: (
      <div>
        <a href="">Medical Policy</a>
      </div>
    ),
    trigger: "ask again"
  },
  {
    id: "ECC policy",
    message: "Please click the below link to check {previousValue}",
    trigger: "ECC policy link"
  },

  {
    id: "ECC policy link",
    component: (
      <div>
        <a href="">Employee Code of Conduct Policy</a>
      </div>
    ),
    trigger: "ask again"
  },

  {
    id: "other",
    message: "Please select from {previousValue}",
    trigger: "other options"
  },
  {
    id: "other options",
    options: [
      {
        value: "change password",
        label: "Change Password",
        trigger: "change password"
      },
      {
        value: "wifi password",
        label: "WiFi Password",
        trigger: "wifi password"
      }
    ]
  },
  {
    id: "change password",
    message: "Please click below link to change password",
    trigger: "change password link"
  },
  {
    id: "change password link",
    component: (
      <div>
        <Link to={CONSTANT.url.changePassword}>Change Password</Link>
      </div>
    ),
    trigger: "ask again"
  },
  {
    id: "wifi password",
    component: (
      <div style={{ width: "100%" }}>
        <h6>WiFi Password</h6>
        <table>
          <tbody>
            <tr>
              <td>MTC_IT</td>
              <td>$mount$000</td>
            </tr>
            <tr>
              <td>MTC_Basemet</td>
              <td>#mount#010</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    trigger: "ask again"
  },

  {
    id: "technical support",
    message: "Please select from {previousValue}",
    trigger: "technical support options"
  },
  {
    id: "technical support options",
    options: [
      {
        value: "request support",
        label: "Request PC or Laptop Support",
        trigger: "request support"
      },
      {
        value: "view technical support request",
        label: "View Previous Request",
        trigger: "view technical support request"
      }
    ]
  },
  {
    id: "request support",
    component: (
      <div>
        <a href="">Request PC or Laptop Support</a>
      </div>
    ),
    trigger: "ask again"
  },
  {
    id: "view technical support request",
    component: (
      <div style={{ width: "100%" }}>
        <h6>Previuos Requests</h6>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>Lenovo Laptop</td>
            </tr>
            <tr>
              <td>Issue</td>
              <td>Microsoft Office not working</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>22 Jan 2019</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>Not done</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    trigger: "ask again"
  },
  {
    id: "attendance",
    message: "Please select from {previousValue}",
    trigger: "attendance options"
  },
  {
    id: "attendance options",
    options: [
      {
        value: "mark attendace",
        label: "Mark Attendace",
        trigger: "mark attendace"
      },
      {
        value: "report missing attendance",
        label: "Report Missing Attendance",
        trigger: "report missing attendance"
      }
    ]
  },

  {
    id: "mark attendace",
    component: (
      <div>
        <Link to={CONSTANT.url.attendance}>Mark Attendance</Link>
      </div>
    ),
    trigger: "ask again"
  },

  {
    id: "report missing attendance",
    component: (
      <div>
        <Link to={CONSTANT.url.attendance}>Report Missing Attendance</Link>
      </div>
    ),
    trigger: "ask again"
  },

  {
    id: "salary slip",
    component: <div> Last month salary slip </div>,
    trigger: "ask again"
  },
  {
    id: "reimbursement",
    message: "Please select your {previousValue} query",
    trigger: "reimbursement_option"
  },

  {
    id: "reimbursement_option",
    options: [
      {
        value: "reimbursement status",
        label: "Reimbursement Status",
        trigger: "reimbursement status"
      },
      {
        value: "reimbursement request",
        label: "Reimbursement Request",
        trigger: "reimbursement request"
      }
    ]
  },

  {
    id: "reimbursement status",
    message: "Please click the below link to check your reimbursement status",
    trigger: "reimbursement status link"
  },

  {
    id: "reimbursement status link",
    component: (
      <div>
        <a href="">Reimbursement Status</a>
      </div>
    ),
    trigger: "ask again"
  },

  {
    id: "reimbursement request",
    message: "Please apply for reimbursement on the below link",
    trigger: "reimbursement request link"
  },
  {
    id: "reimbursement request link",
    component: (
      <div>
        <a href="">Reimbursement Request</a>
      </div>
    ),
    trigger: "ask again"
  },

  {
    id: "ask again",
    message: "Do you have any further queries?",
    trigger: "ask again confirmation"
  },

  {
    id: "ask again confirmation",
    options: [
      {
        value: true,
        label: "Yes",
        trigger: "FirstOptions"
      },
      {
        value: "false",
        label: "No",
        trigger: "Start again"
      }
    ]
  },
  {
    id: "Start again",
    options: [
      {
        value: true,
        label: "I have another query",
        trigger: "FirstOptions"
      }
    ],
    trigger: "FirstOptions"
  },
  {
    id: "Asking for Corn in Pizza",
    message: "Would you like to have corn in your pizza",
    trigger: "Adding Corn in Pizza"
  },

  {
    id: "Adding Corn in Pizza",
    options: [
      {
        value: true,
        label: "Yes"
        // trigger: () => {
        // //   props.eventHandler("corn");
        //   return "Asking for Veggies in Pizza";
        // }
      },
      {
        value: "false",
        label: "No",
        trigger: "Asking for Veggies in Pizza"
      }
    ]
  },

  {
    id: "Asking for Veggies in Pizza",
    message: "Would you like to have veggies in your pizza",
    trigger: "Adding Veggies in Pizza"
  },

  {
    id: "Adding Veggies in Pizza",
    options: [
      {
        value: true,
        label: "Yes"
        // trigger: () => {
        // //   props.eventHandler("veggie");
        //   return "Done";
        // }
      },
      {
        value: "false",
        label: "No",
        trigger: "Done"
      }
    ]
  },
  {
    id: "Done",
    message: "Have a great day !!",
    end: true
  }
];

export default defaultSteps;
