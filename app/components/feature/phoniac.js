import React from 'react';
import Feature from './feature.js';

let Phoniac = React.createClass({
    render() {
        return (
            <Feature
                title="Phoniac"
                image="../img/phoniac_promo.jpg"
                promoText="Phoniac is an Android application for monitoring your phone usage. It is showing statistics of when and how much you actually use your phone. It is probably more than you think!"
                linkText="Phoniac on Google Play"
                linkUrl="https://play.google.com/store/apps/details?id=se.mattec.phoniac"/>
        )
    }
});

export default Phoniac;