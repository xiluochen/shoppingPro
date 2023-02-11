import { useNavigate } from 'react-router';
import './index.css';


export default function Logo(props){
    let {logo, className} = props;
    const navigate = useNavigate();

    const handlerHomepage = ()=>{
        navigate('/');
    }

    return (
        <div 
            className={"logo "+className}
            onClick={handlerHomepage}
        >
            <h1>蛋糕白白</h1>
            <img src={logo} alt={'logo'} />
        </div>
    );
}