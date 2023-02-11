import { useNavigate } from 'react-router';
import './index.css';

export default function Swiper(props){
    let {datas, width, loc} = props;
    let navigate = useNavigate();

    const handlerClick = (item)=>{
        navigate(`/commodity/${item.id}`)
    }

    return(
        <div className="swiper-container" style={{width:width+'px', }}>
            <div className="swiper-wrapper clearfix">
                <ul>
                    {
                        datas.map((item, index)=>(
                            <li 
                                key={item.id} 
                                style={{
                                    left:(index===loc)?'0px':((index>loc)?width*(index-loc)+'px':'-'+width*(loc-index)+'px')
                                }}
                                onClick={()=>{handlerClick(item)}}
                            >
                                <img src={item.imgUrl} alt={item.title} />
                            </li>
                        ))
                    }
                </ul>
                
            </div>
        </div>
    );
}