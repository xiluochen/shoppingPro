import axios from "axios";

const shopAxios = axios.create({
    method:'GET',
    baseURL:'/shop',
})

shopAxios.interceptors.request.use((config)=>{
    if(config.url.includes('/user') || config.url.includes('/payfor') || config.url==='/logout'){
        Object.assign(config.headers, {
            token:window.sessionStorage.getItem('token')||'',
        });
    }
    return config;
})

shopAxios.interceptors.response.use((res)=>{
    if(Array.isArray(res.data.data)) {
        res.data.data = res.data.data.map(item=>{
            if(item._id){
                return {...item, id:item._id}
            }
            return item;
        });
    }
    return res;
},(err)=>{
    if(err.response.status === 504){
        window.sessionStorage.removeItem('token');
    }
})

export const requireCommodityInfo = ({id}) => {
    return shopAxios(`/good/${id}`, {
        method:'GET',
    });
}

export const requireRecommend = () => {
    return shopAxios('/recommend', {
        method:'GET',
    });
}

export const requireRegister = (data)=>{
    return shopAxios('/login', {
        method:'POST',
        data
    })
}

export const requireLogin = (data)=>{
    return shopAxios('/login', {
        method:'GET',
        params:data,
    })
}

export const requireLogout = ()=>{
    return shopAxios('/logout', {
        method:'POST',
    })
}

export const requireUserInfo = ()=>{
    return shopAxios('/user', {
        method:'GET'
    })
}

export const requireAppendShopCar = ({id, num}) => {
    return shopAxios('/user/shopcar', {
        method:'POST',
        data: {
            target:id,
            num:num,
        }
    });
}

export const requireSwiperData = ()=>{
    return shopAxios('/swiper', {});
}

export const requireShopCar = () => {
    return shopAxios('/user/shopcar', {
        method:'GET',
    })
}

export const requirePay = ( data) => {
    return shopAxios('/payfor', {
        method:'post',
        data
    })
}

export const requireLocs = ()=>{
    return shopAxios('/user/locs', {
        method:'GET'
    })
}