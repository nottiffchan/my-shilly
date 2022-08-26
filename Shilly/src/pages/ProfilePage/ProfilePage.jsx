import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Button from "../../components/Button";
import ReviewCard from "../../components/ReviewCard";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import axios from "axios";
import placeholderDp from '../../images/placeholderDp.png';

const instagramLink = 'https://instagram.com/';
const twitterLink = 'https://twitter.com/';
const tiktokLink = 'https://tiktok.com/@';

const formatLink = (link) => {
    return link.includes('https://') ? link.replace('https://', '') : link;
}

const fakeShiller = {
    averagePrice: '10',
    likes: '23',
    averageRating: '4.2',
    bio: 'Blockchain Educator | University Instructor| Co-Founder at Blocknia | Content Creator',
    about: `Currently I have the following 3 main focuses:

    - I educate people on Social Media about Blockchain Technology & Cryptocurrencies in both English and Spanish.
    - I teach at the University of Nicosia, providing the first Spanish Online Course about Bitcoin, Blockchain and Cryptocurrencies.
    - I create Educational Content for Crypto companies in two forms: 1) through collaborations with my youtube channels, and 2) for their own Social Media as well.
    
    Specialties: Cryptocurrencies, Bitcoin, Open Blockchains, Social Media, Communication & Education.`,
    website: 'https://KANYEWEST.COM',
    instagram: 'kanyewest',
    twitter: 'kanyewest',
    tiktok: '',
    youtubeLink: 'https://www.youtube.com/channel/UCs6eXM7s8Vl5WcECcRHc2qQ',
    telegramLink: '',
}


