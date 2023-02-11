import { useState, useEffect } from "react";

import './index.css';

import Swiper from './Swiper';

let count = 0;
let timer;

export default function NavSwiper(props){
    let [selected, setSelected] = useState(count);
    
    let {showSwiper, swiperData} = props;

    useEffect(()=>{
        count = 0;
        setSelected(count);
        timer = setInterval(()=>{
            count = (count+1)%swiperData.length;
            setSelected(count);
        },3000);
        return ()=>{
            clearInterval(timer);
        }
    }, [swiperData.length])

    const handlerClick = (index)=>{
        count = index;
        setSelected(count);
    }

    const handlerMouseEnter = ()=>{
        clearInterval(timer);
    }

    const handlerMouseLeave = ()=>{
        timer = setInterval(()=>{
            count = (count+1)%swiperData.length;
            setSelected(count);
        },3000);
    }

    return (
        <div 
            className="nav-swiper-container"
            style={{
                display:showSwiper?'block':'none'
            }}
        >
            <div 
                className="nav-swiper-wrapper main-box" 
                onMouseEnter={()=>{handlerMouseEnter()}}
                onMouseLeave={()=>{handlerMouseLeave()}}
            >
                <div className="left-navs">
                    <ul>
                        {
                            swiperData.map((item,index)=>(
                                <li 
                                    key={item.id} 
                                    onMouseEnter={()=>{handlerClick(index)}}
                                    className={`${selected===index?'active':''} transition-threes`}
                                >
                                    {item.title}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <Swiper datas={swiperData} width={1200} height={600} loc={selected} />
            </div>
        </div>
    );
}