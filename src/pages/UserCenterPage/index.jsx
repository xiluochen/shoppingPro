import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Logo from "../../components/Logo";
import TopHeader from "../../components/TopHeader";

import { userCenterItems } from "../../static/data";
import { requireLogout, requireUserInfo } from "../../static/require";

import './index.css';

let token = '';

export default function UserCenterPage(){
    let loc = useLocation();
    const navigate = useNavigate();
    let lastPath = loc.pathname.split('/').pop();

    let [userInfo, setUserInfo] = useState({});

    const logo = require('../../imgs/logo.png');

    let token = window.sessionStorage.getItem('token') || '';
    if(token===''){
        navigate('/login');
    }

    const askUserInfo = useCallback(async ()=>{
        let res = await requireUserInfo();
        if(res.status === 200){
            setUserInfo(res.data.data);
        }else {
            setUserInfo({});
        }
    }, [])

    const handlerUserClick = async ()=>{
        if(userInfo.username){
            let flag = window.confirm('是否登出?');
            if(flag){
                let res = await requireLogout();
                if(res.status === 200){
                    window.sessionStorage.removeItem('token');
                    navigate('/login', {
                        replace:true,
                    })
                }
            }
        }else {
            navigate('/login')
        }
    }

    useEffect(()=>{
        token = window.sessionStorage.getItem('token') || '';
        if(token){
            askUserInfo();
        }else {
            navigate('/login');
        }
    },[])

    const handlerChoiceClick = useCallback((path) => {
        navigate('/user/'+path);
    }, [navigate])

    return (
        <div className="user-center-container">
            <TopHeader />
            <div className="user-center-nav main-box">
                <Logo logo={logo} />
                <h2>个人中心</h2>
                <div className="user-tit">
                    <div className="avator">
                        <img src={userInfo.avator || require('../../imgs/logo.png')} alt="user avator" />
                    </div>
                    <div 
                        className="user-name"
                        onClick={handlerUserClick}
                    >
                        {
                            !userInfo.username ?
                            <div className="log-tip">
                                请先登录
                            </div>:
                            <div className="log-tip">
                                {userInfo.username}
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="user-center-body main-box">
                <div className="user-choice-item-box">
                    <ul>
                        {
                            userCenterItems.map((item, index)=>(
                                <li 
                                    className={`choice-item ${lastPath===item.page?'active':''}`} 
                                    key={item.id}
                                    onClick={()=>{handlerChoiceClick(item.page)}}
                                >
                                    {item.title}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="item-body">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}