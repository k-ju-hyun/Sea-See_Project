import './StoreCardElement.css';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';

import beachIcon from '../../image/map_icon.png';
import storeIcon from '../../image/store_icon.png';
import dateIcon from '../../image/date_icon.png';
import defaultImage from '../../image/default.png';

import StoreCardCommentElement from '../StoreCardComment/StoreCardCommentElement';
import { SessionContext } from '../Session/SessionContext'
import { API_ENDPOINTS } from '../api/apiEndpoints';

const StoreCardElement = ({user, filename, boardId, author, title, contents, location, storename, published, like, like_me}) => {
    const navigate = useNavigate();
    
    // 사진 경로 (다시 수정해야 함!!!!!!!! 까먹지 마라 진짜)
    const [storeCardImageSrc, setStoreCardImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.communityImage(filename), {responseType: 'blob'});
                const reader = new FileReader();

                reader.onloadend = () => {
                    const src = reader.result;
                    setStoreCardImageSrc(src);
                };

                reader.readAsDataURL(response.data);
            } catch (error) {
                console.error('이미지 가져오기 실패:', error);
            }
        };

        fetchImage();
    }, []);

    // 이미지 로딩 실패 시 대체할 이미지
    const handleImageError = (event) => {
        event.target.src = defaultImage; // Default 이미지 경로로 변경
    }

    // 보드아이디, 제목, 내용, 해수욕장, 가게명, 날짜, 좋아요, 좋아요 눌렀는지 여부
    const [storeCardBoardId, setStoreCardBoardId] = useState(boardId);
    const [storeCardAuthor, setStoreCardAuthor] = useState(author);
    const [storeCardTitle, setStoreCardTitle] = useState(title);
    const [storeCardContents, setStoreCardContents] = useState(contents);
    const [storeCardBeach, setStoreCardBeach] = useState(location);
    const [storeCardStoreName, setStoreCardStoreName] = useState(storename);
    const [storeCardDate, setStoreCardDate] = useState(published.substring(0,10));
    const [storeCardLike, setStoreCardLike] = useState(like);
    const [storeCardLikeMe, setStoreCardLikeMe] = useState(like_me);

    // 댓글 개수
    const [commentCount, setCommentCount] = useState([]);
    
    // 댓글 리스트 GET
    const [commentData, setCommentData] = useState(null);

    const fetchCommentData = async () => {
        try {
            // GET
            const response = await axios.get(API_ENDPOINTS.communityCommentList(storeCardBoardId));
            setCommentData(response.data);

            // 댓글 개수 구하기
            const updatedCommentCount = Array.from({ length: response.data.length }, (_, index) => index + 1);
            setCommentCount(updatedCommentCount);
        } catch (error) {
            console.error('Error:', error)
        }
    };

    // 한번만 실행되도록
    useEffect(() => {
        fetchCommentData();
    }, []);

    useEffect(() => {
        if (commentData) {
            // console.log(commentData.length);
            console.log(commentCount)
        } 
    }, [commentData]); 

    //좋아요 버튼 클릭 이벤트
    const handleButtonClick = async () => {
        try {
            if (storeCardLikeMe) {
                // 좋아요 취소를 위해 서버로 POST 요청 보내기
                const response = await axios.post(API_ENDPOINTS.communityLike(storeCardBoardId), { user: user });

                // 응답에 대한 처리
                console.log(response.data);

                // 좋아요 액션이 반영되도록 상태 업데이트하기
                setStoreCardLikeMe(false);
                setStoreCardLike(storeCardLike - 1);
            } else {
                // 좋아요를 위해 서버로 POST 요청 보내기
                const response = await axios.post(API_ENDPOINTS.communityLike(storeCardBoardId), { user: user });

                // 응답에 대한 처리
                console.log(response.data);

                // 좋아요 액션이 반영되도록 상태 업데이트하기
                setStoreCardLikeMe(true);
                setStoreCardLike(storeCardLike + 1);
            }
        } catch (error) {
            console.error('error:', error);
        }
    };

    // 이미지 위에 마우스를 올렸을때 살짝 어두운 불투명 효과 씌우기
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // 모달 창을 켤까 끌까 하는 변수
    const[show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 댓글 띄우기
    const renderStoreCardComments = () => {
        if (!commentData){
            return null;
        }

        return commentCount.map((storeCommentCount, index) => (
            <React.Fragment key={index}>
                <div className='modalCommentArea'>
                    <StoreCardCommentElement 
                    author={commentData[index].author}
                    comments={commentData[index].comments}
                />
                {user === commentData[index].author && (
                    <button onClick={() => handleCommentDelete(commentData[index].id)}>삭제</button>
                )}
                </div>
            </React.Fragment>
        ));
    };

    // 작성한 댓글
    const [commentInput, setCommentInput] = useState('');

    // 입력창에 작성한 댓글 처리
    const handleCommentInputChange = (event) => {
        setCommentInput(event.target.value);
    };

    // 댓글 전송 이벤트
    const handleCommentSubmit = async () => {
        try {
            // 서버로 POST 요청 보내기
            const response = await axios.post(API_ENDPOINTS.communityCommentWrite(storeCardBoardId), {
                author: user,
                comments: commentInput,
            });

            // 응답에 대한 처리
            console.log(response.data);

            // 업데이트된 댓글 데이터 가져오기
            fetchCommentData();

            // 댓글 작성 후 입력창 초기화
            setCommentInput('');
        } catch (error) {
            console.error('error:', error);
        }
    };

    // 사용자가 게시글 작성자인지 확인
    const isUserAuthor = user === storeCardAuthor;

    // 게시글 삭제하기 이벤트
    const handleDelete = async () => {
        try {
            // 서버로 GET 요청 보내기
            const response = await axios.get(API_ENDPOINTS.communityDelete(storeCardBoardId));

            // 게시글 삭제 알림창
            alert('게시글이 삭제되었습니다.');

            // 페이지 이동하기
            setShow(false);
            navigate('/TempCommunityStore');
        } catch (error) {
            console.error('error:', error);
        }
    };

    // 게시글 수정하기 이벤트
    const handleUpdate = async () => {
        navigate('/UpdateStore', {
            state: {
                boardId: boardId, 
                title: title, 
                contents: contents, 
                published: published, 
                location: location, 
                storename: storename
            }
        });
    };

    // 댓글 삭제하기 이벤트
    const handleCommentDelete = async (commentId) => {
        try {
            // 서버로 GET 요청 보내기
            const response = await axios.get(API_ENDPOINTS.communityCommentDelete(commentId));

            // 댓글 삭제 후 댓글 리스트 다시 불러오기
            console.log('delete success:', response);
            fetchCommentData();
        } catch (error) {
            console.error('error:', error);
        }
    };
    
    return (
    <div className='storeCard'>
        <img 
            src={storeCardImageSrc}
            alt='음식 사진' 
            onClick={handleShow} 
            className={isHovered ? 'foodImage foodImageHovered' : 'foodImage'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} 
            onError={handleImageError} 
        />
        <button className='storeCardTitle' onClick={handleShow}>{storeCardTitle}</button>
        <div className='storeCardArea1'>
            <img src={beachIcon} alt='해수욕장 아이콘' className='icon'/>
            <span className='iconText'>{storeCardBeach}</span>
        </div>
        <div className='storeCardArea2'>
            <img src={storeIcon} alt='가게 아이콘' className='icon' />
            <span className='iconText'>{storeCardStoreName}</span>
        </div>
        <div className='storeCardArea3'>
            <div>
                <img src={dateIcon} alt='달력 아이콘' className='icon' />
                <span className='iconText'>{storeCardDate}</span>
            </div>
            <div>
                <button className={`storeLikeButton ${storeCardLikeMe ? 'likeMe' : ''}`} onClick={handleButtonClick}>♥</button>
                <span className='iconText'>{storeCardLike}</span>
            </div>
        </div>

        {/* 모달 */}
        <Modal show={show} onHide={handleClose} animation={false} className='storeModal'>
            <button onClick={handleClose} className='storeModalCloseButton'>✕</button>
            {isUserAuthor && (
                <button onClick={handleUpdate} className='storeModalUpdateButton'>
                    | 수정하기 |
                </button>
            )}
            {isUserAuthor && (
                <button onClick={handleDelete} className='storeModalDeleteButton'>
                    | 삭제하기 |
                </button>
            )}
            <img 
                src={storeCardImageSrc}
                alt='음식 사진' 
                className='modalImage' 
                onError={handleImageError}
            />
            <div className='modalArea0'>
                <div className='modalTitle'>{storeCardTitle}</div>
                <div className='modalContents'>{storeCardContents}</div>
                <div className='modalArea1'>
                    <img src={beachIcon} alt='해수욕장 아이콘' className='icon'/>
                    <span className='iconText'>{storeCardBeach}</span>
                </div>
                <div className='modalArea2'>
                    <img src={storeIcon} alt='가게 아이콘' className='icon' />
                    <span className='iconText'>{storeCardStoreName}</span>
                </div>
                <div className='modalArea3'>
                    <div>
                        <img src={dateIcon} alt='달력 아이콘' className='icon' />
                        <span className='iconText'>{storeCardDate}</span>
                    </div>
                    <div>
                    <button className={`storeLikeButton ${storeCardLikeMe ? 'likeMe' : ''}`} onClick={handleButtonClick}>♥</button>
                        <span className='iconText'>{storeCardLike}</span>
                    </div>
                </div>

                <hr className='modalLine'/>
                <div className='modalTitle'>댓글</div>

                {renderStoreCardComments()}
                {/* 댓글 입력창 */}
                <div className='inputContainer'>
                    <input 
                    type='text' 
                    placeholder='댓글을 입력해주세요 :)' 
                    className='modalCommentInput' 
                    value={commentInput}
                    onChange={handleCommentInputChange}
                    />
                    <button className="submitButton" onClick={handleCommentSubmit}>전송</button>
                </div>
            </div>
        </Modal>
    </div>
    )
}

export default StoreCardElement