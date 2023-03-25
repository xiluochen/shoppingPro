import axios from "axios";

const shopAxios = axios.create({
    method:'GET',
    baseURL:'http://127.0.0.1:4000',
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
        data
    })
}

export const requireUserInfo = (token)=>{
    return shopAxios('/user', {
        method:'GET',
        headers:{
            token,
        }
    })
}

export const requireAppendShopCar = ({id, num, token}) => {
    return shopAxios('/user/shopcar', {
        method:'POST',
        data: {
            id:id,
            num:num,
        },
        headers:{
            token
        }
    });
}

export const requireSwiperData = ()=>{
    return shopAxios('/swiper', {});
}

export const requireShopCar = (token) => {
    return shopAxios('/user/shopcar', {
        method:'GET',
        headers: {
            token,
        }
    })
}

export const requirePay = (token, data) => {
    return shopAxios('/payfor', {
        method:'post',
        headers:{
            token
        },
        data
    })
}

export const requireLocs = (token)=>{
    return shopAxios('/user/locs', {
        method:'GET',
        headers:{
            token
        }
    })
}