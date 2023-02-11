import axios from "axios";

const requireAxios = (path, options)=>{
    return new Promise((resolve, reject)=>{
        axios(path, options)
            .then((res)=>{
                resolve(res);
            })
            .catch((err)=>{
                reject(err);
            })
    })  
}

export const requireAppendShopCar = ({id, num}) => {
    return requireAxios('/appendshopcar', {
        method:'post',
        data: {
            id:id,
            num:num,
        }
    });
}

export const requireCommodityInfo = ({id}) => {
    return requireAxios('/commodity', {
        method:'post',
        data:{id: id,}
    });
}

export const requireRecommend = () => {
    return requireAxios('/recommend', {
        method:'get',
    });
}

export const requireLogin = (data)=>{
    return requireAxios('/login', {
        method:'post',
        data
    })
}

export const requireUserInfo = (token)=>{
    return requireAxios('/userinfo', {
        method:'post',
        data: {
            token
        }
    })
}

export const requireSwiperData = ()=>{
    return requireAxios('/swiperdata', {});
}

export const requireShopCar = (token) => {
    return requireAxios('/shopcar', {
        method:'post',
        data: {
            token,
        }
    })
}

export const requirePay = (data) => {
    return requireAxios('/pay', {
        method:'post',
        data
    })
}

export const requireLocs = (token)=>{
    return requireAxios('/locs', {
        method:'get',
        data:{
            token
        }
    })
}