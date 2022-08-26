import profilepic from '../images/testProfileImg.jpeg';

function ReviewCard() {
    const reviewCard = {
        borderRadius: 'var(--br-md)',
        backgroundColor: 'var(--base-10)',
        boxShadow: 'var(--shadow)',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        transition: '300ms ease-in-out',
        textDecoration: 'none',
        padding: '20px 24px',
    }


    const pfpHolder = {
        paddingTop: '20px',
        backgroundColor: 'var(--base-10)',
        width: '56px',
        height: '56px',
        transform: 'translateY(-50%)',
        borderRadius: 'var(--br-round)',
        marginRight: '28px'
    }

    const pfp = {
        margin: '0',
        minWidth: '56px',
        minHeight: '56px',
        maxWidth: '56px',
        maxHeight: '56px',
        backgroundColor: 'var(--base-20)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        borderRadius: 'var(--br-round)',
        backgroundImage: `url(${profilepic})`
    }

    // (temp) to be passed as props from Profile Page 
    const reviewData = {
        reviewerName: 'Simple Sally',
        reviewerUsername: 'simplysally',
        reviewerPfp: 'xx',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor risus quam, ac sodales ipsum varius vel. Praesent ut magna consequat, ultricies tellus ut, ullamcorper ante. Pellentesque ante orci, pretium id feugiat nec, elementum vitae enim. Maecenas ac faucibus ex. Sed luctus tincidunt commodo. Phasellus vitae sagittis nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer congue at quam a consequat. Sed ante leo, venenatis et tempus et, dignissim condimentum massa. Vivamus vel est eu turpis dictum sodales scelerisque a neque. Ut imperdiet justo elementum eros aliquam tincidunt. Nullam euismod consequat facilisis.',
        rating: 5,
        datetime: '1 month ago', 
    }

    return ( 

        <div style={reviewCard}>

            <div style={pfpHolder}>
                <div style={pfp}></div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}> 

                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}> 
                        <h4 className='fs-b2' style={{marginRight: 10.5}}>{reviewData.reviewerName}</h4>
                        <box-icon name='star' type='solid' color="var(--accent-warning)" style={{marginRight: '4px'}}></box-icon>

                        <h4 className="fs-b2" style={{color: 'var(--accent-warning)'}}>{reviewData.rating}</h4>
                    </div>
                    <span className='fs-b3' style={{color: 'var(--base-50)'}}>{reviewData.datetime}</span>
                </div> 

                <h4 className="fs-b2" style={{color: 'var(--base-50)', marginTop: 4}}>@{reviewData.reviewerUsername}</h4>
                <p className="fs-b2" style={{color: 'var(--base-100)', marginTop: 13, textAlign: 'left'}}>{reviewData.description}</p>
            </div> 
            
        </div>
    );
}

export default ReviewCard;