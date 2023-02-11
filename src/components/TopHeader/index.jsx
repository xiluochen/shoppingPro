import './index.css';

import { items } from '../../static/data';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { requireUserInfo } from '../../static/require';

let token = '';

export default function TopHeader(props){
    let location = '天津'; // 定位获取的
    let { isShowLogin } = props;

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({});

    const handlerHeadClick = (e, clickItem)=>{
        e.stopPropagation();
        navigate(clickItem.target,
            {
                state:{
                    token:'aaa'
                }
            }
        );
    }

    const askUserInfo = async ()=>{
        let res = await requireUserInfo('/userinfo', {
            method:'post',
            data: {
                token:token
            }
        });
        if(res.status === 200){
            setUserInfo(res.data);
        }
    }

    useEffect(()=>{
        token = window.sessionStorage.getItem('token') || '';
        if(token){
            askUserInfo();
        }
    }, [])

    return (
        <div className="header-container">
            <div className="header-wrapper main-box clearfix">
                <div className="left-location float-left">
                    <span 
                        className='iconfont icon-31dingwei'
                        style={{
                            color:'#7ED9F6'
                        }}
                    ></span>
                    {location}
                </div>
                <div className="right-items float-right">
                    {
                        !token ?
                        <div 
                            className="log float-left transition-threes" 
                            style={{display:isShowLogin?'block':'none'}}
                            onClick={()=>{navigate('/login')}}
                        >
                            点我<span className='transition-threes'>登录</span>
                        </div>
                        :
                        <div 
                            className="log float-left transition-threes" 
                            style={{display:isShowLogin?'block':'none'}}
                            onClick={()=>{navigate('/user')}}
                        >
                            你好,{userInfo.userName}
                        </div>
                    }
                    
                    <div className="items-container float-left">
                        <ul>
                            {
                                items.map((item, index)=>(
                                    <li 
                                        className={`float-left transition-threes ${item.hasChild?"has-children":"no-children"}`} 
                                        key={item.id}
                                        onClick={(e)=>{item.hasChild && handlerHeadClick(e,item)}}
                                    >
                                        <div className="split-line float-left"></div>
                                        <div 
                                            className={`item float-left`} 
                                        >
                                            {item.title}
                                            {
                                                item.hasChild && 
                                                <div className="center-control">
                                                    <ul>
                                                        {
                                                            item.children.map((child, ind)=>(
                                                                <div 
                                                                    className='item-list' 
                                                                    key={item.id+'-'+ind}
                                                                >
                                                                    <ul>
                                                                        {
                                                                            child.map(nowChil=>(
                                                                                <li 
                                                                                    className='float-left' 
                                                                                    key={nowChil.id}
                                                                                    onClick={(e)=>{handlerHeadClick(e, nowChil)}}
                                                                                >
                                                                                    {nowChil.title}
                                                                                </li>
                                                                            ))
                                                                        }
                                                                        
                                                                    </ul>
                                                                </div>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}