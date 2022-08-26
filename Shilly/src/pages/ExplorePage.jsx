import Tabs from '../components/Tabs';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Button from '../components/Button';
import Card from '../components/Card';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

export default function ExplorePage() {
    const [shillers, setShillers] = useState([]);
    const [tokens, setTokens] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function f() {
            try {
                const data = await axios.get(
                    `${process.env.REACT_APP_SERVER_URI}/api/user/getUsers`);
                if (data.data.success) {
                    const users = data.data.users;
                    setShillers(users.filter(user => user.role === 0));
                    setTokens(users.filter(user => user.role === 1))
                }
            } catch (error) {
                console.log(error)
            }
        }
        f();
    }, []);

    const ExploreShillers = () => {
        return (
            <Row style={{paddingTop: '32px'}}>
                <Col md={3}>
                    <ShillerFilters />
                </Col>
                <Col md={9}>
                    <Row>
                        {shillers.map(shiller => {
                            return (
                                <Col key={shiller._id} md={4} sm={6}>
                                    <Card user={shiller} onClick={() => {history.pushState(`${shiller.username}`)}} />
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        );
    }
    
    const ShillerFilters = () => {
        return (
            <div style={{display: 'grid', gap: '32px'}}>
                <FilterSection>
                    <BiggerH4>Average price range</BiggerH4>
                    <div style={{display: 'grid', gap: '12px', gridAutoFlow: 'column'}}>
                        <Input placeholder="0.00"></Input>
                        <Input placeholder="0.00"></Input>
                    </div>
                    <Button variant="secondary" style={{width: '100%'}}>Set price</Button>
                </FilterSection>
                <FilterSection style={{gap: '32px'}}>
                    <div>
                         <div style={{display: 'flex'}}>
                            <box-icon type='logo' name='tiktok'></box-icon>
                            <BiggerH4 style={{marginLeft: '8px'}}>Tiktok Followers</BiggerH4>
                         </div>
                    </div>
                    <div>
                         <div style={{display: 'flex'}}>
                            <box-icon type='logo' name='instagram'></box-icon>
                            <BiggerH4 style={{marginLeft: '8px'}}>Instagram Followers</BiggerH4>
                         </div>
                    </div>
                    <div>
                         <div style={{display: 'flex'}}>
                            <box-icon type='logo' name='youtube'></box-icon>
                            <BiggerH4 style={{marginLeft: '8px'}}>YouTube Subscribers</BiggerH4>
                         </div>
                    </div>
                </FilterSection>
                <FilterSection>
                    <BiggerH4>Reviews</BiggerH4>
                    <SelectOption>
                            <BiggerH4 style={{color: 'var(--accent-warning)'}}>5</BiggerH4>
                            <box-icon type='solid' name='star' color='var(--accent-warning)' style={{marginLeft: '4px'}}></box-icon>
                    </SelectOption>
                    <SelectOption>
                            <BiggerH4 style={{color: 'var(--accent-warning)'}}>4</BiggerH4>
                            <box-icon type='solid' name='star' color='var(--accent-warning)' style={{marginLeft: '4px'}}></box-icon>
                    </SelectOption>
                </FilterSection>
            </div>
        )
    }
    
    const ExploreTokens = () => {
        return (
            <Row style={{paddingTop: '32px'}}>
                <Col md={3}>
                    <TokenFilters />
                </Col>
                <Col md={9}>
                    <Row>
                        {tokens.map(token => {
                            return (
                                <Col key={token._id} md={4} sm={6}>
                                    <Card user={token} />
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        );
    }
    
    const TokenFilters = () => {
        return (
            <div style={{display: 'grid', gap: '32px'}}>
                <FilterSection>
                    <BiggerH4>Average reward range</BiggerH4>
                    <div style={{display: 'grid', gap: '12px', gridAutoFlow: 'column'}}>
                        <Input placeholder="0.00"></Input>
                        <Input placeholder="0.00"></Input>
                    </div>
                    <Button variant="secondary" style={{width: '100%'}}>Set price</Button>
                </FilterSection>
                <FilterSection>
                    <BiggerH4>Tags</BiggerH4>
                    <SelectOption>
                            <BiggerH4>ERC Tokens</BiggerH4>
                    </SelectOption>
                    <SelectOption>
                            <BiggerH4>BSC Tokens</BiggerH4>
                    </SelectOption>
                    <SelectOption>
                            <BiggerH4>Meme Tokens</BiggerH4>
                    </SelectOption>
                </FilterSection>
                <FilterSection>
                    <BiggerH4>Reviews</BiggerH4>
                    <SelectOption>
                            <BiggerH4 style={{color: 'var(--accent-warning)'}}>5</BiggerH4>
                            <box-icon type='solid' name='star' color='var(--accent-warning)' style={{marginLeft: '4px'}}></box-icon>
                    </SelectOption>
                    <SelectOption>
                            <BiggerH4 style={{color: 'var(--accent-warning)'}}>4</BiggerH4>
                            <box-icon type='solid' name='star' color='var(--accent-warning)' style={{marginLeft: '4px'}}></box-icon>
                    </SelectOption>
                </FilterSection>
            </div>
        )
    }

    return (
        <div style={{maxWidth: '1200px', padding: '24px 16px', margin: 'auto'}}>
            <Tabs> 
                <div label="Shillers"> 
                    <ExploreShillers />
                </div> 
                <div label="Tokens"> 
                    <ExploreTokens />
                </div> 
            </Tabs> 
        </div>
    )
}

const BiggerH4 = styled.h4`
    font-size: 18px;
`;

const Input = styled.input`
    box-shadow: none;
    min-height: 60px;
    border-radius: var(--br-lg);
`;

const FilterSection = styled.div`
    display: grid;
    gap: 16px;
    padding-bottom: 32px;
    border-bottom: 1px solid var(--base-20);
`;

const SelectOption = styled.div`
    border-radius: var(--br-lg);
    border: 1px solid var(--base-30);
    padding: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: var(--transition);

    &:hover {
        border: 1px solid var(--base-50);
    }
`;