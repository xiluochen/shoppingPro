import { useCallback } from "react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import PageNaviagtor from "../../../../components/PageNavigator";
import { requireShopCar } from "../../../../static/require";

import './index.css';

export default function ShopCar(){

    const navigate = useNavigate();

    let [shopCarData, setShopCar] = useState([]);

    let [pageParams, setPages] = useState([]);

    let [payParams, setPay] = useState([0,0]);

    const token = useMemo(()=>(window.sessionStorage.getItem('token') || ''),[]);

    const askShopCar = async ()=>{
        let res = await requireShopCar();
        if(res.status === 200){
            res.data.forEach(item=>{
                item.isClicked = false;
            })
            setShopCar(res.data);
            let mid = Math.ceil(res.data.length/5);
            setPages([1, mid, 1, 3]);
            setPay([0, 0]);
        }
    }

    const handlerClick = useCallback((event, id)=>{
        let objs = [...shopCarData];
        objs.forEach(item=>{
            if(item.id === id){
                item.isClicked = !item.isClicked;
            }
        })
        setShopCar(objs);
    }, [shopCarData]); 

    const handlerChangePage = useCallback((event)=>{
        event.stopPropagation();
        let page = Number(event.target.dataset.index);
        let poog = pageParams.concat();
        if(poog[2] === page)return;
        poog[2] = page;
        setPages(poog);
    }, [pageParams])

    const handlerWholeShopCar = (event)=>{
        event.stopPropagation();
        let objs = [...shopCarData];
        objs.forEach((item, index)=>{
            if(index>=(pageParams[2]-1)*5&&index<pageParams[2]*5){
                item.isClicked = event.target.checked;
            }
        })
        setShopCar(objs);
    }

    const handlerPayFor = ()=>{
        if(pageParams[0]>0)
            navigate('/payfor', {
                state: {
                    payData:shopCarData.filter((item)=>(item.isClicked))
                }
            })
    }

    useEffect(() => {
        if(token){
            askShopCar();
        }
    }, [token])

    useEffect(()=>{
        setPay(shopCarData.reduce((prev, item)=>{
            if(item.isClicked){
                prev[0]+=Number(item.num);
                prev[1]+=Number(item.info.price*item.num);
            }
            return prev;
        }, [0,0]));
    }, [shopCarData])
    

    return (
        <div className="shopcar-container">
            <div className="shopcar-wrapper">
                <div className="shopcar-body">
                    <div className="item-info-tit">
                        <div className="img">????????????</div>
                        <div className="tit">????????????</div>
                        <div className="price">??????(???)</div>
                        <div className="num">??????(???)</div>
                        <div className="whole-price">??????(???)</div>
                    </div>
                    <ul>
                        {
                            shopCarData.length>0?shopCarData.filter((item,index)=>(index>=(pageParams[2]-1)*5&&index<pageParams[2]*5)).map((item, index)=>{
                                    return (
                                        <li 
                                            className="shopcar-item"
                                            key={item.id}
                                        >
                                            <div className="clickable"><input type='checkbox' value='' checked={item.isClicked} onChange={(event)=>handlerClick(event, item.id)}/></div>
                                            <div className="img"><img src={item.info.imgUrl} alt={item.info.title} /></div>
                                            <div className="title">{item.info.title}</div>
                                            <div className="price">{item.info.price}</div>
                                            <div className="num">{item.num}</div>
                                            <div className="whole-price">{item.num * item.info.price}</div>
                                        </li>
                                    )
                                }
                            ):'???'
                        }
                    </ul>
                    <div 
                        className="shopcar-footer" 
                        style={{
                            display:shopCarData.length>0?'block':'none'
                        }}
                    >
                        <div className="left-choose-whole">
                            <input type='checkbox' 
                                checked={shopCarData.reduce((prev, item, index)=>{
                                    if(index>=(pageParams[2]-1)*5&&index<pageParams[2]*5){
                                        return prev&&item.isClicked;
                                    }else {
                                        return prev;
                                    }
                                },true)} onChange={handlerWholeShopCar} />
                            ??????
                        </div>
                        <div 
                            className="page-navigate" 
                            onClick={handlerChangePage}
                        >
                            <PageNaviagtor startLoc={pageParams[0]} endLoc={pageParams[1]} nowLoc={pageParams[2]} divid={pageParams[3]} />
                        </div>
                        <div className="right-buy">
                            ???
                            <span className="nums">
                                {payParams[0]}?????????
                            </span>
                            <span>
                                {payParams[1]}???
                            </span>
                            <button disabled={payParams[0]===0} onClick={handlerPayFor}>??????</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}