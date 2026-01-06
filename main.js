const thumbs = document.querySelectorAll('.thumb');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
let scale = 1;
let isDragging = false;
let startX = 0;
let startY = 0;
let moveX = 0;
let moveY = 0;

/* ===== 開啟 ===== */
thumbs.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showImage();
    lightbox.style.display = 'flex';
    setTimeout(() => lightbox.classList.add('show'), 10);
  });
});

function showImage() {
  lightboxImg.src = thumbs[currentIndex].src;
  resetTransform();
}

/* ===== 重置 ===== */
function resetTransform() {
  scale = 1;
  moveX = moveY = 0;
  applyTransform();
}

function applyTransform() {
  lightboxImg.style.transform =
    `translate(${moveX}px, ${moveY}px) scale(${scale})`;
}

/* ===== 左右切換 ===== */
prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
  showImage();
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % thumbs.length;
  showImage();
};

/* ===== 關閉 ===== */
closeBtn.onclick = close;

lightbox.onclick = e => {
  if (e.target === lightbox) close();
};

function close() {
  lightbox.classList.remove('show');
  setTimeout(() => {
    lightbox.style.display = 'none';
  }, 300);
}

/* ===== 點擊放大 ===== */
lightboxImg.onclick = () => {
  scale = scale === 1 ? 2 : 1;
  applyTransform();
};

/* ===== 滑鼠拖曳 ===== */
lightboxImg.addEventListener('mousedown', e => {
  if (scale === 1) return;
  isDragging = true;
  startX = e.clientX - moveX;
  startY = e.clientY - moveY;
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  moveX = e.clientX - startX;
  moveY = e.clientY - startY;
  applyTransform();
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

/* ===== 手機拖曳 & 滑動 ===== */
let touchStartX = 0;

lightbox.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;

  if (scale > 1) {
    startX = e.touches[0].clientX - moveX;
    startY = e.touches[0].clientY - moveY;
  }
});

lightbox.addEventListener('touchmove', e => {
  if (scale === 1) return;

  moveX = e.touches[0].clientX - startX;
  moveY = e.touches[0].clientY - startY;
  applyTransform();
});

lightbox.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;

  if (scale === 1) {
    if (touchStartX - endX > 60) nextBtn.onclick();
    if (endX - touchStartX > 60) prevBtn.onclick();
  }
});



const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});