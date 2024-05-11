import './App.scss'
import avatar from './images/bozai.png'
import { useState } from 'react'
import _ from 'lodash'
import classNames from 'classnames'

const defaultList = [
  {
    // 评论id
    rpid: 3,
    // user information
    user: {
      uid: '13258165',
      avatar,
      uname: 'Jay Chou',
    },
    // review content
    content: 'This is so good',
    // review time
    ctime: '10-18 08:15',
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar,
      uname: 'songXu',
    },
    content: 'Every day is a good day',
    ctime: '11-13 11:29',
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: 'Eric',
    },
    content: 'Learning React is so interesting',
    ctime: '10-19 09:00',
    like: 66,
  },
]
// current user
const user = {
  // use id
  uid: '30009257',
  // user avatar
  avatar,
  // user name
  uname: 'React Fan',
}



// tab array
const tabs = [
  { type: 'hot', text: 'hot' },
  { type: 'time', text: 'time' },
]

const App = () => {
  const [commentList, setCommentList] = useState(_.orderBy(defaultList, 'like', 'desc'))
  // delete review
  const handleDel = (id) => {
    console.log(id)
    setCommentList(commentList.filter(item => item.rpid !== id))
  }

  // tab click
  const [type, setType] = useState('hot')
  const handleTabChange = (type) => {
    console.log(type)
    setType(type)
    // sort(lodash)
    if (type === 'hot') {
      setCommentList(_.orderBy(commentList, ['like'], ['desc']))
    } else {
      setCommentList(_.orderBy(commentList, ['ctime'], ['desc']))
    }
  }
  return (
    <div className="app">
      {/*  Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Review</span>
            {/* review count */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* active */}
            {tabs.map(item => <span onClick={() => handleTabChange(item.type)} key= {item.type} className={classNames('nav-item', {active: type === item.type})}>{item.text}</span>)}

          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* submit a review */}
        <div className="box-normal">
          {/* current user avatar*/}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="avatar" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* review text */}
            <textarea
              className="reply-box-textarea"
              placeholder="Write a comment..."
            />
            {/* submit button */}
            <div className="reply-box-send">
              <div className="send-text">submit</div>
            </div>
          </div>
        </div>
        {/* review list */}
        <div className="reply-list">
          {/* reviw */}
          {commentList.map((item) => (<div key={item.rpid} className="reply-item">
            {/* avatar */}
            <div className="root-reply-avatar">
              <div className="bili-avatar">
                <img
                  className="bili-avatar-img"
                  alt=""
                  src = {item.user.avatar}
                />
              </div>
            </div>

            <div className="content-wrap">
              {/* user name */}
              <div className="user-info">
                <div className="user-name">{item.user.uname}</div>
              </div>
              {/* review content */}
              <div className="root-reply">
                <span className="reply-content">{item.content}</span>
                <div className="reply-info">
                  {/* review date */}
                  <span className="reply-time">{item.ctime}</span>
                  {/* review count*/}
                  <span className="reply-time">Like:{item.like}</span>
                  {user.uid === item.user.uid && <span onClick={() => handleDel(item.rpid)} className="delete-btn">
                    Delete
                  </span>}
                </div>
              </div>
            </div>
          </div>) )}
        </div>
      </div>
    </div>
  )
}

export default App
