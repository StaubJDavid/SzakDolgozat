const countUnreadMessages = (friend:any, unreadMessages:any) => {
    return unreadMessages.filter((e:any) => 
        (friend.user_id === e.sender_id && friend.friend_id === e.reciever_id) || 
        (friend.user_id === e.reciever_id && friend.friend_id === e.sender_id)
    ).length
}

export default countUnreadMessages;