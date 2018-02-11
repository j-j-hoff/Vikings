document.getElementById('open-close-menu').addEventListener('change', hideShowMenu);
function hideShowMenu(e) {
  const body = document.getElementsByTagName('body')[0];
  if(this.checked) {
    body.style.overflow = "hidden";
    body.style.position = "fixed";
  } else {
    body.style.overflow = "initial";
    body.style.position = "initial";
      
  }
}
