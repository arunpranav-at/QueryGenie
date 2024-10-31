import streamlit as st

# Basic CSS for positioning
st.markdown("""
    <style>
    .avatar-container {
        position: absolute;
        top: -50px;
        right: -200px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }
    .dropdown-content {
        display: none;
        position: absolute;
        top: 50px;
        right: 10px;
        background-color: #f9f9f9;
        min-width: 150px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 10px;
        z-index: 1;
    }
    .avatar-container:hover .dropdown-content {
        display: block;
    }
    .message-container {
        max-height: 70vh;
        overflow-y: auto;
        padding-bottom: 60px; /* Space for the input box */
    }
    .fixed-bottom-input {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 10px;
        z-index: 1000;
        margin-left: -15%;
    }
    .input-box {
        width: 75%;
        padding: 8px;
        font-size: 16px;
        padding-right: 40px; /* Add space for the icon */
        box-sizing: border-box; /* Ensures padding is included in total width */
    }
    .send-icon {
        position: absolute;
        right: 10px; /* Position the icon inside the input */
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        width: 20px; /* Adjust the icon size */
        height: 20px; /* Adjust the icon size */
    }
    </style>
""", unsafe_allow_html=True)

# Avatar in the top-right with dropdown options
st.markdown("""
<div class="avatar-container">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD116U9ZCk8bEaanCeB5rSCC2uqY5Ka_2_EA&s" class="avatar" alt="User Avatar"/>
    <div class="dropdown-content">
        <p><strong>Name:</strong> Jane Doe</p>
        <p><a href="#">Dashboard</a></p>
        <p><a href="#">Logout</a></p>
    </div>
</div>
""", unsafe_allow_html=True)

# Sidebar and Chat Interface for messages
with st.sidebar:
    st.title("Chat History")
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = {"Chat 1": [], "Chat 2": []}

    selected_chat = st.selectbox("Select a chat", list(st.session_state.chat_history.keys()))

# Chat interface
st.title("ChatGPT Interface Clone")

# Display the selected chat's messages
st.markdown('<div class="message-container">', unsafe_allow_html=True)
st.subheader(f"Chatting in: {selected_chat}")
messages = st.session_state.chat_history[selected_chat]

for msg in messages:
    st.write(f"{msg['sender']}: {msg['text']}")
st.markdown('</div>', unsafe_allow_html=True)

# Bottom Input Box for New Messages
if "user_input" not in st.session_state:
    st.session_state["user_input"] = ""

# Create input box with send icon
st.markdown(
    """
    <div class="fixed-bottom-input">
        <div style="position: relative;">
            <input type="text" id="user_input" class="input-box" placeholder="Type your message here..." oninput="setInputValue(this.value)">
            <img class="send-icon" src="https://img.icons8.com/ios-filled/50/4CAF50/send.png" alt="Send" onclick="sendMessage()"/> <!-- Send icon -->
        </div>
    </div>
    <script>
    function setInputValue(value) {
        window.parent.postMessage(value, '*');
    }
    function sendMessage() {
        const inputField = document.getElementById('user_input');
        if (inputField.value.trim() !== '') {
            window.parent.postMessage('submit', '*');
        }
    }
    </script>
    """, unsafe_allow_html=True
)

# Capture input when "Send" icon is clicked
if st.session_state.user_input:
    messages.append({"sender": "User", "text": st.session_state.user_input})
    bot_response = f"Echo: {st.session_state.user_input}"
    messages.append({"sender": "Bot", "text": bot_response})
    st.session_state.user_input = ""  # Clear input for next message
