// SPDX-License-Identifier: GPT-3.0

pragma solidity >=0.7.0 < 0.9.0;

contract Upload{
    struct Access{
        address user;
        bool access;
    }
    mapping(address=>string[]) value;   // url store hoga 
    mapping(address=>mapping(address=>bool)) ownership;
    mapping(address=>Access[]) accessList; // to give access
    mapping(address=>mapping(address=>bool)) previousData;

    function add(address _user, string calldata url) external{
        value[_user].push(url);
    }

    function allow(address user) external{
        ownership[msg.sender][user]=true;
        if(previousData[msg.sender][user]==true){
            for(uint i=0; i<accessList[msg.sender].length; i++){
                if(accessList[msg.sender][i].user==user){
                    accessList[msg.sender][i].access=true;
                }
            }
        }
        else{
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user]=true;
        }
    }

    function disallow(address user) external{   //revoking access
        ownership[msg.sender][user]=false;
        for(uint i=0; i<accessList[msg.sender].length;i++){
            if(accessList[msg.sender][i].user == user){
                accessList[msg.sender][i].access=false;
            }
        }
    }

    function display(address _user) external view returns(string[] memory){
        require(_user==msg.sender || ownership[_user][msg.sender], "You don't have access");
        return value[_user];    //values ke ander url hai
    }

    function shareAccess() public view returns(Access[] memory){
        return accessList[msg.sender];
    }
}