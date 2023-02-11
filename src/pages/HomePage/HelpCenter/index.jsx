import './index.css';

import { helps } from '../../../static/data';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';

export default function HelpCenter(){

    const [isShowBody, setIsShowBody] = useState(false);

    const navigate = useNavigate();

    const handlerClick = useCallback((url)=>{
        navigate(url);
    }, [navigate]) 

    const handlerShowHelpBody = useCallback(()=>{
        setIsShowBody(!isShowBody);
    }, [isShowBody])

    return (
        <div className="help-container">
            <div 
                className="help-wrapper main-box"
                style={{
                    boxShadow: isShowBody?'0 0 5px rgba(0, 0, 0, .3)':'',
                }}
            >
                <div 
                    className="help-tit"
                    onClick={handlerShowHelpBody}
                >
                    <h2>
                        帮助中心
                        <span 
                            className={`iconfont ${isShowBody?'icon-xiangshangjiantou':'icon-xiangxiajiantou'}`}
                            style={{
                                fontSize:'12px',
                                marginLeft:'10px'
                            }}
                        >
                        </span>
                        </h2>
                </div>
                <div 
                    className="help-body transition-fives"
                    style={{
                        height: isShowBody?'200px':'0px',
                    }}
                >
                    <ul>
                        {
                            helps.map(item=>(
                                <li 
                                    className='help-item float-left' 
                                    key={item.id}
                                >
                                    <div className="help-item-head">
                                        {item.title}
                                    </div>
                                    <div className="help-item-children">
                                        {
                                            item.children.map(child=>(
                                                <div 
                                                    className="children-item" 
                                                    key={child.id}
                                                    onClick={()=>{handlerClick(child.target)}}
                                                >
                                                    {child.title}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    
                </div>
            </div>
        </div>
    );
}