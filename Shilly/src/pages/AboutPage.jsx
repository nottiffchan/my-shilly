import { Row, Col } from "react-bootstrap"

const AboutPage = () => {
    return (
        <div style={{width: '1200px', marginLeft: 'auto', marginRight: 'auto'}}>
            <Row style={{height: '200px'}}>
                <Col xl={3} lg={4} md={6} style={{backgroundColor: 'red'}}></Col>
                <Col xl={3} lg={4} md={6} style={{backgroundColor: 'green'}}></Col>
                <Col xl={3} lg={4} md={6} sm={12} style={{backgroundColor: 'blue'}}></Col>
                <Col xl={3} lg={4} md={6} sm={12} style={{backgroundColor: 'pink'}}></Col>
                <Col xl={3} lg={4} md={6} sm={12} style={{backgroundColor: 'orange'}}></Col>
                <Col xl={3} lg={4} md={6} sm={12} style={{backgroundColor: 'pink'}}></Col>
                <Col xl={3} lg={4} md={6} sm={12} style={{backgroundColor: 'purple'}}></Col>
                <Col xl={3} lg={4} md={6} sm={12} style={{backgroundColor: 'salmon'}}></Col>

            </Row>
        </div>
    )
}

export default AboutPage
