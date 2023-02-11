import Logo from '../Logo';
import './index.css'
import { infos } from '../../static/data';

const logo = require('../../imgs/logo.png');

export default function Footer(){

    // const navigate = useNavigate();

    return (
        <div className="footer-container">
            <div className="footer-wrapper main-box">
                <Logo logo={logo} />
                <div className="info-container">
                    {
                        infos.map(item=>(
                            <div 
                                className="info" 
                                key={item.id}
                                // onClick={()=>{item.target&&navigate(item.target)}}
                            >
                                {item.title}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}