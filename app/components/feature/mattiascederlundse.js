import React from 'react';
import Helmet from "react-helmet";

import Feature from './feature.js';

let Phoniac = React.createClass({
    render() {
        return (
            <div>
                <Helmet
                    title="mattiascederlund.se"
                    meta={[
                        {"name": "description", "content": "mattiascederlund.se is a static website built using Bootstrap, hosted on Google App Engine. Its main purpose is to provide contact information and link to my personal projects."},
                        {"property": "og:title", "content": "mattiascederlund.se | mattec.se"},
                        {"property": "og:description", "content": "mattiascederlund.se is a static website built using Bootstrap, hosted on Google App Engine. Its main purpose is to provide contact information and link to my personal projects."}
                    ]}/>
                <Feature
                    title="mattiascederlund.se"
                    image="../img/mattiascederlund_se_promo.jpg"
                    promoText="mattiascederlund.se is a static website built using Bootstrap, hosted on Google App Engine. Its main purpose is to provide contact information and link to my personal projects."
                    linkText="mattiascederlund.se"
                    linkUrl="http://mattiascederlund.se"/>
            </div>
        )
    }
});

export default Phoniac;