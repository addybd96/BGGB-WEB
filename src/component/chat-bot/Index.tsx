import React from "react";
import { Link } from "react-router-dom";

import CONSTANT from "./../../constant";
import ChatBot from "react-simple-chatbot";
import { getCategory } from "./../../action/HelpdeskActions";
import defaultSteps from "./Steps";
const UserIcon = require("./../../assets/svg/use_bot.svg");
const SendIcon = require("./../../assets/svg/send.svg");
const BotIcon = require("./../../assets/svg/bot.svg");

class CustomChatbot extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpened: false,
      categories: [],
      config: {
        width: "350px",
        height: "500px",
        floating: true
      },
      steps: defaultSteps
    };
  }

  componentDidMount() {
    // getCategory().then((response: any) => {
    //   // console.log("cat response  => ", response);
    //   this.setState({ categories: response.result });
    //   let resArr: any = [];
    //   let res = response.result.map((item: any) => {
    //     let resItem = {
    //       value: item.name,
    //       label: item.name,
    //       trigger: "helpdesk desc"
    //     };
    //     resArr.push(resItem);
    //   });
    //   var index = this.state.steps.findIndex(
    //     (x: any) => x.id === "helpdesk ticket options"
    //   );
    //   if (index === -1) {
    //     // handle error
    //   } else
    //     this.setState(
    //       {
    //         steps: [
    //           ...this.state.steps.slice(0, index),
    //           Object.assign({}, this.state.steps[index], {
    //             id: "helpdesk ticket options",
    //             options: resArr
    //           }),
    //           ...this.state.steps.slice(index + 1)
    //         ]
    //       },
    //       () => {
    //         // console.log("adasdasdasd   ", this.state.steps)
    //       }
    //     );
    //   // console.log("resArr  ", resArr)
    // });
  }

  onBotEventClick = (e: any) => {
    this.setState({ isOpened: false });
  };

  onRefreshEventClick = (e: any) => {
    localStorage.removeItem("rsc_cache");
    window.location.reload();
  };

  mytoggleFunction = (e: any) => {
    this.setState({ isOpened: true });
  };

  render() {
    const { isOpened, config, steps } = this.state;
    const bubbleStyleOptions = {
      fontSize: "12px",
      fontFamily: "Muli",
      backgroundColor: "white",
      border: "1px solid #1a237e",
      color: "#1a237e"
    };
    return (
      <ChatBot
        eventHandler={this.onBotEventClick}
        userAvatar={UserIcon}
        botAvatar={BotIcon}
        cache={true}
        submitButtonStyle={{}}
        headerComponent={
          <div className="contact-profile">
            <img src={BotIcon} alt="" />
            <span>HR Helpdesk</span>
            <div className="social-media">
              <i
                className="fa fa-refresh refresh-icon rsc-header-close-button"
                aria-hidden="true"
                onClick={this.onRefreshEventClick}
              ></i>
              <i
                className="fa fa-times rsc-header-close-button"
                aria-hidden="true"
                onClick={this.onBotEventClick}
              ></i>
            </div>
          </div>
        }
        bubbleOptionStyle={bubbleStyleOptions}
        toggleFloating={this.mytoggleFunction}
        opened={isOpened}
        floatingStyle={{ backgroundColor: "#1a237e" }}
        //speechSynthesis={{ enable: true, lang: "en" }}
        recognitionEnable={true}
        //contentStyle={{ backgroundColor: "#E6E6EA" }}
        recognitionLang={"en"}
        placeholder={"Send Text..."}
        //enableSmoothScroll={true}
        recognitionPlaceholder={"Listening"}
        steps={steps}
        {...config}
      />
    );
  }
}

export default CustomChatbot;
