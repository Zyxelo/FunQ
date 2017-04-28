import React from 'react'
import Recaptcha from 'react-recaptcha'


class ReCaptcha extends React.Component {


    render() {
        return (
            <div id = "captcha">

                <Recaptcha render="explicit"
                           sitekey="6LdOKx8UAAAAAH93hUwxSlTqGF8Ef6a69KMbAdRs"
                           onloadCallback={console.log.bind(this, "recaptcha loaded")}
                />
            </div>

        )
    }
}

export default ReCaptcha;
