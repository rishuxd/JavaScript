const requestUrl = "https://api.github.com/users/rishuxd";
const xhr = new XMLHttpRequest();
console.log(xhr.readyState); // 0
xhr.open("GET", requestUrl);
console.log(xhr.readyState); // 1
// This is how you can tracl the different stages of a request and get the response.
xhr.onreadystatechange = function () {
  console.log(xhr.readyState); // 2, 3 & 4
  if (xhr.readyState === 4) {
    const data = JSON.parse(this.responseText); //response comes in string format, hence can't destructure it, that's why parsed to JSON
    console.log(data.name);
    console.log(data.location);
    console.log(data.bio);
    document
      .querySelector(".left img")
      .setAttribute("src", `${data.avatar_url}`);
    document.querySelector(".name").innerHTML = `${data.name}`;
    document.querySelector(".username").innerHTML = `${data.login}`;
    document.getElementById("bio").innerHTML = `${data.bio}`;
    document.querySelector(".location").innerHTML = `${data.location}`;
  }
};
xhr.send();
