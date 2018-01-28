document.getElementById('open-close-menu').addEventListener('change', hideShowMenu);
document.getElementById('open-close-menu').addEventListener('change', hideShowMenu);
const hideShowMenu = (e) => {
  console.log('körs');
  const body = document.getElementsByTagName('body');
  if(this.checked) {
    console.log(body);
    console.log('gömd');
    body.style.overflow = "hidden";
  } else {
    console.log(body);
    console.log('inte gömd');
    body.style.overflow = "initial";
  }
}
