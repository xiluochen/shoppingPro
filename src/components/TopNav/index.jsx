import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { requireSwiperData } from '../../static/require';

import Logo from '../Logo';
import NavSwiper from '../NavSwiper';
import { navItems } from '../../static/data';
import './index.css';

const logo = require('../../imgs/logo.png');

export default function TopNav(props){
    let {showSwiper} = props;

    const [swiperData, setSwiperData] = useState([]);

    const navigate = useNavigate();

    const askSwiperData = async()=>{
        let res = await requireSwiperData();
        if(res.status === 200){
            setSwiperData(res.data.data);
        }
    }

    useEffect(()=>{
        askSwiperData();
    }, [])

    return (
        <div className="top-nav-container">
            <div className="nav-items-container">
                <div className="nav-items-wrapper main-box">
                    <Logo logo={logo} />
                    <div className="items-main-container">
                        <ul>
                            {
                                navItems.map((item, index)=>(
                                    <li 
                                        className='nav-item float-left transition-threes'
                                        key={item.id}
                                        onClick={()=>{navigate(item.target)}}
                                    >
                                        {item.title}
                                        {
                                            item.children &&
                                            <div 
                                                className="nav-item-children transition-fives"
                                            >
                                                <ul>
                                                    {
                                                        item.children.map((child)=>(
                                                            <li
                                                                className='nav-item-child-li'
                                                                key={child.id}
                                                            >
                                                                {child.title}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <NavSwiper showSwiper={showSwiper} swiperData={swiperData} />
        </div>
    );
}