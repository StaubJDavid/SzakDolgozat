const getMessageKey = (object,reciever_id, sender_id) => {  
  if(object.hasOwnProperty(sender_id.valueOf() + "_" + reciever_id.valueOf())) {
    return sender_id.valueOf() + "_" + reciever_id.valueOf();

  }else if(object.hasOwnProperty(reciever_id.valueOf() + "_" + sender_id.valueOf())){
    return reciever_id.valueOf() + "_" + sender_id.valueOf();
  }

  return "";
}

module.exports = getMessageKey;