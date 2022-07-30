window.onload = function () {
	var app = new Vue({
	  delimiters: ['[[', ']]'],
	  el: '#app',
	  data: {
	    messages: [],
	    input: '',
	    send_blank: false,
	    placeholder: 'Send a message to the chatbot...',
	  },
	  created: function() {
	  	
	  },
	  methods: {
		add_message: function() {
			if (this.input.length > 0) {
				var message = {
					'text': this.input,
					'user': true,
					'chat_bot': false,
				};
				this.messages.push(message);
				this.input = '';
				window.scrollTo(0, document.body.scrollHeight);
				//just incase
				this.send_blank = false;
				this.placeholder = "Send a message to the chatbot...";
				window.scrollTo(0, document.body.scrollHeight);
				fetch("/get-response/", {
			        body: JSON.stringify({'message': message['text']}),
			        cache: 'no-cache', 
			        credentials: 'same-origin', 
			        headers: {
				        'user-agent': 'Mozilla/4.0 MDN Example',
				        'content-type': 'application/json'
			        },
			        method: 'POST',
			        mode: 'cors', 
			        redirect: 'follow',
			        referrer: 'no-referrer',
			        })
			        .then(response => response.json()).then((json) => {
			          	this.messages.push(json['message']);
			          	window.scrollTo(0, document.body.scrollHeight);
			    	})
			} else {
				this.send_blank = true;
				this.placeholder = "Please put in some text";
				window.scrollTo(0, document.body.scrollHeight);
			}

		},
		check_content: function() {
			if (this.input.length > 0) {
				this.send_blank = false;
				this.placeholder = "Send a message to the chatbot...";
				window.scrollTo(0, document.body.scrollHeight);
			} else {
				this.send_blank = true;
				this.placeholder = "Please put in some text";
				window.scrollTo(0, document.body.scrollHeight);
				
			}
		},
	  }
	});
};

	