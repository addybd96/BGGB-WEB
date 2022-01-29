import React from "react";

class SessionLogout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.events = [
            "load",
            "mousemove",
            "mousedown",
            "click",
            "scroll",
            "keypress"
        ];

        //this.warn = this.warn.bind(this);
        this.logout = this.logout.bind(this);
        this.resetTimeout = this.resetTimeout.bind(this);

        for (var i in this.events) {
            window.addEventListener(this.events[i], this.resetTimeout);
        }
        this.setTimeout();
    }

    clearTimeout() {
        // if (this.warnTimeout) {
        //     clearTimeout(this.warnTimeout);
        // }
        if (this.logoutTimeout) {
            clearTimeout(this.logoutTimeout);
        }
    }

    setTimeout() {
        //this.warnTimeout = setTimeout(this.warn, 299 * 1000);
        this.logoutTimeout = setTimeout(this.logout, 30 * 60 * 1000);
    }

    resetTimeout() {
        this.clearTimeout();
        this.setTimeout();
    }

    // warn() {
    //     if (window.location.href !== "http://localhost:3000/") {
    //         alert("You will be logged out automatically in 1 sec.");
    //     }
    // }

    logout() {
        if (window.location.href !== "http://localhost:3000/") {
            const urlNew = window.location.origin;
            window.location.href = urlNew.concat("/logout");
        }
        //this.destroy(); // Cleanup
    }

    destroy() {
        this.clearTimeout();
        for (var i in this.events) {
            window.removeEventListener(this.events[i], this.resetTimeout);
        }
    }
    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        );
    }
}

export default SessionLogout;