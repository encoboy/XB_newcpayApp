
// 传进来的date是中国标准时间，type是yesterday，tomorrow，today;
// 返回的日期格式是 yyyymmdd

let DateFormat = (date,type) =>{
    let nowDate = date || new Date();
    switch(type){
        case 'today':
            // console.log(nowDate);
            break;
        case 'yesterday':
            nowDate.setTime(nowDate.getTime()-24*60*60*1000);
            break;
        case 'tomorrow':
            nowDate.setTime(nowDate.getTime()+24*60*60*1000);
            break;
        default:
            
    };
    let Month = (nowDate.getMonth()+1).toString();
    let day = nowDate.getDate();
    if(Month>=1 && Month<=9){
        Month = "0" + Month;
      }
      if(day>=0 && day<=9){
        day = "0" + day;
      }
      let paramsDate = nowDate.getFullYear()+Month+day;
      return paramsDate;
}

export default DateFormat;