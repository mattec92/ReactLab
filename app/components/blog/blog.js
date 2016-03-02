import React from 'react';
import {Row, Col} from 'react-bootstrap';

import BlogSide from './blogside.js';

let Blog = React.createClass({
    render() {
        const styles = {
            container: {
                paddingTop: 64,
                width: '100%'
            },
            header: {
                padding: 50
            },
            entryContainer: {
                width: '100%',
                margin: 0,
                padding: 0
            },
            side: {}
        };

        return (
            <div
                style={styles.container}>
                {this.props.helmet}
                <Row
                    style={styles.entryContainer}>
                    <Col
                        sm={1}/>
                    <Col
                        sm={7}>
                        {this.props.main}
                    </Col>
                    <Col
                        sm={3}>
                        <BlogSide
                            style={styles.side}/>
                    </Col>
                    <Col
                        sm={1}/>
                </Row>
            </div>
        );
    }
});

export default Blog;