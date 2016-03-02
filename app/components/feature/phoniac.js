import React from 'react';
import Helmet from "react-helmet";

import Feature from './feature.js';

let Phoniac = React.createClass({
    render() {
        return (
            <div>
                <Helmet
                    title="Phoniac"
                    meta={[
                        {"name": "description", "content": "Phoniac is an Android application for monitoring your phone usage. It is showing statistics of when and how much you actually use your phone. It is probably more than you think!"},
                        {"property": "og:title", "content": "Phoniac | mattec.se"},
                        {"property": "og:description", "content": "Phoniac is an Android application for monitoring your phone usage. It is showing statistics of when and how much you actually use your phone. It is probably more than you think!"}
                    ]}/>
                <Feature
                    title="Phoniac"
                    image="../img/phoniac_promo.jpg"
                    promoText="Phoniac is an Android application for monitoring your phone usage. It is showing statistics of when and how much you actually use your phone. It is probably more than you think!"
                    linkText="Phoniac on Google Play"
                    linkUrl="https://play.google.com/store/apps/details?id=se.mattec.phoniac"/>
            </div>
        )
    }
});

export default Phoniac;