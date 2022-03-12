const checkIfHasMessageProperty = (object,reciever_id, sender_id) => {  
  return object.hasOwnProperty(sender_id.valueOf() + "_" +reciever_id.valueOf()) || object.hasOwnProperty(reciever_id.valueOf() + "_" +sender_id.valueOf())
}

module.exports = checkIfHasMessageProperty;