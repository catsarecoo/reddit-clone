import { AnyNaptrRecord } from 'dns';
import React, { MouseEventHandler, useState } from 'react';
import { Post, Subreddit } from '../../types/types';
import './Comments.scss';
import { ReactComponent as Dropdown } from "../../resources/images/dropdown.svg";

export interface CommentsProps {
  userName: string,
  currentSub: Subreddit | undefined,
  comment: string,
  writeComment: any,
  currentPost: Post,
  submitComment: MouseEventHandler,
  handleLikeComment: MouseEventHandler
}

export default function Comments (props: CommentsProps) {
  const {
    userName,
    currentSub,
    comment,
    writeComment,
    currentPost,
    submitComment,
    handleLikeComment
  } = props;

  const [focussed, setFocussed] = useState(false);
  const [hovered, setHovered] = useState({
    upvote: false,
    downvote: false
  });

  const [hoveredComments, setHoveredComments] = useState([
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    }
  ])

  const handleHoverComment = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    const idString = target.classList[0];
    const id = parseInt(idString);
    if (target.id === "upvote") {
        const newHoverState = {
            upvote: !hoveredComments[id].upvote,
            downvote: hoveredComments[id].downvote
        };
        const newHoveredArray = [...hoveredComments];
        const exchange = newHoveredArray.map((state, i) => {
          if (i === id) {
            state = newHoverState;
            return state;
          } else {
            return state;
          }
        });
        setHoveredComments(exchange);
    } else if (target.id === "downvote") {
        const newHoverState = {
          upvote: hoveredComments[id].upvote,
          downvote: !hoveredComments[id].downvote
        };
        const newHoveredArray = [...hoveredComments];
        const exchange = newHoveredArray.map((state, i) => {
          if (i === id) {
            state = newHoverState;
            return state;
          } else {
            return state;
          }
        });
        setHoveredComments(exchange);
    }
  }

  return (
    <div className="comment-container">
        <div className="submit-comment">
          <h3 className="submit-header">Comment as <span style={{ color: currentSub?.buttonColor }}>{userName !== "" ? userName : "User"}</span></h3>

          <div className="hoverArea" style={{ border: focussed ? "1px solid black" : "1px solid transparent" }}>
              <textarea className="comment-box" placeholder="What are your thoughts?" value={comment} onChange={writeComment} onFocus={() => setFocussed(true)} onBlur={() => setFocussed(false)}></textarea>

              <div className="button-bar">
                <button className="text-settings" aria-label="Bold">
                  <img className="setting-icon" src={require("../../resources/images/bold.png")} />
                </button>
                <button className="text-settings" aria-label="Italic">
                  <img className="setting-icon" src={require("../../resources/images/italic.png")} />
                </button>
                <button className="text-settings" aria-label="Link">
                  <img className="setting-icon" src={require("../../resources/images/clip.png")} />
                </button>
                <button className="text-settings" aria-label="Striked">
                  <img className="setting-icon" src={require("../../resources/images/strikethrough.png")} />
                </button>
                <button className="text-settings" aria-label="Inline Code">
                  <img className="setting-icon" src={require("../../resources/images/inline.png")} />
                </button>
                <button className="text-settings" aria-label="Superscript">
                  <img className="setting-icon" src={require("../../resources/images/superscript.png")} />
                </button>
                <button className="text-settings spoiler" aria-label="Spoiler">
                  <img className="setting-icon" src={require("../../resources/images/spoiler.png")} />
                </button>
    
                <div className="line"></div>
    
                <button className="text-settings" aria-label="Heading">
                  <img className="setting-icon" src={require("../../resources/images/heading.png")} />
                </button>
                <button className="text-settings" aria-label="Bulleted">
                  <img className="setting-icon" src={require("../../resources/images/bulleted.png")} />
                </button>
                <button className="text-settings" aria-label="Numbered"> 
                  <img className="setting-icon" src={require("../../resources/images/numbered.png")} />
                </button>
                <button className="text-settings" aria-label="Quote Block">
                  <img className="setting-icon" src={require("../../resources/images/quote.png")} />
                </button>
                <button className="text-settings" aria-label="More">
                  <img className="setting-icon" src={require("../../resources/images/dots.png")} />
                </button>
    
                <button className="markdown" id="markdown">
                  <p style={{ color: currentSub?.buttonColor }}>Markdown Mode</p>
                </button>

                <button className="markdown submit" style={{ backgroundColor: comment.length >= 1 ? currentSub?.buttonColor : "#9a9a9a", color: comment.length >= 1 ? "white" : "#cdcdcd", cursor: comment.length >= 1 ? "pointer" : "not-allowed" }} onClick={submitComment}>
                  <p>Comment</p>
                </button>
              </div>
          </div>
        </div>

        <div className="comment-list">
          <div className="sorter">
            <h3 style={{ color: currentSub?.buttonColor }}>Sort By: Best</h3>
            <Dropdown 
              fill={currentSub?.buttonColor}
              className="dropdown"
            />
          </div>

          <div className="divider"></div>

          {currentPost.comments.map((comment, i) => {
            return <div className="comment" id={`${i}`}>
              <div className="comment-header">
                <img className="comment-avatar" src={require("../../resources/images/avatar3.PNG")} />
                <h4 className="comment-author">{comment.author}</h4>
                <h4 className="comment-timestamp">· {comment.time}</h4>
              </div>
              <div className="comment-content-container">
                    <div className="comment-line" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentSub!.buttonColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#edeff1"} style={{ backgroundColor: "#edeff1" }}></div>
                    <div className="right">
                      <p id="content">{comment.content}</p>
                      <div className="comment-footer">
                          <button className={`${i}`} onMouseEnter={handleHoverComment} onMouseLeave={handleHoverComment} onClick={handleLikeComment} id="upvote">
                            <img className="upvote" src={require(`../../resources/images/${comment.vote === 0 || comment.vote === -1 ? 
                                                                                           hoveredComments[i].upvote ? "upvoteHover.png" : "upvote.png" 
                                                                                           : "upvoted.png"}`)} 
                            />
                          </button>
        
                          <h3 className="votes">{comment.upvotes}</h3>
        
                          <button className={`${i}`} onMouseEnter={handleHoverComment} onMouseLeave={handleHoverComment} onClick={handleLikeComment} id="downvote">
                            <img className="downvote" src={require(`../../resources/images/${comment.vote === 0 || comment.vote === 1 ?
                                                                                            hoveredComments[i].downvote ? "downvoteHover.png" : "downvote.png"  
                                                                                            : "downvoted.png"}`)} 
                            />
                          </button>
                      </div>
                    </div>
              </div>
            </div>
          })}
        </div>
    </div>
  );
}
