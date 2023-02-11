import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';

import Logo from '../../components/Logo';
import TopHeader from '../../components/TopHeader';
import { requireLogin } from '../../static/require';

import './index.css';

export default function LoginPage(){

    const vmHeight = window.innerHeight;

    const name = useRef(), password=useRef(), logoRef = useRef();

    const navigate = useNavigate();

    const handlerMouseEnter = useCallback(()=>{
        logoRef.current.style.display = 'block';
        setTimeout(()=>{
            logoRef.current.style.left = '250px';
            logoRef.current.style.transform = 'rotateZ(360deg)';
        }, 1)
    }, []); 

    const handlerMouseLeave = useCallback(()=>{
        logoRef.current.style.left = '350px';
        logoRef.current.style.transform = '';
        setTimeout(()=>{
            logoRef.current.style.display = 'none';
        }, 200)
    }, []);

    const askLogin = useCallback(async (username, password)=>{
        let res = await requireLogin({
            username,
            password
        });
        if(res.status === 200){
            window.sessionStorage.setItem('token', res.data);
            navigate(-1);
        }
    }, [navigate]); 

    const handlerLogin = useCallback((e)=>{
        e.preventDefault();
        const userName = name.current.value, passw = password.current.value;
        name.current.value = '';
        password.current.value = '';
        askLogin(userName, passw)
    }, [askLogin]); 


    return (
        <div 
            className="login-container"
            style={{
                height:`${vmHeight}px`
            }}
        >
            <TopHeader />
            <div 
                className="login-body"
                style={{
                    height:`${vmHeight-30}px`
                }}
            >
                <div className="login-wrapper">
                    <div className="login-form-box">
                        <div className="login-form-tit">
                            <h2>
                                <span
                                    onMouseEnter={handlerMouseEnter}
                                    onMouseLeave={handlerMouseLeave} 
                                >
                                    Login
                                </span>
                                <div className='logo-contain' ref={logoRef}>
                                    <Logo logo={require('../../imgs/logo.png')} />
                                </div>
                            </h2>
                        </div>
                        <div className="login-form-content">
                            <form action=''>
                                <label className='login-item'>用户名:<input type='text' ref={name} /></label>
                                <label className='login-item'>密&emsp;  码:<input type='password' ref={password} /></label>
                                <button className='transition-fives' onClick={handlerLogin}>登&emsp;录</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}