function ProfilePage(props) {
    const [user, setUser] = useState({user: null});
    const [liked, setLiked] = useState(false);
    const [likesArr, setLikesArr] = useState([]);

    const { match } = props;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var viewingOwnProfile = currentUser && (match.params.username === currentUser.username);
    var viewingOtherProfile = !currentUser || (match.params.username !== currentUser.username);

    let history = useHistory();

    const editProfileRedirect = () => {
        history.push('/editprofile', { from: "ProfilePage" })
    }

    useEffect(() => {
        async function f() {
            try {
                if (viewingOtherProfile) {
                    const data = await axios.get(
                        `${process.env.REACT_APP_SERVER_URI}/api/user/getUserByUsername`, 
                        { params: {username: match.params.username } });
                    if (data.data.success) {
                        setUser({user: { ...data.data.user }});
                        var likeeId = {...data.data.user}._id;
                        var likerId = currentUser._id;
                        var ids = {likeeId: likeeId, likerId: likerId};
                
                        const hasLikedData = await axios.post(
                            `${process.env.REACT_APP_SERVER_URI}/api/user/hasLiked`,
                            ids,            
                        );
                        if (hasLikedData.data.success) {
                            setLiked(hasLikedData.data.data);
                        }
                    }
                } else if (viewingOwnProfile) {
                    const data = await axios.get(
                        `${process.env.REACT_APP_SERVER_URI}/api/user/getUserByUsername`, 
                        { params: {username: currentUser.username } });
                    if (data.data.success) {
                        setUser({user: { ...data.data.user }});
                    }
                }

            } catch (error) {
                console.log("HOLHOLHO", error)
            }
        }
        f();
    },  [viewingOtherProfile, viewingOwnProfile, match.params.username, currentUser, user.user]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleLike = async () => {
        try {
            if (viewingOtherProfile) {
                const config = { header: { "Content-Type": "application/json" }};

                var likeeId = user.user._id;
                var likerId = currentUser._id;
                var ids = {likeeId: likeeId, likerId: likerId};

                if (liked) {
                    const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/user/unlike`, ids, config);
                    if (data.success) {
                        setLiked(false);
                    }
                } else {
                    const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/user/like`, ids, config);
                    if (data.success) {
                        setLiked(true);
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <PageWrap>
            {user.user && <Row>
                <Col md={4}>                    
                    {ProfileBasicInfo(user.user, viewingOwnProfile, handleLike, liked, editProfileRedirect)}
                </Col>
                <Col md={8}>
                    <div style={{ display: "grid", gap: '64px' }}>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            <SectionHeader>About</SectionHeader>
                            {user.user ? user.user.about : null}
                        </div>

                        {/* {viewingOwnProfile && <div>
                            <SectionHeader>Likes</SectionHeader>
                            { user.user.likes.length > 0 ? LikesSection(user.user.likes) : "You don't like anyone...."}
                        </div>} */}

                        <SectionHeader>Completed Collabs</SectionHeader>
                        <SectionHeader>Ongoing Collabs</SectionHeader>

                        <div>
                            <SectionHeader>Reviews as Shiller</SectionHeader>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                <ReviewCard />
                                <ReviewCard />
                                <ReviewCard />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>}
        </PageWrap>
    );
}

const ProfileBasicInfo = (user, isViewingOwnProfile, handleLike, liked, editProfileRedirect) => {
    return (
        <div style={{ display: 'grid', gap: '32px', textAlign: 'start' }}>
            {user && <>
                <img src={user.profileImage ? user.profileImage : placeholderDp} alt="" style={{ width: '200px', height: '200px', borderRadius: 'var(--br-round', objectFit: 'cover' }} />
                <div>
                    <h2>{user.name}</h2>
                    <h3 style={{ color: 'var(--base-50)' }}>@{user.username}</h3>
                </div>
                <div style={{ display: 'flex', width: '80%', justifyContent: 'space-between' }}>
                    <div>
                        <h3>S${fakeShiller.averagePrice}</h3>
                        <SecTitle>Average Price</SecTitle>
                    </div>
                    <div>
                        <div style={{ display: 'flex' }}>
                            <box-icon name='star' type='solid' color="var(--accent-warning)" style={{ marginRight: '8px' }}></box-icon>
                            <h3>{fakeShiller.averageRating}</h3>
                        </div>
                        <SecTitle>Average Rating</SecTitle>
                    </div>
                    <div>
                        <h3>{user.likes.length}</h3>
                        <SecTitle>Likes</SecTitle>
                    </div>
                </div>

                <div>
                    {isViewingOwnProfile
                        ? <Button variant='tertiary' onClick={editProfileRedirect}>
                            Edit Profile
                        </Button>
                        : <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button variant='primary' style={{ marginRight: '16px' }}>
                                <box-icon
                                    type='solid'
                                    name='message-rounded'
                                    color="var(--base-10)"
                                    style={{ marginRight: '10px' }}
                                ></box-icon>
                                Chat
                            </Button>
                            <Button variant='secondary' onClick={handleLike} style={{backgroundColor: liked ? 'var(--accent-pink-a10)' : 'var(--base-20)' }}>
                                <box-icon name='heart' type='solid' style={{marginRight: '10px'}} color={liked ? 'var(--accent-pink)' : 'var(--base-100)'}></box-icon>
                                {liked ? 'Liked' : 'Like'}
                            </Button>

                        </div>
                    }
                </div>
                <UserInfoSection>
                    <h3 className="header">Bio</h3>
                    {user.bio}
                    {user.location && <div style={{ display: 'flex', alignItems: 'center' }}>
                        <box-icon name='map' type='regular' style={{ marginRight: '8px' }}></box-icon>
                        <span>{user.location}</span>
                    </div>}
                </UserInfoSection>
                {((user.website && user.website !== "https://") || (user.instagramUsername) || user.twitterUsername ||
                    user.tiktokUsername || (user.telegramChannelLink && user.telegramChannelLink !== "https://") ||
                    (user.youtubeLink && user.youtubeLink !== "https://")) &&
                    <UserInfoSection className="mb-4">
                        <h3 className="header">Links</h3>

                        {user.website && user.website !== "https://" &&
                            <SocialMediaLink>
                                <box-icon name="globe"></box-icon>
                                <h4><a href={user.website} target="_blank" rel="noopener noreferrer">{formatLink(user.website)}</a></h4>
                            </SocialMediaLink>}
                        {user.instagramUsername &&
                            <SocialMediaLink>
                                <box-icon type='logo' name='instagram'></box-icon>
                                <h4><a href={instagramLink + user.instagramUsername} target="_blank" rel="noopener noreferrer">{user.instagramUsername}</a></h4>
                            </SocialMediaLink>}
                        {user.twitterUsername &&
                            <SocialMediaLink>
                                <box-icon type='logo' name='twitter'></box-icon>
                                <h4><a href={twitterLink + user.twitterUsername} target="_blank" rel="noopener noreferrer">{user.twitterUsername}</a></h4>
                            </SocialMediaLink>}
                        {user.tiktokUsername &&
                            <SocialMediaLink>
                                <box-icon name='tiktok' type='logo' ></box-icon>
                                <h4><a href={tiktokLink + user.tiktokUsername} target="_blank" rel="noopener noreferrer">{user.tiktokUsername}</a></h4>
                            </SocialMediaLink>}
                        {user.telegramChannelLink && user.telegramChannelLink !== "https://" &&
                            <SocialMediaLink>
                                <box-icon name='telegram' type='logo' ></box-icon>
                                <h4><a href={user.telegramChannelLink} target="_blank" rel="noopener noreferrer">{formatLink(user.telegramChannelLink)}</a></h4>
                            </SocialMediaLink>}
                        {user.youtubeLink && user.youtubeLink !== "https://" &&
                            <SocialMediaLink>
                                <box-icon type="logo" name='youtube'></box-icon>
                                <h4><a href={user.youtubeLink} target="_blank" rel="noopener noreferrer">{formatLink(user.youtubeLink)}</a></h4>
                            </SocialMediaLink>}
                    </UserInfoSection>}
            </>}
        </div>
    );
}


const PageWrap = styled.div`
    max-width: 1200px;
    margin: auto;
    padding: 60px 20px;
    text-align: start;
`;

const SectionHeader = styled.h3`
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--base-20);
`;

const SecTitle = styled.span`
    font-size: var(--fs-b3);
    font-weight: bold;
    color: var(--base-50);
`;

const UserInfoSection = styled.div`
    display: grid;
    gap: 16px;

    & .header {
        padding-bottom: 16px;
        border-bottom: 1px solid var(--base-20);
    }
`;

const SocialMediaLink = styled.div`
    display: grid;
    grid-auto-flow: column;
    gap: 16px;
    align-items: center;
    justify-content: start;
    text-align: start;
`;

export default ProfilePage;