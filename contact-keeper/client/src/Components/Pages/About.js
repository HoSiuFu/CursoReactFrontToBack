import React from 'react';

const About = () => {
    return(
        <div className='bg-light'>
            <h1>About this App</h1>
            <p className = "my-1">
                This is a full stack React App for keeping contacts
            </p>
            <p className='bg-dark p'>
                <strong>Version: </strong> 1.0.0
            </p>
            <p>
                <span>Photo by <a href="https://unsplash.com/@bantersnaps?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bantersnaps</a> on <a href="https://unsplash.com/s/photos/hong-kong?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
            </p>
        </div>
    );
}

export default About;