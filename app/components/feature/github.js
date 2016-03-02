import React from 'react';
import Helmet from "react-helmet";

import Feature from './feature.js';

let Github = React.createClass({
    render() {
        return (
            <div>
                <Helmet
                    title="GitHub"
                    meta={[
                        {"name": "description", "content": "Some of my personal projects, including this site, and coursework from KTH is available on my GitHub."},
                        {"property": "og:title", "content": "GitHub | mattec.se"},
                        {"property": "og:description", "content": "Some of my personal projects, including this site, and coursework from KTH is available on my GitHub."}
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