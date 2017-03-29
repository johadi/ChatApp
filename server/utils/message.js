/**
 * Created by ILYASANATE on 29/03/2017.
 */
var generateMessage=(from,text)=>{
    return {
        from,text,createdAt: new Date().getTime()
    }
}

module.exports={generateMessage}