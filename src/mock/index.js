import Mock from 'mockjs';
import { nanoid } from 'nanoid';

const swiperData = [
    {
        id: nanoid(),
        title:'甜品1',
        imgUrl: require('../imgs/甜品1.png'),
        price: 28,
    },
    {
        id: nanoid(),
        title:'甜品2',
        imgUrl: require('../imgs/甜品2.png'),
        price: 32,
    },
    {
        id: nanoid(),
        title:'甜品3',
        imgUrl: require('../imgs/甜品3.png'),
        price: 30,
    },
    {
        id: nanoid(),
        title:'甜品4',
        imgUrl: require('../imgs/甜品4.png'),
        price: 27,
    },
    {
        id: nanoid(),
        title:'甜品5',
        imgUrl: require('../imgs/甜品5.png'),
        price: 18,
    },
    {
        id: nanoid(),
        title:'甜品6',
        imgUrl: require('../imgs/甜品6.png'),
        price:6,
    },
]

const userInfo = {
    userName:'abalabala',
    avator: require('../imgs/avator.jpg'),
    shopcar: [],
    locations:[
        {
            id:nanoid(),
            target:'aaa',
            loc:'河北省承德市隆化县aaac小区1单元505',
            phone:'12345678901',
            default:true,
        },
        {
            id:nanoid(),
            target:'ccc',
            loc:'河北省承德市隆化县aaac小区1单元505',
            phone:'12345678901',
        },
        {
            id:nanoid(),
            target:'bbb',
            loc:'河北省承德市隆化县aaac小区1单元505',
            phone:'12345678901',
        },
    ],
};

Mock.mock('/login', 'post', (require)=>{
    let n_k = JSON.parse(require.body);
    if(n_k.username === 'admin'&&n_k.password==='123'){
        return Mock.mock('abcedff');
    }
    return 'input error'
    
}); 

Mock.mock('/userinfo', 'post', (require)=>{
    let reqData = JSON.parse(require.body);
    if(reqData.token !== ''){
        return Mock.mock({
            ...userInfo,
            token:reqData.token,
        })
    }
    return 'error token';
}); 

Mock.mock('/swiperdata', 'get', ()=>{
    return Mock.mock(swiperData);
});

Mock.mock('/recommend', 'get', ()=>{
    return Mock.mock(swiperData);
});

Mock.mock('/appendshopcar', 'post', (require)=>{
    const {token, id, num} = JSON.parse(require.body);
    let search = userInfo.shopcar.filter((item)=>(item.info.id===id));
    if(search.length === 0){
        userInfo.shopcar.push({
            id,
            info: swiperData.filter(item=>item.id===id)[0],
            num
        })
    }else {
        search[0].num = Number(search[0].num)+Number(num);
    }
    return Mock.mock('success')
})

Mock.mock('/commodity', 'post', (require)=>{
    let {id} = JSON.parse(require.body);
    return Mock.mock(swiperData.filter(item=>(item.id===id))[0])
})

Mock.mock('/shopcar', 'post', (require)=>{
    let {token} = JSON.parse(require.body);
    return Mock.mock(userInfo.shopcar);
})

Mock.mock('/pay', 'post', (require)=>{
    let {token, shops} = JSON.parse(require.body);
    return Mock.mock('success');
})

Mock.mock('/defloc', 'get', (require)=>{
    // let {token} = JSON.parse(require.body);
    return Mock.mock(userInfo.locations.filter((item)=>item.default)[0]);
})

Mock.mock('/locs', 'get', (require)=>{
    // let {token} = JSON.parse(require.body);
    return Mock.mock(userInfo.locations);
})