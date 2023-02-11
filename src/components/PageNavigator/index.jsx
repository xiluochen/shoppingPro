

import './index.css';

export default function PageNaviagtor(props={divid:3}){
    let {startLoc, endLoc, nowLoc, divid} = props;
    return (
        <div className="page-navigator-container">
            <ul>
                {
                    (()=>{
                        let page = [], div = Math.floor(divid/2);
                        if(nowLoc-div>startLoc){
                            page.push((
                                <li className="page-item" data-index={startLoc} key={startLoc}>{startLoc}</li>
                            ))
                        }
                        if(nowLoc-div>startLoc+1){
                            page.push((
                                <li className="page-item" key={'other_1'}>...</li>
                            ))
                        }
                        for(let i=-div;i<=div;i++){
                            let noi = nowLoc+i;
                            if(noi<startLoc||noi>endLoc)continue;
                            page.push((
                                <li className={`page-item ${i===0?'active':''}`} key={noi} data-index={noi}>{noi}</li>
                            ))
                        }
                        if(nowLoc+div<endLoc-1){
                            page.push((
                                <li className="page-item" key={'other_2'}>...</li>
                            ))
                        }
                        if(div+nowLoc<endLoc){
                            page.push((
                                <li className="page-item" key={endLoc} data-index={endLoc}>{endLoc}</li>
                            ))
                        }
                        return page;
                    })()
                }
            </ul>
        </div>
    );
}