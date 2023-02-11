import Footer from "../../../../components/Footer";
import TopHeader from "../../../../components/TopHeader";

import './index.css';

export default function ResultSuccess(){
    return (
        <div className="success-container">
            <TopHeader showLogin={false} />
            <div className="success-wrapper main-box">
                <span className="iconfont icon-chenggong"></span> 支付成功
            </div>
            <Footer />
        </div>
    );
}