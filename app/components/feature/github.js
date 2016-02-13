import React from 'react';
import Feature from './feature.js';
import Helmet from "react-helmet";

let Github = React.createClass({
    render() {
        return (
            <div>
                <Helmet
                    title="GitHub"
                    meta={[
                    ]}/>
                <Feature
                    title="Github"
                    image="../img/github_promo.jpg"
                    promoText="Some of my personal projects, including this site, and coursework from KTH is available on my GitHub."
                    linkText="Mattias Cederlund on GitHub"
                    linkUrl="https://github.com/mattec92"/>
            </div>
        )
    }
});

export default Github;