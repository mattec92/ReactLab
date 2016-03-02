import React from 'react';
import {Row, Col} from 'react-bootstrap';

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
            <Row
                style={styles.root}>
                <Col
                    sm={2}/>
                <Col
                    sm={4}>
                    <Card
                        imageDescription="Phoniac"
                        imageUrl="../img/phoniac_card.jpg"
                        title="Phoniac"
                        path="/phoniac"/>
                </Col>
                <Col
                    sm={4}>
                    <Card
                        imageDescription="GitHub"
                        imageUrl="../img/github_card.jpg"
                        title="GitHub"
                        path="/github"/>
                </Col>
                <Col
                    sm={2}/>
            </Row>
        );
    }
});

export default CardContainer;