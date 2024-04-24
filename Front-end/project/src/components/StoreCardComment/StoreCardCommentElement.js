import './StoreCardCommentElement.css'
import React, {useState} from 'react'

const StoreCardCommentElement = ({author, comments}) => {
    // 댓글 작성자, 댓글 있다고 가정
    const [storeCommenter, setStoreCommenter] = useState(author);
    const [storeComment, setStoreComment] = useState(comments);

    return (
        <div className='modalCommentLine'>
            <span className='modalCommenter'>{storeCommenter}</span>
            <span>{storeComment}</span>
        </div>
    );
}

export default StoreCardCommentElement