import axios from 'axios';
import { Row, Col } from 'react-bootstrap'
import { Component } from 'react';
import Card from '../../components/Card';

export default class LandingPageFeaturedShillers extends Component {
    getShillersLink = "http://localhost:5000/shiller/";

    // constructor(props) {
    //     super(props);
    //     this.state = { shillers: [] };
    // }

    // componentDidMount() {
    //     axios
    //         .get(`${process.env.REACT_APP_SERVER_URI}/api/auth/getUsers`)
    //         .then((response) => {
    //             console.log(response.data)
    //             var newData = JSON.parse(response.data)
    //             this.setState({ shillers: newData })
    //         })
    //         .catch(function (error) { 
    //             console.log(error);
    //         });
    // }
    shillers = [
        { _id: 0, name: 'Britney Spears', username: '@bspears'},
        { _id: 1, name: 'Donald Trump', username: '@bspears'},
        { _id: 2, name: 'Elon Musk', username: '@bspears'},
        { _id: 3, name: 'Oprah Winfrey', username: '@bspears'},
        { _id: 4, name: 'Tom Tan', username: '@bspears'},
        { _id: 5, name: 'Bob Ban', username: '@bspears'},
    ];

    shillerCards() {
        return this.shillers.map((shiller) => {
            return (
                <Col key={shiller._id} sm={6} md={4} lg={3}>
                    <Card 
                        shiller={shiller}
                    />
                </Col>
            );
        });
    }

    render() {
        return (
            <Row style={{width: '100%'}}>
                {this.shillerCards()}
            </Row>
        );
    }
}