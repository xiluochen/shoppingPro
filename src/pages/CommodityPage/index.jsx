import './index.css';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from "react-router";

import TopHeader from "../../components/TopHeader";
import { requireCommodityInfo, requireRecommend } from '../../static/require';

export default function CommodityPage(){
    const {id} = useParams();

    const navigate = useNavigate();

    const [recommendData, setRecommendData] = useState([]);
    
    const [commodityData, setCommodityData] = useState({});

    const [purchaseNums, setPurchaseNums] = useState(1);

    const askCommodityInfo = useCallback(async (id)=>{
        let res = await requireCommodityInfo({id});
        if(res.status === 200){
            setCommodityData(res.data);
        }else {
            setCommodityData({});
        }
    }, []); 

    const askRecommend = useCallback(async () => {
        let res = await requireRecommend();
        if(res.status === 200){
            setRecommendData(res.data);
        }else {
            setRecommendData([]);
        }
    }, []);

    useEffect(()=>{
        askRecommend();
    }, []);

    useEffect(()=>{
        askCommodityInfo(id);
    }, [id]);

    const handlerChangeNums = (e)=>{
        setPurchaseNums(Number(e.target.value));
    }

    const handlerRecommendClick = (id)=>{
        navigate(`/commodity/${id}`);
    }

    const handlerPurchase = ()=>{
        const token = window.sessionStorage.getItem('token') || '';
        if(purchaseNums>0 && token !== ''){
            navigate(`/settle/${id}/${purchaseNums}`);
        }else if(token === ''){
            navigate('/login');
        }
    }; 

    return (
        <div className="commodity-container">
            <TopHeader isShowLogin={true} />
            <div className="commodity-body">
                <div className="commodity-wrapper main-box">
                    <div className="commodity-info-box">
                        <div className="commodity-imgs">
                            <img src={commodityData.imgUrl} alt={commodityData.title} />
                        </div>
                        <div className="commodity-info">
                            <div className="title">{commodityData.title}</div>
                            <div className="sub-tit">{commodityData.title}</div>
                            <div className="price">单价:<span>{commodityData.price}</span>元</div>
                            <div className="numbers">
                                数量:
                                <input type='number' value={purchaseNums}  onChange={handlerChangeNums} />
                                <div className="controls-btns">
                                    <div className="up" onClick={()=>{setPurchaseNums(purchaseNums+1)}}><span className='iconfont icon-jiahao1'></span></div>
                                    <div className="down" disabled={purchaseNums>0} onClick={()=>{setPurchaseNums(purchaseNums>1?purchaseNums-1:0)}}><span className='iconfont icon-jianhao'></span></div>
                                </div>
                            </div>
                            <div className="confirm" onClick={handlerPurchase}>
                                <button 
                                    className='transition-threes'
                                    style={{
                                        disabled:`${purchaseNums<=0}`,
                                        opacity:`${purchaseNums>0?'1':'.6'}`
                                    }}
                                >
                                    加入购物车
                                </button>
                            </div>
                        </div>
                        <div className="commodity-extend-box">
                            <div className="commodity-extend-wrapper">
                                <div className="left-recommend-box">
                                    <ul>
                                        {
                                            recommendData.map((item, index)=>(
                                                <li 
                                                    className='recommend-items' 
                                                    key={item.id}
                                                    onClick={()=>{handlerRecommendClick(item.id)}}
                                                >
                                                    <img src={item.imgUrl} alt={item.title} />
                                                    <div className="recommend-title">
                                                        {item.title}
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="commodity-introduce-box">
                                    {commodityData.introduction||'暂无介绍'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}