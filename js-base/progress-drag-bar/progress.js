class Progress {
  constructor(selector, options) {
    this.parentDom = document.querySelector(selector);
    this.options = options;
    this.initDom();
  }
  initDom() {
    // creElement
    this.parentDom.innerHTML = `
    <div class="progress-bar">
      <div class="progress"></div>
      <div class="progress-button"></div>
    </div>
    `
    this.progressBarDom = document
    .querySelector('.progress-bar');
    this.progressDom = document.querySelector('.progress');
    this.progressBtnDom = document
    .querySelector('.progress-button');
    this.initProgress();
    this.initEvent();
  }
  initProgress() {
    const { progress = 0 } = this.options;
    this.progressBarDomWidth = this.progressBarDom.offsetWidth;
    this.progressDom.style.width = `${progress * 100}%`;
    this.progressBtnDom
    .style.left = `${progress * this.progressBarDomWidth}px`;
  }
  initEvent() {
    const { disableDrag = false, onDragStart, onDrag } = this.options;
    if (disableDrag) return false;
    let downX = 0;
    let btnLeft = 0;
    this.progressBtnDom.addEventListener('touchstart',
    (e) => {
      const touch = e.touches[0];
      downX = touch.clientX;
      btnLeft = parseInt(touch.target.style.left);
      if (onDragStart) onDragStart();
    })
    this.progressBtnDom.addEventListener('touchmove',
    (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const diffx = touch.clientX - downX;
      let newBtnLeft = diffx + btnLeft;
      if (newBtnLeft > this.progressBarDomWidth) {
        newBtnLeft = this.progressBarDomWidth
      } else if (newBtnLeft < 0) {
        newBtnLeft = 0;
      }
      this.progressDom.style
      .width = `${newBtnLeft / this.progressBarDomWidth * 100}%`;
      this.progressBtnDom.style.left = `${newBtnLeft}px`;
      if (onDrag) onDrag(newBtnLeft / this.progressBarDomWidth * 100);
    })
    this.progressBtnDom.addEventListener('touchend', () => {
      const { onDragEnd } = this.options;
      if (onDragEnd) onDragEnd();
    })
  }
}
export default Progress;