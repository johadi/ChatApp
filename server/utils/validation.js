/**
 * Created by ILYASANATE on 03/04/2017.
 */
var isRealString=(str)=>{
    return typeof str ==='string' && str.trim().length > 0;
};
module.exports={isRealString};