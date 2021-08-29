const copyToClipboard = (e) => {
  const textArea = document.getElementById("roomID");
  textArea.select();
  document.execCommand("copy");
  e.target.focus();
};

export default copyToClipboard;
