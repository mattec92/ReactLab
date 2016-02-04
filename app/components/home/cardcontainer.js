import React from 'react';
import Card from './card.js';

let CardContainer = React.createClass({
    render() {
        const styles = {
            root: {
                width: '100%',
                padding: '50px 50px 0px 50px'
            }
        };

        return (
            <div
                style={styles.root}
                className="row">
                <div
                    className="col-sm-2"/>
                <Card
                    imageDescription="Phoniac logo"
                    imageUrl="img/phoniac500x500.jpg"
                    title="Phoniac"
                    path="/phoniac"/>
                <Card
                    imageDescription="GitHub logo"
                    imageUrl="img/octocat500x500.jpg"
                    title="GitHub"
                    path="/github"/>

                <div
                    className="col-sm-2"/>
            </div>
        );
    }
});

export default CardContainer;