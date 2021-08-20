var options = {
  rememberUpgrade:true,
  transports: ['polling'],
  secure:false, 
  rejectUnauthorized: false,
};

var socket = io('http://3.213.192.193:8091', options);

socket.on('connect', function() {
  console.log(">> CONNECTION ESTABLISHED!");
});

socket.on('disconnect', function() {
  console.log('Disconnected!');
});

socket.on('error', function() {
  console.log('Disconnected due to error!');
});

socket.on('event:notification', function (data) {
  console.log('[NOTIFICATION]: '+ data);
  var payload = JSON.parse(data);
  var type = (payload.type == 'event.error') ? '[ERROR]: ' : '[INTERACTION]: ';

  var element = document.getElementById('notifications');
  element.innerHTML = `<br/>${type}${payload.data} - ${new Date().toLocaleDateString()}`;
});

socket.on('event:error', function (data) {
  console.log('[ERROR]: '+ data);
});

function generateRandomString() {
  var length = Math.floor((Math.random() * 50) + 30);
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

 return result;
}

function setInteractionAndBroadcast() {
  var input = document.getElementById('interaction').value;
  if (!input) {
    return window.alert('Please enter a new interaction');
  }

  const payload = JSON.stringify({
    type: 'event.interaction',
    data: input,
  });

  broadcast(payload);
}

function setErrorAndBroadcast() {
  const payload = JSON.stringify({
    type: 'event.error',
    data: generateRandomString(),
  });

  broadcast(payload);
}

function broadcast(data) {
  return socket.emit('event:broadcast', data);
}