/**
 * Created by ILYASANATE on 03/04/2017.
 */
const expect=require('expect');
const {Users}=require('./users');

describe('Users',()=>{
    var newUsers;
    beforeEach(()=>{
        newUsers=new Users();

        newUsers.users=[
            {id: '1',name: 'Emma',room: 'java course'},
            {id: '2',name: 'johman',room: 'node course'},
            {id: '3',name: 'mohzak',room: 'java course'}
        ]
    });
    it('should return a new user',()=>{
        var users=new Users();
        var user={
            id: '123',
            name: 'jimoh',
            room: 'react course'
        }
        var returned_user=users.addUsers(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for java course',()=>{
        var userList=newUsers.getUserList('java course');

        expect(userList).toEqual(['Emma','mohzak']);
    });

    it('should return names for node course',()=>{
        var userList=newUsers.getUserList('node course');

        expect(userList).toEqual(['johman']);
    });
    it('should find user with id',()=>{
       var id='2';
       var user=newUsers.getUser(id);

       expect(user.id).toBe(id);
    });
    it('should not find any user with id',()=>{
        var id='100';
        var user=newUsers.getUser(id);

        expect(user).toNotExist();
    });
    it('should remove a user',()=>{
        var id='1';
        var user=newUsers.removeUser(id);

        expect(user.id).toBe(id);
        expect(newUsers.users.length).toBe(2);
    });
    it('should not remove a user',()=>{
        var id='100';
        var user=newUsers.removeUser(id);

        expect(user).toNotExist();
        expect(newUsers.users.length).toBe(3);
    })
})