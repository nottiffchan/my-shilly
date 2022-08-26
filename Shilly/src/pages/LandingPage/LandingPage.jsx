import background from '../../images/landingPageBg.png';
// import LandingPageFeaturedShillers from './LandingPageFeaturedShillers';
// import LandingPageFeaturedTokens from './LandingPageFeaturedTokens';
import { Row, Col } from 'react-bootstrap';
import Button from '../../components/Button';
import styled from 'styled-components';
import BSCIcon from '../../images/BSCIcon.png'
import ERC20Icon from '../../images/ERC20Icon.png'
import MemeTokenIcon from '../../images/MemeTokenIcon.png'
import MiscTokenIcon from '../../images/MiscTokenIcon.png'

function LandingPage() {
    const mainTitleHero = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: '100px',
    }

    const heroSubtitle = {
        fontSize: 'var(--fs-b1)',
        color: 'var(--base-60)',
        marginTop: '16px',
        marginBottom: '32px'
    } 

    const sect = {
        display: 'flex', alignItems: 'center', justifyContent: 'left', flexDirection: 'column', marginTop: '96px'
    }

    const header = {
        width: '100%',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--base-30)',
        textAlign: 'left',
        marginBottom: '24px'
    }

    return ( 
        <div style={{ backgroundImage: `url(${background})` }}>
            <div style={{ maxWidth: '1280px', margin: 'auto', padding: '60px 24px' }}>
                <section>
                    <div style={mainTitleHero}>
                        <h1 className="fs-display" style={{color: '#490826', maxWidth: '810px'}}>
                            Bring your token <span style={{color: 'var(--accent-pink)'}}>to the moon</span> with the perfect Shiller.
                        </h1>
                        <p style={heroSubtitle}>Shilly is a platform to create, explore and connect within the crypto space.</p>
                        <div>
                            <Button style={{margin: '0 4px'}} variant='primary'>Find Shillers</Button>
                            <Button style={{margin: '0 4px'}} variant='tertiary'>Start Shilling</Button>
                        </div>
                    </div>
                </section>

                <section style={sect}>
                    <div style={header}>
                        <h2>Featured Shillers</h2>
                    </div>
                    {/* <LandingPageFeaturedShillers /> */}
                </section>

                <section style={sect}>
                    <div style={header}>
                        <h2>Trending Tokens</h2>
                    </div>
                    {/* <LandingPageFeaturedTokens /> */}

                </section>

                <section style={sect}>
                    <h2>Explore Token Categories</h2>

                    <div style={{ margin: '40px 0', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Row>
                            <Col md={3} sm={6}>
                                <TokenCatCard icon={BSCIcon} catName="BSC Tokens" description="Tokens on the Binance Smart Chain"></TokenCatCard>
                            </Col>
                            <Col md={3} sm={6}>
                                <TokenCatCard icon={ERC20Icon} catName="ERC20 Tokens" description="Tokens on the Ethereum blockchain"></TokenCatCard>
                            </Col>
                            <Col md={3} sm={6}>
                                <TokenCatCard icon={MemeTokenIcon} catName="Meme Tokens" description="Tokens based on Internet memes and online culture"></TokenCatCard>
                            </Col>
                            <Col md={3} sm={6}>
                                <TokenCatCard icon={MiscTokenIcon} catName="Misc." description="Other tokens"></TokenCatCard>
                            </Col>
                        </Row>
                    </div>

                    <Button variant="tertiary">
                        Explore All
                        <box-icon name='right-arrow-alt' color="var(--base)" style={{marginLeft: '4px'}}></box-icon>

                    </Button>
                </section>

                <section style={sect}>
                    <h1 className="fs-display" style={{color: '#490826', maxWidth: '750px', textAlign: 'center', marginTop: '60px'}}>
                        The marketplace for Tokens and Shillers.
                    </h1>
                    <p style={heroSubtitle}>Insert cool description</p>
                    <Button style={{marginTop: '16px', marginBottom: '60px'}} variant='primary'>Get Started</Button>
                </section>
            </div>
        </div>
    );
}

function TokenCatCard(props) {
    return (
        <TokenCatStyledComponent>
            <img alt="Token Category Icon" src={props.icon} style={{width: '100px', height: '100px', borderRadius: 'var(--br-round)', marginBottom: '32px'}} />
            <h3>{props.catName}</h3>
            <p className="fs-b3" style={{marginTop: '16px'}}>{props.description}</p>
        </TokenCatStyledComponent>
    );
}

const TokenCatStyledComponent = styled.div`
    padding: 24px;
    box-shadow: var(--shadow);
    border-radius: var(--br-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;
    background-color: var(--base-10);
    height: auto;
    text-align: center;
    transition: all 300ms ease-out;
    cursor: pointer;

    &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-4px);
    }

    @media (min-width: 576px) {
        height: 280px;
    }
    @media (min-width: 768px) {
        height: 330px;
    }
    @media (min-width: 900px) {
        height: 300px;
    }
    @media (min-width: 1080px) {
        height: 280px;
    }
`;

export default LandingPage;