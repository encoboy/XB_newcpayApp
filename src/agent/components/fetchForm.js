export default (obj) => {
    let url1 =  process._root+obj.api;
    let protocol = window.location.protocol + '//';
    let url = process._root + (obj.api || '');
    let method = obj.method || 'POST';
    let headers = { 'Content-type': 'multipart/form-data' };
    let formData = new FormData();
    let keyArray = Object.keys(obj.data);
    let valueArr = Object.values(obj.data);
    for (let i = 0; i < keyArray.length; i++) {
        formData.append(keyArray[i], valueArr[i])
    }
    return fetch(url, {
        method: method,
        mode: 'cors',
        credentials: 'include',
        // headers: headers,
        body: formData
    }).then(r => r.json())
        .then(data => {
            return data;
        })
        .catch(e => {
            console.log('请求错误', e);

        })
}