const cards = document.querySelectorAll('.card');
Array.prototype.forEach.call(cards, card => {
  if (card.querySelector('.card__title a')) {
    var down, up, link = card.querySelector('.card__title a');
  } else if (card.querySelector('.card__media a')) {
    var down, up, link = card.querySelector('.card__media a');
  } else {
    var down, up, link = card.querySelector('a.bttn');
  }
  if (card.querySelector('a.bttn') || card.querySelector('.card__title a') || card.querySelector('.card__media a')) {
    card.style.cursor = 'pointer';
    card.onmousedown = () => down = +new Date();
    card.onmouseup = () => {
      up = +new Date();
      if ((up - down) < 200) {
        link.click();
      }
    }
  }
});
