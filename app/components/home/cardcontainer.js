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
                    imageDescription="Phoniac"
                    imageUrl="../img/phoniac_card.jpg"
                    title="Phoniac"
                    path="/phoniac"/>
                <Card
                    imageDescription="GitHub"
                    imageUrl="../img/github_card.jpg"
                    title="GitHub"
                    path="/github"/>

                <div
                    className="col-sm-2"/>
            </div>
        );
    }
});

export default CardContainer;