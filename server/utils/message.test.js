/**
 * Created by ILYASANATE on 29/03/2017.
 */
var expect=require('expect');

var {generateMessage}=require('./message');

describe('generatemessage',()=>{
    it('should generate correct message object',()=>{
        var from='hadi';
        var text='a test is calling you';
        var message=generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text})
    });
})