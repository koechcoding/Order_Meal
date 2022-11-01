export default function flattenObject(obj){
    let result = {}
    for (const key in obj){
        if((typeof obj[key])=== 'object' &&  obj[key]  !== null) {
            let flattened = flattenObject(obj[key])
            for(const key2 in flattened){
                result[key + "." + key2] = flattened[key2];
            }
        }else{
            result[key] = obj[key];
        }
    }
    return result;
}