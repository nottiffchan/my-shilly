import axios from 'axios';
import { Row, Col } from 'react-bootstrap'
import { Component } from 'react';
import Card from '../../components/Card';

export default class LandingPageFeaturedTokens extends Component {
    getTokensLink = "http://localhost:5000/token/";

    constructor(props) {
        super(props);
        this.state = { tokens: [] };
    }

    componentDidMount() {
        axios
            .get(this.getTokensLink)
            .then((response) => {
                this.setState({ tokens: response.data })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    tokenCards() {
        return this.state.tokens.map((token) => {
            return (
                <Col key={token._id} sm={6} md={4} lg={3}>
                    <Card 
                        token={token}
                    />
                </Col>
            );
        });
    }

    render() {
        return (
            <Row style={{width: '100%'}}>
                {this.tokenCards()}
            </Row>
        );
    }
}