import React from 'react';
import Feature from './feature.js';

let Github = React.createClass({
    render() {
        return (
            <Feature
                title="Github"
                image="img/github_promo.jpg"
                promoText="Some of my personal projects, including this site, and course work from KTH is available at my GitHub."
                linkText="Mattias Cederlund on GitHub"
                linkUrl="https://github.com/mattec92"/>
        )
    }
});

export default Github;