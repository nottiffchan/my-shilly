import styled from "styled-components";
import logo from '../images/logo.svg'

const Footer = () => {
    return (
        <FooterContainer>
            <div style={{display: 'flex', flexDirection: "column"}}>
                <img src={logo} alt="logo" style={{height: '32px', marginBottom: '4px'}} />
                <p style={{margin: '0'}}>© 2021 Shilly.</p>
            </div>
            <div>
                <FootLink>About</FootLink>
                <FootLink>Contact</FootLink>
                <FootLink>Legal</FootLink>

            </div>
        </FooterContainer>
    ); 
}

const FooterContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 12px;
    border-top: 1px solid var(--base-30);

    font-size: var(--fs-b3);
    color: var(--base-60);
    font-weight: bold;

    @media (min-width: 400px) {
        padding: 20px 32px;
    }
`;

const FootLink = styled.a`
    margin: 0px 8px;
    text-decoration: none;
    color: var(--base-40);
    cursor: pointer;
    transition: 200ms ease-out;

    &:hover {
        color: var(--base-60);
    }
`;

export default Footer;