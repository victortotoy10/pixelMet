document.getElementsByTagName("button")[0].addEventListener("click", () => {
  document.cookie =
    "jwt =; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  document.location.href = "/";
});
