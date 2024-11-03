// Select The Main Varialbes
let container = document.querySelector(".container");
let content = document.querySelector(".container > .content");
let btn = document.querySelector("button");

// Start With Fetch
btn.onclick = function () {
  getRepos();
  // this.className = "stop";
};

content.innerHTML ? content.innerHTML : content.remove();

function getRepos() {
  fetch("https://dummyjson.com/quotes")
    .then((respose) => respose.json())
    .then((repositories) => {
      for (let i = 0; i < repositories.limit; i++) {
        let mainDiv = document.createElement("div");
        mainDiv.classList.add("mainDiv");

        let textQuote = document.createElement("p");
        textQuote.classList.add("textQuote");

        textQuote.appendChild(
          document.createTextNode(`"${repositories.quotes[i].quote}"`)
        );

        let copyDiv = document.createElement("div");
        copyDiv.classList.add("copyDiv");
        copyDiv.innerHTML = "Copy Quote";
        let iconCopy = document.createElement("i");
        iconCopy.className = "fa-solid fa-copy iconCopy";
        copyDiv.addEventListener("click", (e) =>
          manageCopy(copyDiv, notifyText)
        );
        copyDiv.appendChild(iconCopy);

        let notifyText = document.createElement("span");
        notifyText.classList.add("notifyText");
        notifyText.innerHTML = "Copied!";

        let authorDiv = document.createElement("div");
        authorDiv.classList.add("authorDiv");
        let iconAuthor = document.createElement("i");
        iconAuthor.className = "fa-solid fa-feather-pointed";
        iconAuthor.classList.add("iconAuthor");
        let authorName = document.createElement("span");
        authorName.classList.add("authorName");
        authorName.appendChild(
          document.createTextNode(repositories.quotes[i].author)
        );

        mainDiv.appendChild(copyDiv);
        mainDiv.appendChild(notifyText);
        authorDiv.appendChild(iconAuthor);
        authorDiv.appendChild(authorName);
        mainDiv.appendChild(textQuote);
        mainDiv.appendChild(authorDiv);
        content.appendChild(mainDiv);
        container.appendChild(content);
      }
    });
}

function manageCopy(copyBtn, notifyText) {
  let txtForCopy = copyBtn.parentElement.querySelector(".textQuote").innerHTML;

  navigator.clipboard.writeText(txtForCopy);

  notifyText.classList.toggle("animate");
  notifyText.style.display = "block";
}
