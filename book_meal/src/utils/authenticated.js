export default function authenticated(){
    try{
        return JSON.parse(localStorage.getItem('user'));
    } catch(err){
        
    }
}