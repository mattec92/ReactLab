import React from 'react';
import Feature from './feature.js';

let Phoniac = React.createClass({
    render() {
        return (
            <Feature
                title="Phoniac"
                image=""
                logo="img/phoniac_logo.png"
                promoText="Get my Android app - Phoniac - on Google Play."
                linkText="Phoniac on Google Play"
                linkUrl="https://play.google.com/store/apps/details?id=se.mattec.phoniac" />
        )
    }
});

export default Phoniac;