import { Row, Col, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import axios from 'axios';
import Button from '../../components/Button';

function EditProfile(props) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const [user, setUser] = useState(currentUser);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [about, setAbout] = useState('');
    const [website, setWebsite] = useState('');
    const [instagramUsername, setInstagramUsername] = useState('');
    const [twitterUsername, setTwitterUsername] = useState('');
    const [tiktokUsername, setTiktokUsername] = useState('');
    const [telegramChannelLink, setTelegramChannelLink] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const [error, setError] = useState('');
    const [takenUsername, setTakenUsername] = useState(false);

    const [profileImgError, setProfileImgError] = useState("");


    let history = useHistory();

    useEffect(async () => {
        if (currentUser == null) {
            history.push('/');
        } else {
            setName(user['name']);
            setUsername(user['username']);
            setLocation(user['location']);
            user['bio'] == null ? setBio('') : setBio(user['bio']);
            user['about'] == null ? setAbout('') : setAbout(user['about']);
            user['website'] == null ? setWebsite('') : setWebsite(user['website']);
            user['instagramUsername'] == null ? setInstagramUsername('') : setInstagramUsername(user['instagramUsername']);
            user['twitterUsername'] == null ? setTwitterUsername('') : setTwitterUsername(user['twitterUsername']);
            user['tiktokUsername'] == null ? setTiktokUsername('') : setTiktokUsername(user['tiktokUsername']);
            user['telegramChannelLink'] == null ? setTelegramChannelLink('') : setTelegramChannelLink(user['telegramChannelLink']);
            user['youtubeLink'] == null ? setYoutubeLink('') : setYoutubeLink(user['youtubeLink']);
            user['profileImage'] == null ? setProfileImg('') : setProfileImg(user['profileImage']);
        }
    }, [])

    function formatLink(link) {
        return link.includes('https://') || link.includes('http://') ? link : 'https://' + link;
    }

    const atInputWrap = {
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
        borderTopRightRadius: 'var(--br-md)',
        borderBottomRightRadius: 'var(--br-md)',
        borderLeft: '0'
    };

    const updateUser = () => {
        user['name'] = name;
        user['username'] = username;
        user['location'] = location;
        user['bio'] = bio;
        user['about'] = about;
        user['website'] = formatLink(website);
        user['instagramUsername'] = instagramUsername;
        user['twitterUsername'] = twitterUsername;
        user['tiktokUsername'] = tiktokUsername;
        user['telegramChannelLink'] = formatLink(telegramChannelLink);
        user['youtubeLink'] = formatLink(youtubeLink);
        user['profileImage'] = profileImg;
    }

    const handleUsernameChange = async (username) => {
        setUsername(username);
        if (username && username != user['username'])
            await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/user/getUserByUsername?username=${username}`)
                .then((res) => {
                    if (res.data.success) {
                        console.log('taken')
                        setTakenUsername(true);
                    }
                }).catch((error) => setTakenUsername(false));
        else {
            setTakenUsername(false);
        }
    }

    const handleFileChange = ({ target }) => {
        setImgLoading(true);
        if (target.files.length === 1) {
            if (target.files[0].size > 10000000) {
                setProfileImgError("What a huge image you have... Please keep it to under 10MB.");
            } else {
                setProfileImgError("");
                handleImageSubmit(target.files[0]);
            }
        } else {
            setProfileImgError("");
        }
    };

    const handleImageSubmit = (fileData) => {
        const formdata = new FormData();

        formdata.append("image", fileData);

        axios.post(`${process.env.REACT_APP_SERVER_URI}/api/uploadImage/image`, formdata)
            .then((res) => {
                if (res.data.success) {
                    setProfileImg(res.data.imgPath);
                    setImgLoading(false);
                }
            }).catch((error) => {
                setImgLoading(false);
                setProfileImgError(error);
            });
        //todo: set message.info(error)
    };

    const updateHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        updateUser();

        const config = { header: { "Content-Type": "application/json" } };

        try {
            if (user['role'] === 1) {
                setUsername(username.toUpperCase());
            }

            const { data } = await axios.post(
                `${process.env.REACT_APP_SERVER_URI}/api/user/updateUser`,
                user,
                config
            );

            if (data.success) {
                localStorage.setItem("currentUser", JSON.stringify(data.user));
                props.onUpdate(data.user);
                setLoading(false);
                history.push("/user/" + data.user.username, []);
            }

        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--base-20)', width: '100vw', height: '100%', overflowX: 'hidden' }
        }>
            <CardPageWrap>
                <h1 style={{ margin: '0 auto', maxWidth: '700px', textAlign: 'center', marginTop: '50px' }}>
                    Edit your profile
                </h1>
                <CardWrap>
                    <Card>
                        <form onSubmit={updateHandler}>
                            <div style={{ display: 'grid', gap: '16px' }}>
                                <Row className="align-items-center">
                                    <Col md={5} className="mb-4 mb-md-0">
                                        <h3>Name</h3>
                                    </Col>
                                    <Col md={7}>
                                        <input
                                            type="text"
                                            required
                                            id="name"
                                            name="name"
                                            placeholder="Add your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            tabIndex={1}
                                        />
                                    </Col>
                                </Row>
                                <Row className="align-items-center">
                                    <Col md={5} className="mb-4 mb-md-0">
                                        <h3>Username</h3>
                                    </Col>
                                    <Col md={7} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <AtIconWrap> @ </AtIconWrap>
                                        <input
                                            type="text"
                                            required
                                            id="username"
                                            name="username"
                                            placeholder="username"
                                            value={username}
                                            onChange={(e) => handleUsernameChange(e.target.value)}
                                            tabIndex={2}
                                            style={atInputWrap}
                                        />
                                    </Col>
                                </Row>
                                {takenUsername && <p style={{ fontWeight: 'bold', color: 'var(--accent-error)', textAlign: 'end' }}>Username has been taken!</p>}
                                {!username && <p style={{ fontWeight: 'bold', color: 'var(--accent-error)', textAlign: 'end' }}>Username cannot be empty!</p>}

                                <Row className="align-items-center">
                                    <Col md={5} className="mb-4 mb-md-0">
                                        <h3>Location</h3>
                                    </Col>
                                    <Col md={7}>
                                        <input
                                            type="text"
                                            required
                                            id="location"
                                            name="location"
                                            placeholder="Rio de Janeiro, Brazil"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            tabIndex={3}
                                        />
                                    </Col>
                                </Row>

                                <Row className="align-items-center">
                                    <Col md={5} className="mb-0">
                                        <h3>Add a short bio</h3>
                                        <p style={{ marginTop: '10px', className: 'fs-b2', color: 'var(--base-50)' }}>
                                            This is others' first impression of your profile. Make it short and snappy!
                                        </p>
                                    </Col>
                                    <Col md={7} style={{ display: 'flex', flexDirection: 'column' }}>
                                        <textarea
                                            type="text"
                                            id="bio"
                                            name="bio"
                                            placeholder="Enter a short bio"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            maxLength="200"
                                            rows="5"
                                            tabIndex={4}
                                        />
                                        <p style={{
                                            alignSelf: 'flex-end',
                                            justifySelf: 'flex-end',
                                            fontSize: 'var(--fs-b4)',
                                            marginTop: '5px',
                                            marginBottom: '0',
                                            color: bio.length > 190 ? 'var(--accent-pink-darker)' : 'var(--base-50)',
                                            fontWeight: bio.length > 190 ? 'bold' : null
                                        }}>
                                            {bio.length}/200
                                        </p>
                                    </Col>
                                </Row>

                                <Row className="align-items-center">
                                    <Col md={12}>
                                        <h3>About you</h3>
                                        <p style={{ marginTop: '10px', className: 'fs-b2', color: 'var(--base-50)' }}>
                                            {user['role'] === 0 ? 'Add a longer paragraph telling others more about yourself.'
                                                : 'Add a longer paragraph telling others more about your token.'}
                                        </p>
                                    </Col>
                                    <Col md={12} className="mb-4">
                                        <textarea
                                            type="text"
                                            id="about"
                                            name="about"
                                            placeholder="Enter a description"
                                            value={about}
                                            onChange={(e) => setAbout(e.target.value)}
                                            tabIndex={5}
                                            rows="8"
                                        />
                                    </Col>
                                </Row>
                                <Row className="align-items-center" style={{ padding: '16px 0px 16px 0px' }}>
                                    <Col md={7} className="mb-4 mb-md-0">
                                        <h3>Upload a profile image</h3>
                                        <p style={{ marginTop: '10px', className: 'fs-b2', color: 'var(--base-50)' }}>
                                            Recommended: Square image, at least 400x400. File type: JPG, PNG or GIF.
                                        </p>
                                    </Col>
                                    <Col md={5} style={{ display: 'flex', justifyContent: 'center' }}>
                                        {!imgLoading &&
                                            <div>
                                                <UploadFileArea htmlFor={'upload-button'} gotImage={profileImg} style={{ background: profileImg ? `url(${profileImg})` : 'white' }}>
                                                    {!profileImg && <box-icon name='camera' color='var(--base-30)'></box-icon>}
                                                </UploadFileArea>
                                                {profileImg && <RemoveImgButton onClick={() => setProfileImg(null)}>
                                                    <box-icon name='trash-alt' color='var(--base-10)' ></box-icon>
                                                </RemoveImgButton>}
                                                <input
                                                    id="upload-button"
                                                    type="file"
                                                    name="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    placeholder="upload image"
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                        }
                                        {imgLoading && <Spinner animation="border" style={{ color: 'var(--accent-pink)' }} />}
                                        {profileImgError && <p style={{ fontWeight: 'bold', color: 'var(--accent-error)', textAlign: 'end' }}>{profileImgError}</p>}
                                    </Col>
                                </Row>
                                <Row className="align-items-center" style={{ padding: '16px 0px 16px 0px' }}>
                                    <Col md={7} className="mb-4 mb-md-0">
                                        <h3>Upload a cover image</h3>
                                        <p style={{ marginTop: '10px', className: 'fs-b2', color: 'var(--base-50)' }}>
                                            Recommended: Square image, at least 400x400. File type: JPG, PNG or GIF.
                                        </p>
                                    </Col>
                                    <Col md={5} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <DottedCircle>
                                            <box-icon name='camera' color='var(--base-30)'></box-icon>
                                        </DottedCircle>
                                    </Col>
                                </Row>

                                <Row>
                                    <Row className="mb-4">
                                        <h3>Social media links</h3>
                                    </Row>
                                    <div style={{ display: 'grid', gap: '8px' }}>
                                        <Row className="align-items-center">

                                            <Col md={5} className="mb-2 mb-md-0" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                                                <box-icon name="globe"></box-icon>
                                                <h4>Website</h4>
                                            </Col>
                                            <Col md={7} className="mb-2 mb-md-0">
                                                <input
                                                    type="text"
                                                    id="website"
                                                    name="website"
                                                    placeholder="https://website.com"
                                                    value={website}
                                                    onChange={(e) => setWebsite(e.target.value)}
                                                    tabIndex={6}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="align-items-center">
                                            <Col md={5} className="mb-2 mb-md-0" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                                                <box-icon type='logo' name='instagram'></box-icon>
                                                <h4>Instagram</h4>
                                            </Col>
                                            <Col md={7} className="mb-2 mb-md-0" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <AtIconWrap
                                                >@</AtIconWrap>
                                                <input
                                                    type="text"
                                                    id="instagram"
                                                    name="instagram"
                                                    placeholder="Instagram Username"
                                                    value={instagramUsername}
                                                    onChange={(e) => setInstagramUsername(e.target.value)}
                                                    tabIndex={7}
                                                    style={atInputWrap}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="align-items-center">
                                            <Col md={5} className="mb-2 mb-md-0" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                                                <box-icon type='logo' name='twitter'></box-icon>
                                                <h4>Twitter</h4>
                                            </Col>
                                            <Col md={7} className="mb-2 mb-md-0" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <AtIconWrap
                                                >@</AtIconWrap>
                                                <input
                                                    type="text"
                                                    id="twitter"
                                                    name="twitter"
                                                    placeholder="Twitter Username"
                                                    value={twitterUsername}
                                                    onChange={(e) => setTwitterUsername(e.target.value)}
                                                    tabIndex={7}
                                                    style={atInputWrap}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="align-items-center">
                                            <Col md={5} className="mb-2 mb-md-0" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                                                <box-icon name='tiktok' type='logo' ></box-icon>
                                                <h4>TikTok</h4>
                                            </Col>
                                            <Col md={7} className="mb-2 mb-md-0" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <AtIconWrap>
                                                    @
                                                </AtIconWrap>
                                                <input
                                                    type="text"
                                                    id="tiktok"
                                                    name="tiktok"
                                                    placeholder="TikTok Username"
                                                    value={tiktokUsername}
                                                    onChange={(e) => setTiktokUsername(e.target.value)}
                                                    tabIndex={8}
                                                    style={atInputWrap}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="align-items-center">
                                            <Col md={5} className="mb-2 mb-md-0" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                                                <box-icon name='telegram' type='logo' ></box-icon>
                                                <h4>Telegram Channel</h4>
                                            </Col>
                                            <Col md={7} className="mb-2 mb-md-0">
                                                <input
                                                    type="text"
                                                    id="telegram"
                                                    name="telegram"
                                                    placeholder="https://t.me/mychannel"
                                                    value={telegramChannelLink}
                                                    onChange={(e) => setTelegramChannelLink(e.target.value)}
                                                    tabIndex={9}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="align-items-center">
                                            <Col md={5} className="mb-2 mb-md-0" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                                                <box-icon type="logo" name='youtube'></box-icon>
                                                <h4>YouTube Channel</h4>
                                            </Col>
                                            <Col md={7} className="mb-2 mb-md-0">
                                                <input
                                                    type="text"
                                                    id="youtube"
                                                    name="youtube"
                                                    placeholder="https://youtube.com/c/mychannel"
                                                    value={youtubeLink}
                                                    onChange={(e) => setYoutubeLink(e.target.value)}
                                                    tabIndex={10}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </Row>

                            </div>
                            {error && <span>{error}</span>}
                            <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '48px', gap: '16px' }}>
                                <Button type="submit" variant='primary' tabIndex={11} loading={loading} disabled={takenUsername}>Save Changes</Button>

                                <CancelButton tabIndex={12} onClick={() => { history.goBack() }}>Cancel</CancelButton>
                            </Row>
                        </form>
                    </Card>
                </CardWrap>
            </CardPageWrap>
        </div >
    )
}

const CardPageWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 24px;
  overflow-x: hidden;
`;

const CardWrap = styled.div`
  display: grid;
  margin: 0;
  gap: 24px;
  padding: 24px 0;

  @media (min-width: 640px) {
    padding: 32px 0;
  }

  @media (min-width: 832px) {
    padding: 64px 48px;
  }
`;

const Card = styled.div`
  display: block;
  padding: 24px;
  box-shadow: var(--shadow);
  background-color: var(--base-10);
  max-width: 700px;
  border-radius: var(--br-lg);

  @media (min-width: 640px) {
    padding: 32px;
  }

  @media (min-width: 832px) {
    padding: 32px 48px;
    margin: 0 auto;
    width: 100%;
  }
`;

const AtIconWrap = styled.div`
  box-sizing: border-box;
  line-height: 290%;
  background-color: var(--base-20);
  color: var(--base-40);
  border: 2px solid var(--base-30);
  border-right: 0;
  border-top-left-radius: var(--br-md);
  border-bottom-left-radius: var(--br-md);
  padding-left: 16px;
  padding-right: 16px;
`;

const DottedCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px dashed var(--base-30);
  width: 95px;
  height: 95px;
  transition: var(--transition);
  &:hover {
    border: 2px dashed var(--accent-pink);
    cursor: pointer;
  }
`

const UploadFileArea = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--br-round);
  border: ${props => props.gotImage ? 'none' : '2px dashed var(--base-30)'};
  width: 100px;
  height: 100px;
  background-size: cover!important;
  background-position: center center!important;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    border: ${props => props.gotImage ? 'none' : '2px dashed var(--accent-pink)'};
  }
`;

const RemoveImgButton = styled.div`
  background-color: var(--accent-error);
  color: var(--base-10);
  height: 32px;
  width: 32px;
  border-radius: var(--br-round);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 34px;
  bottom: 16px;
  border: 2px solid var(--base-10);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--accent-error-lighter);
  }
`;

const CancelButton = styled.h4`
  text-align: center;
  color: var(--base-50);
  cursor: pointer;
  transition: var(--transition);
  &:hover {
      color: var(--base-80);
  }
`


export default EditProfile;