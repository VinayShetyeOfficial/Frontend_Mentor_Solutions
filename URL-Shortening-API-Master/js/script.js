const validateURL = (url) => {
    const regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
    return regex.test(url);
}

const shortenURL = () => {
    event.preventDefault();

    const inputURL = document.getElementById("url");
    const formInput = document.querySelector('.form-input');
    const errMessage = document.querySelector('.errorMessage');
    const errText = [' Please add a link', ' Please add a valid link'];
    const longURL = inputURL.value;

    // Creating img tag
    const img = document.createElement("img");
    img.src = "./assets/images/exclamation-circle.svg";
    img.alt = "exclamation_sybml";
    img.setAttribute("aria-hidden", "true");

    errMessage.innerHTML = "";

    if (longURL.trim() !== '') {
        if (validateURL(inputURL.value)) {
            formInput.classList.remove('errDisplay');
            errMessage.classList.remove('errDisplay');
            console.log('URL Status: URL is Valid');

            const api = async () => {

                // Site: https://apilayer.com/ 

                const url = new URL(
                    "https://api.apilayer.com/short_url/hash"
                );

                var myHeaders = new Headers();
                myHeaders.append("apikey", "42EMjWolryAnD8SBO3XekPqNOQxJcYmz");

                const response = await fetch(url, {
                    method: 'POST',
                    redirect: 'follow',
                    headers: myHeaders,
                    body: longURL
                })

                const data = await response.json();
                const shortURL = data.short_url;

                if (data) {
                    console.log("Logn URL: " + longURL);
                    console.log("Short URL: " + shortURL);
                    appendShortenedUrl(longURL, shortURL);
                }
                else {
                    console.log('Some error occured!');
                }
            }

            api();

        } else {
            formInput.classList.add('errDisplay');
            errMessage.classList.add('errDisplay');
            errMessage.appendChild(img);
            errMessage.appendChild(document.createTextNode(errText[1]));
            console.log('URL Status: URL is Invalid');
        }
    } else {
        formInput.classList.add('errDisplay');
        errMessage.classList.add('errDisplay');
        errMessage.appendChild(img);
        errMessage.appendChild(document.createTextNode(errText[0]));
        console.log('URL Status: URL is Empty');
    }
}

// Reference to parent URLs container block
const shortenedUrlsContainer = document.querySelector('.shotened_urls');

// Creating and appending URLs div blocks
const appendShortenedUrl = (longUrl, shortUrl) => {
    const shortenedUrlsDiv = document.querySelector(".shotened_urls");

    const div = document.createElement("div");
    div.classList.add("d-flex", "flex-column", "flex-md-row");

    const longUrlDiv = document.createElement("div");
    longUrlDiv.classList.add("long_url", "p-3", "d-inline-flex", "align-items-center", "flex-grow-1");

    const longUrlSpan = document.createElement("span");
    longUrlSpan.classList.add("url", "ps-md-3", "w-100");
    longUrlSpan.textContent = longUrl;

    longUrlDiv.appendChild(longUrlSpan);

    const shortUrlDiv = document.createElement("div");
    shortUrlDiv.classList.add("short_url", "d-flex", "flex-column", "flex-md-row", "justify-content-md-end", "align-items-start", "align-items-md-center", "px-md-4", "p-3", "py-md-3");

    const shortUrlSpan = document.createElement("span");
    shortUrlSpan.classList.add("url");
    shortUrlSpan.textContent = shortUrl;

    const copyButton = document.createElement("button");
    copyButton.classList.add("btn", "copy_btn");
    copyButton.textContent = "Copy";
    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(shortUrlSpan.textContent)
            .then(() => {
                console.log("Short URL copied to clipboard");
                copyButton.textContent = "Copied";
                copyButton.classList.add("active");
                // remove "active" class from other copy buttons
                const copyButtons = document.querySelectorAll(".copy_btn");
                for (let i = 0; i < copyButtons.length; i++) {
                    if (copyButtons[i] !== copyButton) {
                        copyButtons[i].textContent = "Copy";
                        copyButtons[i].classList.remove("active");
                    }
                }
            })
            .catch((error) => {
                console.error("Error copying short URL to clipboard:", error);
            });
    });

    shortUrlDiv.appendChild(shortUrlSpan);
    shortUrlDiv.appendChild(copyButton);

    div.appendChild(longUrlDiv);
    div.appendChild(shortUrlDiv);

    shortenedUrlsDiv.appendChild(div);
};
