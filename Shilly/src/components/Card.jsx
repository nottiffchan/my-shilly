import placeholderDp from '../images/placeholderDp.png';
import coverpic from '../images/testCoverImg.jpeg';
import styled from 'styled-components';

const Card = (props) => {

    const username = { 
        marginBottom: '16px', 
        color: 'var(--accent-pink)' 
    }

    const profileUrl = "/user/" + props.user.username;
    const profileImage = props.user.profileImage ? props.user.profileImage : placeholderDp;

	return (
        <CardStructure>
            <a href={profileUrl} style={{ textDecoration: 'none' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{ margin: '0', width: '100%', height: '0', paddingBottom: '57%' }}></div>
                        <CoverImageWrapper>
                            <img className="coverImage" src={coverpic} alt="cover"></img>
                        </CoverImageWrapper>
                    </div>
                    <div style={{ margin: '0 24px', position: 'relative' }}>
                        <ProfileImageWrapper>
                            <ProfileImage style={{backgroundImage: `url(${profileImage})`}}></ProfileImage>
                        </ProfileImageWrapper>
                    </div>
                </div>

                {props.user && <CardBody>
                    <h3>{props.user.name}</h3>

                    {props.user.role === 0 && <h4 style={username}>@{props.user.username}</h4>}
                    {props.user.role === 1 && <TokenSymbol>{props.user.username}</TokenSymbol>}

                    <p className="fs-b3" style={{ borderBottom: '1px solid var(--base-20)', paddingBottom: '24px', margin: '16px 0' }}>Bitcoin. Ethereum Crypto YouTuber, Creator of BitBoyCrypto.com, Co-Host of New Money Gang Coach</p>

                    <CardFooter>
                        {props.user.role === 0 && <p style={{margin: '0'}}>
                            <span className="secText">From </span> 
                            <b>S$500</b>
                        </p>}
                        
                        {props.user.role === 1 && <div style={{display: 'flex', flexDirection: 'column'}}>
                            <b>S$300</b>
                            <span className="secText fs-b4">Avg. Reward</span>
                        </div>}

                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <box-icon name='star' type='solid' color="var(--accent-warning)" style={{marginRight: '4px'}}></box-icon>

                            {props.user.role === 0 && <div>
                                <b style={{color: 'var(--accent-warning)', marginRight: '4px'}}>4.2</b>
                                <span className="secText">(90)</span>
                            </div>}
                            {props.user.role === 1 && <div>
                                <b style={{color: 'var(--accent-warning)', marginRight: '4px'}}>3.3</b>
                                <span className="secText">(12)</span>
                            </div>}
                        </div>
                    </CardFooter>
                </CardBody>}
            </a>
        </CardStructure>
	)
}

const CardFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--fs-b3);

    & .secText{
        color: var(--base-50);
    }
`;


const CardStructure = styled.div`
    border-radius: var(--br-md);
    background-color: var(--base-10);
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 300ms ease-out;
    text-decoration: none;
    margin: 16px 0;
    cursor: pointer;

    &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-4px);
    }
`;

const CardBody = styled.div`
    margin: 0;
    padding: 64px 24px 24px 24px;
    color: var(--base);
    text-align: left;
`;

const ProfileImageWrapper = styled.div`
    box-sizing: border-box;
    margin: 0;
    padding: 8px;
    background-color: var(--base-10);
    width: 96px;
    height: 96px;
    position: absolute;
    left: 0;
    transform: translateY(-50%);
    display: flex;
    border-radius: var(--br-round);
`;

const ProfileImage = styled.div`
    margin: 0;
    width: 80px;
    height: 80px;
    background-color: var(--base-20);
    background-size: cover;
    background-position: center center;
    border-radius: var(--br-round);
`;

const TokenSymbol = styled.span`
    text-transform: uppercase;
    color: var(--base-80);
    font-weight: bold;
    font-size: var(--fs-b4);
    padding: 2px 6px;
    background-color: var(--base-20);
    border-radius: var(--br-sm);
`;

const CoverImageWrapper = styled.div`
    position: absolute; 
    top: 0; 
    right: 0; 
    bottom: 0; 
    left: 0; 
    background-color: var(--base-20); 
    display: flex;

    + .coverImage {
        height: auto;
        object-fit: cover;
        min-height: 100%;
        min-width: 100%;
        max-width: 100%;
    }
`;


export default Card;