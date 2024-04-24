import './PhotoCardCommentElement.css'
import React, {useState} from 'react'

const PhotoCardCommentElement = ({author, comments}) => {
    // 댓글 작성자, 댓글 있다고 가정
    const [photoCommenter, setPhotoCommenter] = useState(author);
    const [photoComment, setPhotoComment] = useState(comments);

    return (
        <div className='modalCommentLine'>
            <span className='modalCommenter'>{photoCommenter}</span>
            <span>{photoComment}</span>
        </div>
    );
}

export default PhotoCardCommentElement