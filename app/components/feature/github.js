import React from 'react';
import Feature from './feature.js';

let Github = React.createClass({
    render() {
        return (
            <Feature
                title="Github"
                image=""
                logo="img/github_logo.png"
                promoText="View my GitHub profile and the source code of this site."
                linkText="Mattias Cederlund on GitHub"
                linkUrl="https://github.com/mattec92"
                />
        )
    }
});

export default Github;