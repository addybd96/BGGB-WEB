import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

function CustomChatbot(props) {
  const config = {
    width: "350px",
    height: "500px",
    floating: true
  };

  const theme = {
    background: "white",
    fontFamily: "Menlo",
    headerBgColor: "#6e48aa",
    headerFontColor: "#fff",
    headerFontSize: "25px",
    botBubbleColor: "#6e48aa",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4c4c4c"
  };


  const steps = [
    {
      id: "Greet",
      message: "Hello, Welcome to HR Helpdesk. How May I help you?",
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
      component: (
        <div> Last month salary slip </div>
      ),
      trigger: "ask again"
    },
    {
      id: "salary break up",
      component: (<div style={{ width: '100%' }}>
        <h3>Salary Breakdown</h3>
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
      </div>),
      trigger: "ask again"
    },
    {
      id: "salary cycle",
      message: "salary cycle is from 21st to 20 th",
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
        <div>  <a href=''>Leave Status</a> </div>
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
        <div> <a href=''>Leave Request</a> </div>
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
        <div>  <a href=''>Travel Policy</a> </div>
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
        <div>  <a href=''>Leave Policy</a> </div>
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
        <div>  <a href=''>Medical Policy</a> </div>
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
        <div>  <a href=''>Employee Code of Conduct Policy</a> </div>
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
      message: 'Please click below link to change password',
      trigger: "change password link"
    },
    {
      id: "change password link",
      component: (
        <div> <a href=''>Change Password</a> </div>
      ),
      trigger: "ask again"
    },
    {
      id: "wifi password",
      component: (
        <div style={{ width: '100%' }}>
          <h3>WiFi Password</h3>
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
        <div> <a href=''>Request PC or Laptop Support</a> </div>
      ),
      trigger: "ask again"
    },
    {
      id: "view technical support request",
      component: (
        <div style={{ width: '100%' }}>
          <h3>Previuos Requests</h3>
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
        <div> <a href=''>Mark Attendance</a> </div>
      ),
      trigger: "ask again"
    },

    {
      id: "report missing attendance",
      component: (
        <div> <a href=''>Report Missing Attendance</a> </div>
      ),
      trigger: "ask again"
    },

    {
      id: "salary slip",
      component: (
        <div> Last month salary slip </div>
      ),
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
        <div>  <a href=''>Reimbursement Status</a> </div>
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
        <div> <a href=''>Reimbursement Request</a> </div>
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
          trigger: "Done"
        }
      ]
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
          label: "Yes",
          trigger: () => {
            props.eventHandler("corn");
            return "Asking for Veggies in Pizza"
          }
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
          label: "Yes",
          trigger: () => {
            props.eventHandler("veggie");
            return "Done"
          }
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
  return (
    <ThemeProvider theme={theme}>
      <ChatBot

        //userAvatar="/home/nishul/Downloads/user.svg"
        headerTitle="HR Helpdesk"
        recognitionLang={"en"}
        speechSynthesis={{ enable: true, lang: 'en' }}
        recognitionEnable={true}
        recognitionPlaceholder={'Listening'}
        steps={steps} {...config} />
    </ThemeProvider>
  );
}
export default CustomChatbot;