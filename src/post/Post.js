import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post(props) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar"
                    alt="Name"
                    src=""
                />
                <h3>{props.username}</h3>
            </div>
            
            {/* Profile-pic - User Name */}

            {/* Image */}
            <img className="post__image" 
            src={props.imageUrl}      
            alt=""
            />

            {/* UserName + caption */}
            <h4 className="post__text">
                <strong>{props.username}</strong>
                <span>{props.caption}</span>
            </h4>
        </div>
    )
}

export default Post;
