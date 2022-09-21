const socket = io.connect("http://192.168.1.8:6677", { forceNew: true });
// const socket = io.connect("", { forceNew: true });
socket.on("messages", (data) => {
	console.log(data);
	render(data);
});

const render = (data) => {
	const html = data
		.map((message, index) => {
			return `
            <div class='message'>
                <strong>${message.nickname}</strong> <small>ha escrito:</small>
                <p>${message.text}</p>
            </div>
        `;
		})
		.join(" ");
	const divMsgs = document.getElementById("messages");
	divMsgs.innerHTML = html;
	divMsgs.scrollTop = divMsgs.scrollHeight;
};

const addMessage = (e) => {
	// e.preventDefault();
	const textInput = document.getElementById("text");
	const nicknameInput = document.getElementById("nickname");
	if (!textInput.value || !nicknameInput.value) return;
	const message = { nickname: nicknameInput.value, text: textInput.value };
	nicknameInput.style.display = "none";
	socket.emit("add-message", message);
	textInput.value = "";
	return false;
};
