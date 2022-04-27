async function fetchContent() {
    let date = document.getElementById("calendar").value;

    const url =
        'https://api.nasa.gov/planetary/apod?api_key=GUSHxHacInDVlZgzyfPgQjz5DpSOOaTycH5oUl6k&date=' + date;

    localStorage.setItem("date", date);

    return await fetch(url).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            if (res.status === 400) {
                throw new Error("You should pick correct date");
            } else {
                throw new Error("Something goes really wrong");
            }
        }
    });
}

async function getLinkToImage() {
    document.querySelector(".content-container").classList.add("loading-spinner");

    await fetchContent().then(data => {
        let video = document.querySelector("#video");
        let image = document.querySelector("#image");

        if (data.media_type === "image") {
            video.style.visibility = "hidden";
            image.style.visibility = "visible";
            image.setAttribute("src", data.hdurl);
        } else {
            image.style.visibility = "hidden";
            video.style.visibility = "visible";
            video.style.position = "static";
            video.setAttribute("src", data.url + "&loop=1&autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1");
            video.setAttribute("frameborder", "0");
        }

        document.getElementById("img-title").innerHTML = data.title;
        document.getElementById("explanation-text").innerHTML = data.explanation;
    }).catch(e => alert(e));

    document.querySelector(".content-container").classList.remove("loading-spinner");
}

document.getElementById("calendar").value = localStorage.getItem("date");
getLinkToImage();