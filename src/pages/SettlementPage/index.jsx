import { useCallback, useMemo } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Footer from "../../components/Footer";
import TopHeader from "../../components/TopHeader";
import { requireAppendShopCar, requireCommodityInfo } from "../../static/require";

import './index.css';

export default function SettlementPage(){
    const params = useParams();
    const navigate = useNavigate();

    let {id, num} = params;
    const token = useMemo(()=>(window.sessionStorage.getItem('token') || ''),[]); 

    const [commodity, setCommodity] = useState({});

    const handlerConfirm = useCallback(async ()=>{
        let res = await requireAppendShopCar({token, id, num})
        if(res.status === 200) {
            navigate('/user/shopcar');
        }else {
            console.log(res.data);
        }
    }, [id, token, num, navigate]);

    const handlerCancel = useCallback(()=>{
        navigate(-1);
    }, [navigate]); 

    const askCommodityInfo = useCallback(async ()=> {
        let res = await requireCommodityInfo({id});
        if(res.status === 200){
            setCommodity(res.data)
        }else {
            console.log(res.data);
            setCommodity({})
        }
    }, [id]) 

    useEffect(()=>{
        askCommodityInfo();
    }, [id, askCommodityInfo])

    return (
        <div className="settle-container">
            <TopHeader isShowLogin={false} />
            <div className="settle-body main-box">
                <div className="settle-wrapper">
                    <div className="settle-tit">
                        <span>确认商品信息</span>
                    </div>
                    <div className="confirm-purchase clearfix">
                        <div className="commodity-info-box">
                            <div className="purchase-info-tit">
                                <div className="img">商品图片</div>
                                <div className="title">商品名称</div>
                                <div className="nums">数量</div>
                                <div className="price">单价</div>
                                <div className="whole-price">总价</div>
                                <div className="others">其他</div>
                            </div>
                            <div className="purchase-info-container">
                                <div className="img"><img src={commodity.imgUrl} alt={commodity.title} /></div>
                                <div className="title">{commodity.title}</div>
                                <div className="nums">{num}</div>
                                <div className="price">{commodity.price}元</div>
                                <div className="whole-price">{commodity.price*num}元</div>
                                <div className="others"></div>
                            </div>
                        </div>
                        <div className="confirm-button">
                            <button className="cancel" onClick={handlerCancel}>取消</button>
                            <button className="confirm" onClick={handlerConfirm}>确认添加</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}